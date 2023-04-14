import { log } from "../tools/utils";

const evaluate = async (req, res) => {
  try {
    const fcn = req.body.fcn;
    const responseBuffer = await (req as any).contract.evaluateTransaction(
      fcn,
      ...(req.body.args || [])
    );
    const responseString = Buffer.from(responseBuffer).toString();
    log.info(responseString);
    res.send(responseString);
  } catch (error) {
    res
      .status(400)
      .send(
        error.details && error.details.length ? error.details : error.message
      );
  }
};

const submit = async (req, res) => {
  try {
    const fcn = req.body.fcn;
    const responseBuffer = await (req as any).contract.submitTransaction(
      fcn,
      ...(req.body.args || [])
    );
    const responseString = Buffer.from(responseBuffer).toString();
    res.send(responseString);
  } catch (error) {
    res
      .status(400)
      .send(
        error.details && error.details.length ? error.details : error.message
      );
  }
};

module.exports = {
  evaluate,
  submit,
};
