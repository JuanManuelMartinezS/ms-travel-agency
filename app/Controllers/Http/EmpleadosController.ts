import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Empleado from "App/Models/Empleado";
import Ws from "App/Services/Ws";
import EmpleadoValidator from "App/Validators/EmpleadoValidator";
import axios from "axios";

export default class EmpleadosController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      const theEmpleado = await Empleado.findOrFail(params.id);
      // await theEmpleado.load('turnos')
      return theEmpleado;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Empleado.query().paginate(page, perPage);
      } else {
        return await Empleado.query();
      }
    }
  }

  public async create({ request, response }: HttpContextContract) {
    const body = await request.validate(EmpleadoValidator);
    // Obtener info del usuario desde MS-SECURITY
    const securityUrl = `http://localhost:8080/api/users/${body.usuario_id}`;

    const userResponse = await axios.get(securityUrl).catch(() => null);

    if (!userResponse || !userResponse.data) {
      return response.status(404).json({
        message: "No existe un usuario con ese ID en ms-security",
      });
    }

    const usuarioSecurity = userResponse.data;

    // Extraer correo real desde MS-Security
    const correoReal = usuarioSecurity.email;

    // Crear empleado en Adonis usando el correo obtenido
    const empleado = await Empleado.create({
      usuarioId: body.usuario_id,
      correo: correoReal,
    });

    // --- Llamar al microservicio ms-notifications ---
    await axios.post("http://127.0.0.1:5000/send-email", {
      to: empleado.correo,
      subject: "Bienvenido a la empresa 🎉",
      body: `
          <h3>Hola,</h3>
          <p>Tu cuenta como empleado ha sido creada exitosamente.</p>
          <p>¡Bienvenido al equipo!</p>
        `,
      is_html: true,
    });
    return empleado;
  }
}
