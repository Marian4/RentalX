import { hash } from "bcrypt";
import request from "supertest";
import { v4 as uuidV4 } from "uuid";

import { app } from "../../../../app";
import { AppDataSource } from "../../../../database";

describe("Create Category e2e", () => {
  let token;

  beforeAll(async () => {
    const connection = await AppDataSource.initialize();

    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash("admin", 8);

    await AppDataSource.query(`INSERT INTO USERS(id, name, email, password, isAdmin, created_at, driver_license) 
          values('${id}', 'admin', 'admin@email.com', '${password}', true, now(), 'XXXXXX')`);

    const response = await request(app)
      .post("/sessions")
      .send({ email: "admin@email.com", password: "admin" });
    token = response.body.token;
  });

  afterAll(async () => {
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy();
  });

  it("Should be able to create a category", async () => {
    await request(app)
      .post("/categories")
      .set({ Authorization: `Bearer ${token}` })
      .send({ name: "test", description: "this is a test" })
      .expect(201);
  });
});
