import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "projectors";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("brand", 255).notNullable();
      table.integer("height").notNullable();
      table.integer("width").notNullable();
      table
        .integer("theater_id")
        .unsigned() //definir que pertenece  a un campo en otra tabla
        .references("id") //referenciar este campo
        .inTable("theaters"); //en esta tabla, basicamente esto representa una agregacion

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
