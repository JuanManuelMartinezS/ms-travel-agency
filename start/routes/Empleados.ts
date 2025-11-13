import Route from "@ioc:Adonis/Core/Route";
//esto se haria para rutas publicas
// Route.get("/movies", "MoviesController.find");
// Route.get("/movies/:id", "MoviesController.find");
// Route.group(() => {
//   Route.get("/movies", "MoviesController.find");
//   Route.get("/movies/:id", "MoviesController.find");
//   Route.post("/movies", "MoviesController.create");
//   Route.put("/movies/:id", "MoviesController.update");
//   Route.delete("/movies/:id", "MoviesController.delete");
// }).middleware(["security"]);

Route.group(() => {
  Route.get("/empleados", "EmpleadosController.find");

  Route.post("/empleados", "EmpleadosController.create");
});
