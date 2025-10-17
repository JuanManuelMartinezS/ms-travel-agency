import { DateTime } from "luxon";
import { BaseModel, column, HasMany, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Screening from "./Screening";

export default class Movie extends BaseModel {
  @column({ isPrimary: true })
  public id: number;
  @column()
  public name: string;
  @column()
  public description: string;
  @column()
  public duration: number;
  @column.dateTime()
  public year: DateTime;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
  //una pelicula tiene muchas funciones 1:N
  @hasMany(() => Screening, {
    foreignKey: "movie_id",
  })
  public screenings: HasMany<typeof Screening>;
}
