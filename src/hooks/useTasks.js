import { useEffect, useState } from "react";
import { getTasks, createTask } from "../services/taskService";
import { useApp } from "../context/AppContext";

export const useTasks = () => {
  const { userId, tasks, setTasks } = useApp();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    if (!userId) {
      return;
    }

    console.log("Fetching tasks for userId:", userId);
    setLoading(true);
    try {
      const response = await getTasks(userId);
      console.log("Tasks fetched:", response.tasks); 
      setTasks(response.tasks || []); 
    } catch (err) {
      console.error("Error al obtener las tareas:", err);
      setError("Error al obtener las tareas");
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (newTask) => {
    if (!userId) {
      return;
    }

    try {
      console.log("Adding new task:", newTask);
      await createTask({ ...newTask, userId });
      await fetchTasks(); 
    } catch (err) {
      console.error("Error al crear la tarea:", err);
      setError("Error al crear la tarea");
    }
  };

  useEffect(() => {
    if (userId) {
      fetchTasks();
    } else {
      console.log("Limpiando tareas: userId no existe."); 
      setTasks([]);
    }
  }, [userId]);

  return { tasks, loading, error, addTask };
};
