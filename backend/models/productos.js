import mongoose from "mongoose";
const productoSchema = new mongoose.Schema({
    productId: {type:String,required:true,unique:true},
    Nombre: {type:String,required:true},
    Descripcion: {type:String,required:true},
    Precio: {type:Number,required:true},
    Image: {type:String,required:true},
});
// forzar a guardar la infrmacion en la coleccion Productos
const Product = mongoose.model("productos", productoSchema, "productos");
export default Product;