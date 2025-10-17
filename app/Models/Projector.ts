import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Theater from "./Theater";

export default class Projector extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public brand: string;

  @column()
  public height: number;

  @column()
  public width: number;

  @column()
  public theater_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  //me permite facilidad, seria como bidireccional, yo me puedo arrastrar ese id desde aca o desde el teatro
  @belongsTo(() => Theater, {
    foreignKey: "theater_id", // Foreign key on the Theater model
  })
  public theater: BelongsTo<typeof Theater>;
}
