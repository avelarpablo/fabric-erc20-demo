import { AddressInfo } from "net";
import { log } from "./tools/utils";
import { checkConfig } from "./tools/config";

const express = require("express");
const routes = require("./routes/index.ts");
const cookieParser = require("cookie-parser");

const app = express();

// Initial configuration
checkConfig();

app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use("/", routes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err || "Internal Server Error";
  log.error(message);
  res.status(status).send(message);
});

const server = app.listen(
  {
    port: process.env.PORT || 3003,
    host: process.env.HOST || "localhost",
  },
  () => {
    const addressInfo: AddressInfo = server.address() as AddressInfo;
    console.log(
      `Server listening on ${addressInfo.address}:${addressInfo.port}`
    );
  }
);
