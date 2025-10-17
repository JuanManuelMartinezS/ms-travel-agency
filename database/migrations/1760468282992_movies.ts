import BaseSchema from "@ioc:Adonis/Lucid/Schema";
//migration: import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "movies";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");

      table.string("name", 255).notNullable();
      table.string("description", 255).notNullable();
      table.integer("duration", 100).notNullable(); // Remove the 255 parameter
      table.date("year").notNullable(); // Changed from dateTime to date
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
