import { useState } from "react";

export default function TaskList({ tasks, onUpdateTask, onDeleteTask }) {
  const [editingTask, setEditingTask] = useState(null);

  const handleUpdateTask = (e) => {
    e.preventDefault();
    onUpdateTask(editingTask);
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar esta tarea?"
    );
    if (confirmDelete) {
      onDeleteTask(taskId);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl bg-gradient-to-r from-blue-500 to-blue-700 bg-opacity-90 text-white shadow-xl rounded-lg mt-12">
      <h1 className="text-3xl text-center font-bold mb-6 mt-4">Lista de Tareas</h1>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="bg-white bg-opacity-25 shadow-md rounded p-4 hover:bg-opacity-50 transition-all duration-300"
          >
            {editingTask && editingTask._id === task._id ? (
              <form onSubmit={handleUpdateTask} className="space-y-3">
                <input
                  type="text"
                  value={editingTask.title}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, title: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  placeholder="Título de la tarea"
                />
                <textarea
                  value={editingTask.description}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, description: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  rows="3"
                  placeholder="Descripción de la tarea"
                ></textarea>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Guardar
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingTask(null)}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col">
                <div className="flex justify-between items-start">
                  <div className="w-4/5">
                    <h2 className="text-lg font-bold mb-1">{task.title}</h2>
                    <p className="text-gray-200 text-sm">{task.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingTask(task)}
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Actualizar
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
                <div className="text-sm text-white mt-2">
                  <p>
                    <strong>Creado:</strong>{" "}
                    {new Date(task.createdAt).toLocaleString()}
                  </p>
                  <p>
                    <strong>Actualizado:</strong>{" "}
                    {new Date(task.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
