import pedidos from "../models/pedidos.js";

export const crearpedido = async (req, res) => {
    try {
      const { pedidoId, email, direccion, fecha, nombre_producto, cantidad_producto, metodo_pago, estado, total } = req.body;
      const newPedido = new pedidos({
        pedidoId,
        email,
        direccion,
        fecha,
        nombre_producto,
        cantidad_producto,
        metodo_pago,
        estado,
        total,
      });
      await newPedido.save();
      res.status(201).json({ message: "Pedido creado exitosamente" });
    } catch (error) {
      console.error("Error al guardar pedido:", error);
      res.status(500).json({ message: "Error al ingresar pedido" });
    }
  };
  
  // obtener productos
  export const obtenerpedido = async (req, res) => {
    try {
      const listaPedidos = await pedidos.find();  // aquí listaProductos para evitar choque de nombre
      res.json(listaPedidos);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener producto" });
    }
  };
  