import { Router } from "express";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import User from "./app/models/User";
import authMiddlawares from "./app/middlewares/auth";

const routes = new Router();

routes.post("/users", UserController.store);
routes.put("/users", authMiddlawares, UserController.update);

routes.use(authMiddlawares);

routes.post("/sessions", SessionController.StorageEvent);

export default routes;
