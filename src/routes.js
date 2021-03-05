import { Router } from "express";
import multer from "multer";
import multerConfig from "./config/multer";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import User from "./app/models/User";
import authMiddlawares from "./app/middlewares/auth";
import FileController from "./app/controllers/FileController";
import ProviderController from "./app/controllers/ProviderController";
import AppointmentController from "./app/controllers/AppointmentController";
import ScheduleController from "./app/controllers/ScheduleController";
import NotificationController from "./app/controllers/NotificationController";

const routes = new Router();
const upload = multer(multerConfig);

routes.post("/users", UserController.store);
routes.post("/sessions", SessionController.store);

routes.use(authMiddlawares);

routes.put("/users", UserController.update);

routes.get("/providers", ProviderController.index);

routes.post("/appoitments", AppointmentController.store);

routes.get("/appoitments", AppointmentController.index);

routes.get("/schedule", ScheduleController.index);

routes.get("/notifications", NotificationController.index);

routes.put("/notifications/:id", NotificationController.update);

routes.post("/files", upload.single("file"), FileController.store);

export default routes;
