import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class MovieValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string([
      rules.minLength(3),
      rules.maxLength(255),
      rules.unique({ table: "movies", column: "name" }),
    ]),
    description: schema.string([
      // ← AGREGAR ESTA LÍNEA
      rules.minLength(10),
      rules.maxLength(1000),
    ]),
    duration: schema.number([rules.range(1, 500)]),
    year: schema.date(),
  });

  public messages: CustomMessages = {
    "name.unique": "Ya existe una película con este nombre",
    "description.minLength": "La descripción debe tener al menos 10 caracteres",
    "description.maxLength":
      "La descripción no puede exceder los 1000 caracteres",
  };
}
