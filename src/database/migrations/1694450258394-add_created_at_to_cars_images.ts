import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddCreatedAtToCarsImages1694450258394
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "cars_images",
      new TableColumn({
        name: "created_at",
        type: "timestamp",
        default: "now()",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("cars_images", "created_at");
  }
}
