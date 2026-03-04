import { useState } from "react";
import Navbar from "../Layout/Navbar.jsx";
import { useCart } from "../../context/CartContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const formatPrice = (price) =>
    new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(price);

const API_URL = "http://localhost:8081/api/pedidos";

export default function Carrito() {
    const { carrito, eliminarDelCarrito, cambiarCantidad, total, vaciarCarrito } = useCart();
    const { usuario } = useAuth();
    const navigate = useNavigate();

    const [direccion, setDireccion] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [codigoPostal, setCodigoPostal] = useState("");
    const [metodoPago, setMetodoPago] = useState("Efectivo contra entrega");
    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });

    const handleFinalizarCompra = async () => {
        if (!usuario) {
            navigate("/login");
            return;
        }
        if (!direccion || !ciudad) {
            setMensaje({ tipo: "error", texto: "Por favor completa la dirección y ciudad." });
            return;
        }
        if (carrito.length === 0) {
            setMensaje({ tipo: "error", texto: "Tu carrito está vacío." });
            return;
        }

        setLoading(true);
        setMensaje({ tipo: "", texto: "" });

        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${usuario.token}`,
                },
                body: JSON.stringify({
                    email: usuario.email,
                    direccion,
                    ciudad,
                    codigoPostal,
                    productos: carrito.map((p) => ({
                        nombre: p.nombre,
                        cantidad: p.cantidad,
                        precio: p.precio,
                    })),
                    metodo_pago: metodoPago,
                    total,
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Error al crear pedido");

            setMensaje({ tipo: "success", texto: "¡Pedido realizado con éxito! 🎉" });
            vaciarCarrito();
            setTimeout(() => navigate("/productos"), 2500);
        } catch (error) {
            setMensaje({ tipo: "error", texto: error.message || "Error al procesar el pedido." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-8 items-start">

                    {/* Lista de productos */}
                    <div className="flex-1">
                        <h1 className="text-4xl font-semibold flex items-center gap-2">
                            <span className="text-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-10">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>
                            </span>
                            Tu Carrito
                        </h1>
                        <p className="text-gray-500 mt-1 mb-6">Revisa tus productos antes de finalizar la compra</p>

                        {carrito.length === 0 ? (
                            <div className="text-center py-24 text-gray-400 bg-white rounded-2xl shadow-sm">
                                <p className="text-6xl mb-4">🛒</p>
                                <p className="text-xl font-semibold">Tu carrito está vacío</p>
                                <p className="text-sm mt-2">Agrega productos desde la tienda</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {carrito.map((producto) => (
                                    <div key={producto.id} className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-4">
                                        <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                                            {producto.image
                                                ? <img src={producto.image} alt={producto.nombre} className="w-full h-full object-cover" />
                                                : <div className="w-full h-full flex items-center justify-center text-3xl">📦</div>
                                            }
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-gray-800 truncate">{producto.nombre}</h3>
                                            <p className="text-blue-600 font-semibold text-sm">{formatPrice(producto.precio)}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => cambiarCantidad(producto.id, producto.cantidad - 1)} className="w-8 h-8 rounded-lg border border-gray-200 hover:bg-gray-100 font-bold text-lg leading-none">−</button>
                                            <span className="w-6 text-center font-semibold">{producto.cantidad}</span>
                                            <button onClick={() => cambiarCantidad(producto.id, producto.cantidad + 1)} className="w-8 h-8 rounded-lg border border-gray-200 hover:bg-gray-100 font-bold text-lg leading-none">+</button>
                                        </div>
                                        <span className="font-bold text-gray-800 w-32 text-right hidden sm:block">{formatPrice(producto.precio * producto.cantidad)}</span>
                                        <button onClick={() => eliminarDelCarrito(producto.id)} className="text-red-400 hover:text-red-600 transition-colors text-lg ml-1" title="Eliminar">✕</button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Resumen */}
                    <div className="w-full lg:w-96 bg-white shadow-xl rounded-2xl p-6 sticky top-24">
                        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                            <span className="text-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                                </svg>
                            </span>
                            Resumen del Pedido
                        </h2>

                        <div className="mt-2">
                            <div className="flex justify-between py-1">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="font-medium">{formatPrice(total)}</span>
                            </div>
                            <div className="flex justify-between py-1">
                                <span className="text-gray-600">Envío</span>
                                <span className="text-green-600 font-semibold">Gratis</span>
                            </div>
                        </div>

                        <div className="mt-4 bg-gray-100 rounded-xl p-3 flex justify-between font-bold">
                            <span>Total</span>
                            <span className="text-blue-600">{formatPrice(total)}</span>
                        </div>

                        <hr className="my-4" />

                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                            <span className="text-blue-600">📍</span> Información de Envío
                        </h3>

                        <input
                            type="text"
                            placeholder="Ej: Calle 123 #45-67"
                            value={direccion}
                            onChange={(e) => setDireccion(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-blue-400 transition mb-3"
                        />

                        <div className="flex gap-3 mb-3">
                            <input
                                className="w-1/2 border border-gray-300 rounded-lg p-3 outline-none focus:border-blue-400 transition"
                                placeholder="Ciudad"
                                value={ciudad}
                                onChange={(e) => setCiudad(e.target.value)}
                            />
                            <input
                                className="w-1/2 border border-gray-300 rounded-lg p-3 outline-none focus:border-blue-400 transition"
                                placeholder="Código Postal"
                                value={codigoPostal}
                                onChange={(e) => setCodigoPostal(e.target.value)}
                            />
                        </div>

                        <select
                            value={metodoPago}
                            onChange={(e) => setMetodoPago(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-blue-400 transition"
                        >
                            <option>Efectivo contra entrega</option>
                            <option>Tarjeta De Credito/Debito</option>
                            <option>Efecty</option>
                            <option>PSE</option>
                        </select>

                        {/* Mensaje */}
                        {mensaje.texto && (
                            <div className={`mt-4 p-3 rounded-lg text-sm font-medium ${mensaje.tipo === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                                {mensaje.texto}
                            </div>
                        )}

                        <button
                            onClick={handleFinalizarCompra}
                            disabled={carrito.length === 0 || loading}
                            className="w-full mt-5 py-3 rounded-xl text-white font-semibold bg-linear-to-r from-blue-600 to-purple-500 hover:from-blue-700 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                    </svg>
                                    Procesando...
                                </>
                            ) : (
                                "✓ Finalizar Compra"
                            )}
                        </button>

                        <ul className="mt-5 text-gray-700 space-y-1 text-sm">
                            <li>✓ Compra segura y protegida</li>
                            <li>✓ Envío gratis en compras +$100.000</li>
                            <li>✓ Soporte 24/7</li>
                        </ul>
                    </div>
                </div>
            </main>
        </>
    );
}