import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class EmpleadoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    usuario_id: schema.string({}, [rules.regex(/^[0-9a-fA-F]{24}$/)]),

    correo: schema.string({}, [rules.email(), rules.maxLength(255)]),
  });

  public messages: CustomMessages = {
    "usuario_id.required": "El campo usuario_id es obligatorio",
    "usuario_id.regex": "El usuario_id debe ser un ObjectId válido de MongoDB",
    "correo.required": "El correo es obligatorio",
    "correo.email": "Debe ser un correo electrónico válido",
  };
}
