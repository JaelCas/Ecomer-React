import express from "express";
import { crearpedido, obtenerpedido } from "../controllers/pedidos.js";
const router = express.Router();

// ruta crear producto 
router.post("/", crearpedido);

// ruta obtener productos
router.get("/", obtenerpedido);

export default router;
