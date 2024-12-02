import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { getTasks, createTask, updateTask, deleteTask } from "../services/taskService";

export default function TaskPage() {
  const { isAuthenticated, handleLogout } = useApp();
  const [tasks, setTasks] = useState([]); // Estado para las tareas
  const [loading, setLoading] = useState(true); // Estado para el cargando
  const [error, setError] = useState(""); // Estado para errores

  // Redirige al login si no está autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      handleLogout();
    }
  }, [isAuthenticated, handleLogout]);

  // Cargar las tareas al montar el componente
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks();
        setTasks(response.tasks || []); // Carga las tareas
      } catch (err) {
        console.error("Error al cargar las tareas:", err);
        setError("No se pudieron cargar las tareas.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async (newTask) => {
    try {
      const response = await createTask(newTask);
      setTasks((prevTasks) => [...prevTasks, response.task]);
    } catch (err) {
      console.error("Error al agregar tarea:", err);
      alert("Error al agregar tarea.");
    }
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      await updateTask(updatedTask._id, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        )
      );
    } catch (err) {
      console.error("Error al actualizar tarea:", err);
      alert("Error al actualizar tarea.");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (err) {
      console.error("Error al eliminar tarea:", err);
      alert("Error al eliminar tarea.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Error al cargar las tareas */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Formulario para agregar nuevas tareas */}
      <TaskForm onAddTask={handleAddTask} />

      {/* Lista de tareas o mensaje de cargando */}
      {loading ? (
        <p className="text-gray-500">Cargando tareas...</p>
      ) : (
        <TaskList
          tasks={tasks}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
        />
      )}
    </div>
  );
}
