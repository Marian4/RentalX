import dotenv from "dotenv";

import { app } from "./app";
import { AppDataSource } from "./database";

dotenv.config();

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
