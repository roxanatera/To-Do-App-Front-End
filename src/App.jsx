import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext"; // Asegúrate de que la ruta sea correcta
import Login from "./pages/Login";
import Register from "./pages/Register";
import TaskPage from "./pages/TaskPage";

function App() {
  const userId = localStorage.getItem("userId"); // Autenticación básica con localStorage

  return (
    <Router>
      <AppProvider>
        <Routes>
          {/* Ruta raíz con redirección condicional */}
          <Route
            path="/"
            element={
              userId ? <Navigate to="/tasks" replace /> : <Navigate to="/login" replace />
            }
          />
          {/* Rutas definidas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/tasks"
            element={userId ? <TaskPage /> : <Navigate to="/login" replace />}
          />
          {/* Ruta para manejar rutas no encontradas */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppProvider>
    </Router>
  );
}

export default App;
