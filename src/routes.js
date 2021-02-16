import { Router } from "express";
import multer from "multer";
import multerConfig from "./config/multer";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import User from "./app/models/User";
import authMiddlawares from "./app/middlewares/auth";

const routes = new Router();
const upload = multer(multerConfig);

routes.post("/users", UserController.store);
routes.put("/users", authMiddlawares, UserController.update);

routes.use(authMiddlawares);

routes.post("/sessions", SessionController.store);

routes.post("/files", upload.single("file"), (req, res) => {
  return res.json({ ok: true });
});

export default routes;
