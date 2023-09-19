import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  username: "root",
  password: "",
  database: process.env.NODE_ENV === "test" ? "rentalx_test" : "rentalx",
  port: 3306,
  entities: ["src/modules/**/entities/*.ts"],
  migrations: ["src/database/migrations/*.ts"],
});
