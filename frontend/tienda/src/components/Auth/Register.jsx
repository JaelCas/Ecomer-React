import { useState } from "react";
import { Eye, EyeOff, UserPlus, Shield, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        telefono: "",
        email: "",
        password: "",
        confirmPassword: "",
        terms: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: "", text: "" });

        if (!formData.nombre || !formData.apellido || !formData.email || !formData.telefono || !formData.password) {
            return setMessage({ type: "error", text: "Todos los campos son obligatorios" });
        }

        if (formData.password !== formData.confirmPassword) {
            return setMessage({ type: "error", text: "Las contraseñas no coinciden" });
        }

        if (!formData.terms) {
            return setMessage({ type: "error", text: "Debes aceptar los términos y condiciones" });
        }

        try {
            setLoading(true);

            await axios.post(
                "http://localhost:8081/api/register/register",
                {
                    nombre: formData.nombre,
                    apellido: formData.apellido,
                    telefono: formData.telefono,
                    email: formData.email,
                    password: formData.password
                }
            );

            setMessage({ type: "success", text: "¡Cuenta creada exitosamente! Redirigiendo..." });

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {
            setMessage({
                type: "error",
                text: error.response?.data?.message || "Error al registrar usuario"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center px-4 py-12 bg-linear-to-br from-blue-50 via-white to-purple-50">
            <div className="w-full max-w-2xl">
                <div className="bg-white rounded-2xl shadow-2xl p-10 border border-gray-100">

                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-r from-blue-600 to-purple-600 rounded-full mb-4">
                            <UserPlus className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">¡Únete a TechStore Pro!</h2>
                        <p className="text-gray-600">Crea tu cuenta y disfruta de ofertas exclusivas</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Nombre y Apellido en la misma fila */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                placeholder="Nombre"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                required
                            />
                            <input
                                name="apellido"
                                value={formData.apellido}
                                onChange={handleChange}
                                placeholder="Apellido"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                required
                            />
                        </div>

                        {/* Email */}
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Correo electrónico"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            required
                        />

                        {/* Teléfono */}
                        <input
                            type="tel"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                            placeholder="Teléfono"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            required
                        />

                        {/* Password */}
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Contraseña"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg pr-12 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                required
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>

                        {/* Confirm Password */}
                        <div className="relative">
                            <input
                                type={showConfirm ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirmar contraseña"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg pr-12 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                required
                            />
                            <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>

                        {/* Terms */}
                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                            <input
                                type="checkbox"
                                name="terms"
                                checked={formData.terms}
                                onChange={handleChange}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            Acepto términos y condiciones
                        </label>

                        {/* Message */}
                        {message.text && (
                            <p className={`text-sm font-medium ${message.type === "error" ? "text-red-600" : "text-green-600"}`}>
                                {message.text}
                            </p>
                        )}

                        {/* Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold flex justify-center items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Crear Cuenta"}
                        </button>

                        <p className="text-center text-gray-600">
                            ¿Ya tienes cuenta?{" "}
                            <button type="button" onClick={() => navigate("/login")} className="text-blue-600 font-semibold hover:text-blue-700 transition">
                                Inicia sesión aquí
                            </button>
                        </p>

                    </form>
                </div>

                <div className="mt-6 text-center text-sm text-gray-600 flex justify-center gap-2">
                    <Shield className="w-4 h-4" />
                    Tu información está protegida
                </div>
            </div>
        </main>
    );
}
