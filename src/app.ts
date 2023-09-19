import express from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import "reflect-metadata";
import "./shared/container";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { router } from "./routes";
import swaggerFile from "./swagger.json";

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);
app.use(errorMiddleware);

export { app };
