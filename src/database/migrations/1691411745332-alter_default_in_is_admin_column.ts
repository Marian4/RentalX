import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterDefaultInIsAdminColumn1691411745332
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE users ALTER COLUMN isAdmin SET DEFAULT false"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE users ALTER COLUMN isAdmin SET DEFAULT true"
    );
  }
}
