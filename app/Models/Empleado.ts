import { DateTime } from "luxon";
import { BaseModel, column, HasMany, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Turno from "./Turno";

export default class Empleado extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  // Herencia de ms-security → usuarioId
  @column()
  public usuarioId: string;

  @column()
  public correo: string;

  // Relación 1:N con Turno
  @hasMany(() => Turno, {
    foreignKey: "usuario_id", // clave foránea en Turno
  })
  public turnos: HasMany<typeof Turno>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
