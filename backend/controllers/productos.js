import productos from "../models/productos.js";

// crear producto 

export const crearproductos = async (req, res) => {
  try {
    const { productId, Nombre, Descripcion, Precio, Image } = req.body;
    const newProducto = new productos({
      productId,
      Nombre,
      Descripcion,
      Precio,
      Image,
    });
    await newProducto.save();
    res.status(201).json({ message: "Producto creado exitosamente" });
  } catch (error) {
    console.error("Error al guardar producto:", error);
    res.status(500).json({ message: "Error al ingresar el producto" });
  }
};

// obtener productos
export const obtenerproductos = async (req, res) => {
  try {
    const listaProductos = await productos.find();  // aquí listaProductos para evitar choque de nombre
    res.json(listaProductos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos" });
  }
};
