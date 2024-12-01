import { useState } from "react";

export default function TaskList({ tasks, onUpdateTask, onDeleteTask }) {
  const [editingTask, setEditingTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null); // Estado para manejar la tarea a eliminar

  const handleUpdateTask = (e) => {
    e.preventDefault();
    onUpdateTask(editingTask);
    setEditingTask(null);
  };

  const confirmDeleteTask = () => {
    onDeleteTask(taskToDelete); // Llama la función para eliminar la tarea
    setTaskToDelete(null); // Limpia el estado
  };

  const cancelDeleteTask = () => {
    setTaskToDelete(null); // Cierra el modal sin eliminar
  };

  return (
    <>
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
                  <div className="flex gap-2 flex-wrap">
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
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div className="w-full sm:w-4/5">
                      <h2 className="text-lg font-bold mb-1">{task.title}</h2>
                      <p className="text-gray-200 text-sm">{task.description}</p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={() => setEditingTask(task)}
                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Actualizar
                      </button>
                      <button
                        onClick={() => setTaskToDelete(task._id)} // Abre el modal
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

      {/* Modal de Confirmación */}
      {taskToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-bold mb-4">¿Estás seguro de eliminar esta tarea?</h3>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelDeleteTask}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition duration-300"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDeleteTask}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
