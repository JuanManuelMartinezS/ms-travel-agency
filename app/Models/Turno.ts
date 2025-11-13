import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Empleado from "./Empleado";
import Theater from "./Theater";

export default class Turno extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column.date()
  public fecha_inicio: DateTime;

  @column.date()
  public fecha_fin: DateTime;

  // 🔁 Clave foránea hacia Empleado (usa usuarioId)
  @column()
  public usuario_id: string;

  @column()
  public theater_id: number;

  @belongsTo(() => Empleado, {
    foreignKey: "usuario_id",
  })
  public empleado: BelongsTo<typeof Empleado>;

  @belongsTo(() => Theater, {
    foreignKey: "theater_id",
  })
  public theater: BelongsTo<typeof Theater>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
