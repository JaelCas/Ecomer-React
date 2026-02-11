import express from "express";
import { verificarToken, soloAdmin } from "../middlewares/auth.middleware.js";
import { crearproductos, obtenerproductos, actualizarProducto, eliminarProducto} from "../controllers/productos.js";

const router = express.Router();

//👤 Ver productos (user y admin)
router.get("/", verificarToken, obtenerproductos);

//👑 Crear
router.get("/", verificarToken, soloAdmin, crearproductos);

//👑 Actualizar
router.put("/:id", verificarToken, soloAdmin, actualizarProducto);

//👑 Eliminar
router.delete("/:id", verificarToken, soloAdmin, eliminarProducto)

export default router;