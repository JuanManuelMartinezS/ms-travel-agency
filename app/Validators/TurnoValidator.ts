import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class TurnoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    fecha_inicio: schema.date(
      {
        format: "yyyy-MM-dd",
      },
      [rules.required()]
    ),

    fecha_fin: schema.date(
      {
        format: "yyyy-MM-dd",
      },
      [rules.required()]
    ),

    usuario_id: schema.number([rules.required(), rules.unsigned()]),

    theater_id: schema.number([rules.required(), rules.unsigned()]),
  });

  public messages: CustomMessages = {
    "fechaInicio.required": "La fecha de inicio es obligatoria",
    "fechaInicio.date": "La fecha de inicio debe tener formato yyyy-MM-dd",

    "fechaFin.required": "La fecha de fin es obligatoria",
    "fechaFin.date": "La fecha de fin debe tener formato yyyy-MM-dd",

    "usuario_id.required": "El usuario_id es obligatorio",
    "usuario_id.number": "El usuario_id debe ser numérico",
    "usuario_id.unsigned": "El usuario_id debe ser un número positivo",

    "theater_id.required": "El theater_id es obligatorio",
    "theater_id.number": "El theater_id debe ser numérico",
    "theater_id.unsigned": "El theater_id debe ser un número positivo",
  };
}
