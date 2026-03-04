import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import user from "../models/usuario.js";

export const loginusuario = async (req, res)=> {
    try {
        const {email, password}=req.body;

        if (!email || !password) {
            return res.status(400).json({message: "Correo y contraseña son obligatorios"});
        }
        const usuario = await user.findOne({email});
        if (!usuario) {
            return res.status(400).json({message: "Usuario no encontrado"});
        }
        const passwordValida = await bcrypt.compare(password, usuario.password)
        if (!passwordValida){
            return res.status(401).json({message: "Contraseña incorrecta"});
        }
        const token = jwt.sign(
            {
                id:usuario._id,
                rol:usuario.rol,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        return res.status(200).json({
            message: "Inicio de sesión correcto",
            token,
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                email: usuario.email,
                telefono: usuario.telefono,
                rol: usuario.rol,
            },
        });
    } catch (error) {
        return res.status(500).json({message: "Error al iniciar sesion", error:error.message})
    }
}
