import { useState } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({}); // Manejo de errores en un objeto
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!name.trim()) newErrors.name = "El nombre es obligatorio.";
    if (!email.trim()) newErrors.email = "El correo es obligatorio.";
    if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "El correo no tiene un formato válido.";
    if (!password.trim()) newErrors.password = "La contraseña es obligatoria.";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setErrors({}); // Limpia errores anteriores
      const response = await axiosClient.post("/auth/register", {
        name,
        email,
        password,
      });

      alert(`Usuario registrado con éxito: ${response.data.user.id}`);
      navigate("/login"); // Redirigir al usuario al login después del registro
    } catch (error) {
      console.error("Error al registrar usuario:", error.response?.data || error.message);
      setErrors({
        general: error.response?.data?.message || "Error al registrar el usuario. Por favor, inténtalo nuevamente.",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/to-do.webp')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <form
        onSubmit={handleRegister}
        className="relative bg-white bg-opacity-90 p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Regístrate</h2>
        {errors.general && (
          <p className="bg-red-500 text-white text-sm p-2 rounded mb-4">{errors.general}</p>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Tu nombre"
          />
          {errors.name && <p className="text-red-500 text-xs italic mt-2">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Correo</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Tu correo electrónico"
          />
          {errors.email && <p className="text-red-500 text-xs italic mt-2">{errors.email}</p>}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Tu contraseña"
          />
          {errors.password && <p className="text-red-500 text-xs italic mt-2">{errors.password}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Registrar
        </button>
        <p className="text-center text-sm text-gray-600 mt-4">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Inicia sesión aquí
          </Link>
        </p>
      </form>
    </div>
  );
}
