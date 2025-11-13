import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "empleados";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");

      // Herencia del usuario (ms-security)
      table.string("usuario_id", 255).notNullable();

      // Nuevo campo correo
      table.string("correo", 255).notNullable();

      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
