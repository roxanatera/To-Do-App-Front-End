import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TaskPage from "./pages/TaskPage";

function App() {
  const { isAuthenticated } = useApp();

  return (
    <Router>
      <AppProvider>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? <Navigate to="/tasks" replace /> : <Navigate to="/login" replace />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/tasks"
            element={isAuthenticated ? <TaskPage /> : <Navigate to="/login" replace />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppProvider>
    </Router>
  );
}

export default App;
