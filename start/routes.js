"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", "JobController.home");

Route.on("/signup").render("auth.signup");
Route.post("/signup", "UserController.create").validator("CreateUser");

Route.on("/login").render("auth.login");
Route.post("login", "UserController.login").validator("LoginUser");

Route.group(() => {
  Route.get("/", "JobController.userJob").as('user.job');
  Route.post("/", "JobController.create")
    .as("create.job")
    .validator("createJob");
  Route.get("/delete/:id", "JobController.delete").as("delete.job");
  Route.get("edit/:id", "JobController.edit").as("edit.job");
  Route.patch("/update/:id", "JobController.update")
    .as("update.job")
    .validator("createJob");
}).prefix("post-a-job");

Route.get("/logout", async ({ response, auth }) => {
  await auth.logout();

  return response.redirect("/");
});
