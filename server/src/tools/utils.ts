import {
  ConnectOptions,
  Identity,
  Signer,
  signers,
} from "@hyperledger/fabric-gateway";
import * as grpc from "@grpc/grpc-js";
import * as crypto from "crypto";
import * as CryptoJS from "crypto-js";
import { Logger } from "tslog";

export const log = new Logger({ name: "fabric-gateway" });

const secretKey = process.env.CRYPTO_KEY;

export async function newGrpcConnection(
  peerEndpoint: string,
  tlsRootCert: Buffer
): Promise<grpc.Client> {
  const tlsCredentials = grpc.credentials.createSsl(tlsRootCert);
  return new grpc.Client(peerEndpoint, tlsCredentials, {});
}

export async function newIdentity(
  mspId: string,
  credentials: Uint8Array
): Promise<Identity> {
  return { mspId, credentials };
}

export async function newSigner(privateKeyPem: string): Promise<Signer> {
  const privateKey = crypto.createPrivateKey(privateKeyPem);
  return signers.newPrivateKeySigner(privateKey);
}

export async function newConnectOptions(
  client: grpc.Client,
  mspId: string,
  credentials: Uint8Array,
  privateKeyPem: string
): Promise<ConnectOptions> {
  return {
    client,
    identity: await newIdentity(mspId, credentials),
    signer: await newSigner(privateKeyPem),
    evaluateOptions: () => {
      return { deadline: Date.now() + 5000 };
    },
    endorseOptions: () => {
      return { deadline: Date.now() + 15000 };
    },
    submitOptions: () => {
      return { deadline: Date.now() + 5000 };
    },
    commitStatusOptions: () => {
      return { deadline: Date.now() + 60000 };
    },
  };
}

export function encrypt(data: any): string {
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
}

export function decrypt(data: string): any {
  const bytes = CryptoJS.AES.decrypt(data, secretKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}