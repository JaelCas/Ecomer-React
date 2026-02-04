import mongoose from "mongoose";
const pedidosSchema = new mongoose.Schema({
    pedidoId: {type:String,required:true,unique:true},
    email: {type:String,required:true},
    direccion: {type:String,required:true},
    fecha: {type:Date,requerid:true},
    nombre_producto: {type:String,required:true},
    cantidad_producto: {type:Number,required:true},
    metodo_pago: {type:String,required:true},
    estado: {type:String,enum:["pendiente","procesando","enviado","entregado","cancelado"],default:"pendiente"},
    total: {type:Number,required:true} 
});
const pedidos = mongoose.model("pedidos", pedidosSchema, "pedidos");
export default pedidos;