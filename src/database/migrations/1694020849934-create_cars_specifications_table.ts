import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCarsSpecificationsTable1694020849934
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "cars_specifications",
        columns: [
          { name: "car_id", type: "varchar", isNullable: true },
          { name: "specification_id", type: "varchar", isNullable: true },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKSpecificationCar",
            referencedTableName: "specifications",
            referencedColumnNames: ["id"],
            columnNames: ["specification_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
          {
            name: "FKCarSpecification",
            referencedTableName: "cars",
            referencedColumnNames: ["id"],
            columnNames: ["car_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("cars_specifications");
  }
}
