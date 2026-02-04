import mongoose from "mongoose"; 
const usuarioSchema = new mongoose.Schema({
    nombre: {type:String,required:true},
    apellido: {type:String,required:true},
    email: {type:String,required:true},
    password: {type:String,required:true},
    telefono: {type:Number,required:true,minlegth:12},
});
const usuario = mongoose.model("usuario", usuarioSchema, "usuario");
export default usuario;