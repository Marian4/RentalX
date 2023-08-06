import express from "express";
import swaggerUi from "swagger-ui-express";

import "reflect-metadata";
import { AppDataSource } from "./database";
import "./shared/container";
import { router } from "./routes";
import swaggerFile from "./swagger.json";

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
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