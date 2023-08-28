const express = require("express");
const todoRoutes = express.Router();
const todoController = require("../Controllers/todo.controllers");
const AuthMiddleware = require("../Middlewarers/AuthMiddleware");

todoRoutes
  .route("/")
  .get(AuthMiddleware.authentication, todoController.GetAllTodoTask);
todoRoutes
  .route("/add")
  .post(AuthMiddleware.authentication, todoController.AddTodoController);
todoRoutes
  .route("/:todoId")
  .get(AuthMiddleware.authentication, todoController.GetSingleTodoTask)
  .put(AuthMiddleware.authentication, todoController.UpdateTodoTask)
  .delete(AuthMiddleware.authentication, todoController.DeleteTodoTask);

module.exports = todoRoutes;
