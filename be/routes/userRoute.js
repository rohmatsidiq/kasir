import express from "express";
import { login, register } from "../controllers/userController.js";

const route = express.Router();

route.post("/user", register);
route.post("/user/login", login);

export default route;
