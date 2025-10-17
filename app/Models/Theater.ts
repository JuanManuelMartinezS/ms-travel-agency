import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  HasMany,
  hasMany,
  HasOne,
  hasOne,
} from "@ioc:Adonis/Lucid/Orm";
import Projector from "./Projector";
import Seat from "./Seat";
import Screening from "./Screening";

export default class Theater extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public location: string;

  @column()
  public capacity: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  //tiene un proyector 1:1
  @hasOne(() => Projector, {
    foreignKey: "theater_id", // Foreign key on the Projector model
  })
  public projector: HasOne<typeof Projector>;

  //tiene muchas sillas 1:N
  @hasMany(() => Seat, {
    foreignKey: "theater_id",
  })
  public seats: HasMany<typeof Seat>;

  //tiene muchas funciones 1:N, se genera N:N entre peliculas y teatros
  @hasMany(() => Screening, {
    foreignKey: "theater_id",
  })
  public screenings: HasMany<typeof Screening>;
}
