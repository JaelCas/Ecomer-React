//middlewares/auth.middleware.js
import jwt from "jsonwebtoken";
import Usuario from "../models/usuario.js";

//Verificar el token y consulta el usuario actualizado en BD
export const verificarToken = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];

        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(401).json({ message: "Token requerido" });
        }

        const token = authHeader.split(" ")[1];

        //Decodifica el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //Consulta el usuario actualizado en la BD (por si cambió su rol o fue eliminado)
        const usuario = await Usuario.findById(decoded.id).select("-passwords");
        if (!usuario) {
            return res.status(401).json({message: "Usuario no encontrado "});
        }

        //Guardamos el usuario completo en req para usarlo en los controladores
        req.usuario = usuario;
        next();

    } catch (error) {
        if (error.name === "TokenExpiredError"){
            return res.status(401).json({ message: "Token expirado, inicia sesión nuevamente" });
        }
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Token inválido" });
        }
        res.status(500).json({ message: "Error en la autenticación", error: error.message });
    }
};

//Solo administradores 
export const soloAdmin = (req, res, next) =>{
    if (req.usuario?.rol !== "admin") {
        return res.status(403).json({ message: "Acceso denegado: se requiere rol admin" });
    }
    next();
};

//solo usuarios 
export const soloUsuario = (req, res, next) => {
    if (req.usuario?.rol !== "usuario") {
        return res.status(403).json({ message: "Acceso denegado: se requiere rol usuario" });
    }
    next();
}