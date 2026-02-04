import express from "express";
import {registrarusuario} from "../controllers/usuario.js";

const router  = express.Router();
// Ruta para registrar
router.post("/register", registrarusuario)

export default router;