import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { getTasks, createTask, updateTask, deleteTask } from "../services/taskService";

export default function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchTasks = async () => {
    if (!userId) return; // Evita cargar tareas si no hay usuario
      try {
        const response = await getTasks(userId);
        setTasks(response.tasks || []);
      } catch (err) {
        console.error("Error al cargar las tareas:", err);
        setError("No se pudieron cargar las tareas.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchTasks();
  }, [userId]);

  const handleAddTask = async (newTask) => {
    try {
      const response = await createTask({ ...newTask, userId });
      setTasks((prevTasks) => {
        
        const taskExists = prevTasks.find(task => task._id === response.task._id);
        if (taskExists) {
          return prevTasks; 
        }
        return [...prevTasks, response.task];
      });
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
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-4">
        {error && <p className="text-red-500">{error}</p>}
        <TaskForm onAddTask={handleAddTask} userId={userId} />
        {loading ? (
          <p>Cargando tareas...</p>
        ) : (
          <TaskList
            tasks={tasks}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
          />
        )}
      </div>
    </div>
  );
}
