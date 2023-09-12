import { MigrationInterface, QueryRunner } from "typeorm";

export class SetDefaultToRentalStartDate1694470492947
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE rentals ALTER COLUMN start_date SET DEFAULT now()"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE rentals ALTER COLUMN start_date DROP DEFAULT"
    );
  }
}
