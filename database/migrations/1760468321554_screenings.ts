import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "screenings";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table
        .integer("movie_id")
        .unsigned()
        .references("id")
        .inTable("movies")
        .onDelete("CASCADE")
        .notNullable();
      table
        .integer("theater_id")
        .unsigned()
        .references("id")
        .inTable("theaters")
        .onDelete("CASCADE")
        .notNullable();
      table.timestamp("date", { useTz: true }).notNullable();
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
