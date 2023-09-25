import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  username: "docker",
  password: "docker123",
  database: process.env.NODE_ENV === "test" ? "rentalx_test" : "rentalx",
  port: 5432,
  entities: ["src/modules/**/entities/*.ts"],
  migrations: ["src/database/migrations/*.ts"],
});
