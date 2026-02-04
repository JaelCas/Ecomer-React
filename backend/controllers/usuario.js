import usuario from "../models/usuario.js";
import bcrypt from "bcrypt";

// crear usuario
export const registrarusuario = async (req, res) => {
    try {
        const {nombre, apellido, email, password, telefono} = req.body;
        //validar que los campos obligatorios no esten vacios
        if (!nombre || !apellido || !email|| !password || !telefono) {
            return res.status(400).json({message: "Faltan campos o datos obligatorios"})
        }
        //valida si el usuario ya existe
        const existeuser = await usuario.findOne ({email});
        if (existeuser) {
            return res.status(400).json({message: "Usuario ya existe"})
        }
        //encriptar la contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        //crear nuevo usuario
        const newusuario = new usuario({
            nombre,
            apellido,
            email,
            password:hashedPassword,
            telefono
        });
        await newusuario.save();
        res.status(201).json({message: "Usuario creado exitosamente"});
    } catch (error) {
        console.error("Error al crear el usuario:", error);
        res.status(500).json({message: "Error al ingresar usuario"});
    }
};