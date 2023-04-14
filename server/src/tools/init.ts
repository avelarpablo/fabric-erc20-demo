import * as yaml from "yaml";
import { promises as fs } from "fs";
import { config } from "./config";
import * as _ from "lodash";
import FabricCAServices from "fabric-ca-client";
import { User } from "fabric-common";
import { newConnectOptions, newGrpcConnection } from "./utils";
import { connect } from "@hyperledger/fabric-gateway";

async function main() {
  const networkConfig = yaml.parse(
    await fs.readFile(config.networkConfigPath, "utf-8")
  );
  const adminUserConfig = yaml.parse(
    await fs.readFile(config.adminUserPath, "utf-8")
  )
  const orgPeerNames = _.get(
    networkConfig,
    `organizations.${config.mspID}.peers`
  );
  if (!orgPeerNames) {
    throw new Error(`Organization ${config.mspID} doesn't have any peers`);
  }
  let peerUrl: string = "";
  let peerCACert: string = "";
  let idx = 0;
  for (const peerName of orgPeerNames) {
    const peer = networkConfig.peers[peerName];
    const peerUrlKey = `url`;
    const peerCACertKey = `tlsCACerts.pem`;
    peerUrl = _.get(peer, peerUrlKey).replace("grpcs://", "");
    peerCACert = _.get(peer, peerCACertKey);
    idx++;
    if (idx >= 1) {
      break;
    }
  }
  if (!peerUrl || !peerCACert) {
    throw new Error(`Organization ${config.mspID} doesn't have any peers`);
  }
  const ca = networkConfig.certificateAuthorities[config.caName];
  if (!ca) {
    throw new Error(
      `Certificate authority ${config.caName} not found in network configuration`
    );
  }
  const caURL = ca.url;
  if (!caURL) {
    throw new Error(
      `Certificate authority ${config.caName} does not have a URL`
    );
  }
  const fabricCAServices = new FabricCAServices(
    caURL,
    {
      trustedRoots: [ca.tlsCACerts.pem[0]],
      verify: true,
    },
    ca.caName
  );

  const identityService = fabricCAServices.newIdentityService();

  const registrarUserResponse = await fabricCAServices.enroll({
    enrollmentID: ca.registrar.enrollId,
    enrollmentSecret: ca.registrar.enrollSecret,
  });

  const registrar = User.createUser(
    ca.registrar.enrollId,
    ca.registrar.enrollmentSecret,
    config.mspID,
    registrarUserResponse.certificate,
    registrarUserResponse.key.toBytes()
  );

  // const adminUser = _.get(
  //   adminUserConfig, ''
  // );
  const adminUserCertificate = _.get(adminUserConfig, "cert.pem");
  const adminUserKey = _.get(adminUserConfig, "key.pem");
  if (!adminUserCertificate || !adminUserKey) {
    throw new Error(
      `User ${config.hlfUser} not found in network configuration`
    );
  }

  const grpcConn = await newGrpcConnection(peerUrl, Buffer.from(peerCACert));
  const connectOptions = await newConnectOptions(
    grpcConn,
    config.mspID,
    Buffer.from(adminUserCertificate),
    adminUserKey
  );
  const gateway = connect(connectOptions);
  const network = gateway.getNetwork(config.channelName);
  const contract = network.getContract(config.chaincodeName);

  return {
    gateway,
    network,
    contract,
    registrar,
    fabricCAServices,
    identityService,
    grpcConn,
  };
}
// Export gateway, network, contract from main() and use them in the other files

export let gateway,
  network,
  contract,
  registrar,
  fabricCAServices,
  identityService,
  grpcConn;

main().then((res) => {
  gateway = res.gateway;
  network = res.network;
  contract = res.contract;
  registrar = res.registrar;
  fabricCAServices = res.fabricCAServices;
  identityService = res.identityService;
  grpcConn = res.grpcConn;
});
