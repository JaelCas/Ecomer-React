import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import user from "../models/usuario.js";

export const loginusuario = async (req, res)=> {
    try {
        const {email, password}=req.body;

        //validar que los campos obligatorios no esten vacios
        if (!email || !password) {
            return res.status(400).json({message: "Correo y contraseña son obligatorios"});
        }
        //buscamos el usuario en la base de datos
        const usuario = await user.findOne({email});
        if (!usuario) {
            return res.status(400).json({message: "Usuario no encontrado"});
        }
        //comparar la contraseña 
        const passwordValida = await bcrypt.compare(password, usuario.password)
        if (!passwordValida){
            return res.status(401).json({message: "Contraseña incorrecta"});
        }
        //Generamos el token JWT con el rol incluido
        const token = jwt.sign(
            {
                id:usuario._id,
                rol:usuario.rol,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        //Respondemos con el token y los datos del usuario
        res.status(200).json({
            message: "Inicio de sesión correcto",
            token,
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email,
                telefono: usuario.telefono,
                rol: usuario.rol,
            },
        });
        //Validar inicio de sesion
        res.status(200).json({message: "Login exitoso",
            usuario:{
                id: usuario._id,
                nombre: usuario.nombre,
                telefono: usuario.telefono,
                email: usuario.email
            }
        });
    } catch (error) {
        res.status(500).json({message: "Error al inicair sesion", error:error.message})
    }
}