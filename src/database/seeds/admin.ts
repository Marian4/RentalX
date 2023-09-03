import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";

import { AppDataSource } from "..";

async function create() {
  const id = uuidV4();
  const password = await hash("admin", 8);

  AppDataSource.initialize()
    .then(() => {
      AppDataSource.query(
        `INSERT INTO USERS(id, name, email, password, isAdmin, created_at, driver_license) 
        values('${id}', 'admin', 'admin@email.com', '${password}', true, now(), 'XXXXXX')`
      );
    })
    .catch((err) => {
      console.error("Error during Data Source initialization in seed", err);
    });
}

create().then(() => {
  console.log("User admin created");
});
