import { config as DotEnvConfig } from "dotenv";
import http from "http";
import express, { json as expressJson, urlencoded } from "express";
import cors from "cors";
import router from "./core/router";
import AppDataSource from "~/database";
import process from "process";

DotEnvConfig({
  path: ".env",
});

const Start = async () => {
  await AppDataSource.initialize()
    .then(() => console.log("Connected to the database"))
    .catch((error) => console.log(error));

  const app = express();
  const httpServer = http.createServer(app);

  app.use(expressJson());
  app.use(
    urlencoded({
      extended: true,
    })
  );
  app.use(cors());

  app.use("/api", router);

  httpServer.listen(process.env.PORT, () =>
    console.log(`Started server on port: ${process.env.PORT}`)
  );
};

Start();
