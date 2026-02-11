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

//actualizar producto
export const actualizarProducto = async (req, res) => {
  try {
      const {id} = req.params;
      const {productId, nombre, descripcion, precio, image} = req.body;
      const productoActualizado = await Productos .findByIdAndUpdate(id, {productId, nombre, descripcion, precio, image}, {new: true});
      if (!productoActualizado) {
          return res.status(404).json({message: "Producto no encontrado"});
      }
      res.json({message: "Producto actualizado exitosamente", producto: productoActualizado});
  } catch (error) {
      console.error("Error al actualizar el producto:", error);
      res.status(500).json({message: "Error al actualizar el producto"});
  };
}

//eliminar producto 
export const eliminarProducto = async (req, res) => {
  try {
      const {id} = req.params;  
      const productoEliminado = await Productos.findByIdAndDelete(id);
      if (!productoEliminado) {
          return res.status(404).json({message: "Producto no encontrado"});
      }
      res.json({message: "Producto eliminado exitosamente"});
  } catch (error) {
      console.error("Error al eliminar el producto:", error);
      res.status(500).json({message: "Error al eliminar el producto"});
  };
}