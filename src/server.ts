import express from "express";

import "reflect-metadata";
import { AppDataSource } from "./database";
import "./shared/container";
import { router } from "./routes";

const app = express();

app.use(express.json());
app.use(router);

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    app.listen(4000, () => {
      console.log("Server running on port 4000");
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
