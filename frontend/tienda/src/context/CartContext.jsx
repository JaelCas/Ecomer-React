import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);

    const agregarAlCarrito = (producto) => {
        setCarrito((prev) => {
            const existe = prev.find((p) => p.id === producto.id);
            if (existe) {
                return prev.map((p) =>
                    p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
                );
            }
            return [...prev, { ...producto, cantidad: 1 }];
        });
    };

    const eliminarDelCarrito = (id) => {
        setCarrito((prev) => prev.filter((p) => p.id !== id));
    };

    const cambiarCantidad = (id, cantidad) => {
        if (cantidad < 1) return;
        setCarrito((prev) =>
            prev.map((p) => (p.id === id ? { ...p, cantidad } : p))
        );
    };

    const vaciarCarrito = () => setCarrito([]);

    const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
    const cantidadTotal = carrito.reduce((acc, p) => acc + p.cantidad, 0);

    return (
        <CartContext.Provider value={{
            carrito,
            agregarAlCarrito,
            eliminarDelCarrito,
            cambiarCantidad,
            vaciarCarrito,
            total,
            cantidadTotal
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart debe usarse dentro de un CartProvider");
    return context;
};