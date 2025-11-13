import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Turnos extends BaseSchema {
  protected tableName = "turnos";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.date("fecha_inicio").notNullable();
      table.date("fecha_fin").notNullable();

      // Usuario de Mongo (string)
      table.string("usuario_id", 255).notNullable();

      // Teatro local en MySQL
      table
        .integer("theater_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("theaters")
        .onDelete("CASCADE");

      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
