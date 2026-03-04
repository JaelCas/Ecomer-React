import pedidos from "../models/pedidos.js";
import { v4 as uuidv4 } from "uuid";
import { enviarConfirmacionPedido } from "../services/email.js";
import user from "../models/usuario.js";

export const crearpedido = async (req, res) => {
    try {
        const { email, direccion, ciudad, codigoPostal, productos, metodo_pago, total } = req.body;

        if (!email || !direccion || !ciudad || !productos || !metodo_pago || !total) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }

        const pedidoId = uuidv4();

        const newPedido = new pedidos({
            pedidoId,
            email,
            direccion,
            ciudad,
            codigoPostal,
            fecha: new Date(),
            productos,
            metodo_pago,
            total,
        });

        await newPedido.save();

        // Buscar nombre del usuario para el correo
        const usuario = await user.findOne({ email });
        const nombre = usuario ? usuario.nombre : "Cliente";

        // Enviar correo de confirmación
        try {
            await enviarConfirmacionPedido({
                email,
                nombre,
                pedido: { pedidoId, direccion, ciudad, metodo_pago, productos, total },
            });
        } catch (emailError) {
            console.error("Error al enviar correo:", emailError.message);
            // No falla el pedido si el correo falla
        }

        res.status(201).json({ message: "Pedido creado exitosamente", pedido: newPedido });
    } catch (error) {
        console.error("Error al guardar pedido:", error);
        res.status(500).json({ message: "Error al crear pedido", error: error.message });
    }
};

export const obtenerpedido = async (req, res) => {
    try {
        const listaPedidos = await pedidos.find().sort({ fecha: -1 });
        res.json(listaPedidos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener pedidos" });
    }
};