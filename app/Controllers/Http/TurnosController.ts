import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Turno from "App/Models/Turno";

export default class TurnosController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theTurno: Turno = await Turno.findOrFail(params.id);
      return theTurno;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Turno.query().paginate(page, perPage);
      } else {
        return await Turno.query();
      }
    }
  }
  public async create({ request }: HttpContextContract) {
    const body = request.body();
    const theTurno: Turno = await Turno.create(body);
    return theTurno;
  }
}
