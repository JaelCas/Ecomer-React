import express from "express";
import { crearproductos, obtenerproductos} from "../controllers/productos.js";
const router = express.Router();

// ruta crear producto 
router.post("/", crearproductos);

// ruta obtener productos
router.get("/", obtenerproductos);

export default router;