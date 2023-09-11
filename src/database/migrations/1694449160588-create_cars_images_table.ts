import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCarsImagesTable1694449160588 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "cars_images",
        columns: [
          {
            name: "id",
            type: "varchar",
            generationStrategy: "uuid",
            isPrimary: true,
          },
          {
            name: "car_id",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "image_name",
            type: "varchar",
          },
        ],
        foreignKeys: [
          {
            name: "FKCar",
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
    await queryRunner.dropTable("cars_images");
  }
}
