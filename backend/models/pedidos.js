import mongoose from "mongoose";

const pedidosSchema = new mongoose.Schema({
    pedidoId: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    direccion: { type: String, required: true },
    ciudad: { type: String, required: true },
    codigoPostal: { type: String },
    fecha: { type: Date, default: Date.now },
    productos: [
        {
            nombre: { type: String, required: true },
            cantidad: { type: Number, required: true },
            precio: { type: Number, required: true },
        }
    ],
    metodo_pago: { type: String, required: true },
    estado: { type: String, enum: ["pendiente", "procesando", "enviado", "entregado", "cancelado"], default: "pendiente" },
    total: { type: Number, required: true }
});

const pedidos = mongoose.model("pedidos", pedidosSchema, "pedidos");
export default pedidos;