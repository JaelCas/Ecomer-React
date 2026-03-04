import mongoose from "mongoose"; 

const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    telefono: { type: Number, required: true, minlength: 12 }, // ✅ FIX: "minlegth" → "minlength"
    rol: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        set: (v) => typeof v === 'string' ? v.trim() : v  // ✅ FIX: limpia el \n automáticamente
    },
    codigoRecuperacion: String,
    codigoExpiracion: Date
});

// Forzar que guarde en colección "usuario"
const usuario = mongoose.model("usuario", usuarioSchema, "usuario");
export default usuario;