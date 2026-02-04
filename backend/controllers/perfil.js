//importamos el modelo
import user from "../models/usuario.js";

//obtenemos perfil del usuario de la base de datos 

export const obtenerPerfil = async (req, res) => {
    try {
        const {email} = req.body;
        if(!email){
            return res.status(400).json({message:"Email es requerido"});
        }
        //Traer el correo del usuario desde la base de datos
        const usuario = await user.findOne({email:email}).select('-password');
        if(!usuario){
            return res.status(400).json({message:"Usuario no encontrado"});
        }
        res.status(200).json({
            usuario:{
                id:usuario._id,
                nombre:usuario.nombre,
                apellido:usuario.apellido,
                email:usuario.email,
                telefono:usuario.telefono
            }
        });
    } catch (error) {
        res.status(500).json({message:"Error al obtener el perfil", error:error.message});
    }
}
// Actualizar perfil del usuario
export const actualizarPerfil = async (req, res) => {
    try {
        const { email, nombre, apellido, telefono } = req.body;

        //validar campos obligatorios
        if(!email) {
            return res.status(400).json({ message: "Email es requerido" });
        }

        if(!nombre || !apellido || !telefono){
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        //Buscar y actualizar usuario
        const usuarioActualizado = await user.findOneAndUpdate(
            { email: email },
            {
                nombre: nombre,
                apellido: apellido,
                telefono: telefono
            },
            { new: true }
            // No va seleccionar el campo passwords
        ).select('-password');

        if(!usuarioActualizado){
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json({
            message: "Perfil actualizado exitosamente",
            usuario: {
                id: usuarioActualizado._id,
                nombre: usuarioActualizado.nombre,
                apellido: usuarioActualizado.apellido,
                email: usuarioActualizado.email,
                telefono: usuarioActualizado.telefono
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el perfil",
            error: error.message
        });
    }
};
// Eliminar perfil
export const eliminarPerfil = async (req, res) => {
    try {
        const { email } = req.body;

        //Validar que el email este presente
        if(!email){
            return res.status(400).json({ message: "Email es requerido" });
        } 

        //Buscar y eliminar usuario 
        const usuarioEliminado = await user.findOneAndDelete({
            email: email
        });

        if(!usuarioEliminado){
            return res.status(400),json({ menssage: "Usuario no encontrado" });
        }

        res.status(200).json({
            message: "Usuario eliminado exitosamente",
            usuario: {
                id: usuarioEliminado._id,
                nombre: usuarioEliminado.nombre,
                apellido: usuarioEliminado.apellido,
                email: usuarioEliminado.email,
                telefono: usuarioEliminado.telefono
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar perfil",
            error: error.message
        });
    }
};