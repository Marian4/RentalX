import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRentalsTable1694467768954 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "rentals",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
            generationStrategy: "uuid",
          },
          {
            name: "car_id",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "user_id",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "total",
            type: "numeric",
          },
          {
            name: "start_date",
            type: "timestamp",
            isNullable: true,
          },
          {
            name: "end_date",
            type: "timestamp",
            isNullable: true,
          },
          {
            name: "expected_return_date",
            type: "timestamp",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKRentalUser",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["user_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
          {
            name: "FKRentalCar",
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
    await queryRunner.dropTable("rentals");
  }
}
