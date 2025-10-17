import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Theater from "./Theater";
import Movie from "./Movie";

export default class Screening extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public movie_id: number;

  @column()
  public theater_id: number;

  @column()
  public date: Date;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Movie, {
    foreignKey: "movie_id", // Foreign key on the Movie model
  })
  public movie: BelongsTo<typeof Movie>;

  @belongsTo(() => Theater, {
    foreignKey: "theater_id", // Foreign key on the Theater model
  })
  public theater: BelongsTo<typeof Theater>;
}
