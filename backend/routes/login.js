import express from "express";
import { loginusuario } from "../controllers/login.js";

const router = express.Router();

//ruta para login

router.post("/", loginusuario);

export default router;