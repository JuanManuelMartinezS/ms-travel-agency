import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Movie from "App/Models/Movie";
import Ws from "App/Services/Ws";
import MovieValidator from "App/Validators/MovieValidator";

export default class MoviesController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      //por debajo llama al orm y hace un select * from movies where id=params.id
      let theMovie: Movie = await Movie.findOrFail(params.id);

      //debe hacer un join
      await theMovie.load("screenings", (screeningsQuery) => {
        screeningsQuery.preload("theater", (theaterQuery) => {
          theaterQuery.preload("projector").preload("seats");
        });
      });

      return theMovie;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Movie.query().paginate(page, perPage);
      } else {
        return await Movie.query();
      }
    }
  }
  public async create({ request }: HttpContextContract) {
    const body = await request.validate(MovieValidator);
    //por debajo tiene una operacion de insercion en base de datos
    const theMovie: Movie = await Movie.create(body);
    Ws.io.emit("notifications", { message: "Nueva Notificación" });
    return theMovie;
  }

  public async update({ params, request }: HttpContextContract) {
    const theMovie: Movie = await Movie.findOrFail(params.id);
    const body = request.body();
    theMovie.name = body.name;
    theMovie.duration = body.duration;
    theMovie.year = body.year;
    return await theMovie.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theMovie: Movie = await Movie.findOrFail(params.id);
    response.status(204);
    return await theMovie.delete();
  }
}
