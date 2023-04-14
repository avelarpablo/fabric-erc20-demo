import { connect } from "@hyperledger/fabric-gateway";
import { config } from "../tools/config";
import { grpcConn } from "../tools/init";
import { log, newConnectOptions } from "../tools/utils";

export const contractCheck = async (req, res, next) => {
  log.info("Passed through contractCheck middleware");

  try {
    const user = req.username;
    const certificate = req.ca;
    const key = req.key;

    if (user) {
      log.info(`User: ${user}`);

      const connectOptions = await newConnectOptions(
        grpcConn,
        config.mspID,
        Buffer.from(certificate),
        key
      );
      const tempGateway = connect(connectOptions);
      const tempNetwork = tempGateway.getNetwork(config.channelName);
      const tempContract = tempNetwork.getContract(config.chaincodeName);
      (req as any).contract = tempContract;
    }
    next();
  } catch (e) {
    log.error(e);
    next(e);
  }
};
