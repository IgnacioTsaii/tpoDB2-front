"use client";
import EditTaskModal from "@/components/modals/task/EditTaskModal";
import Link from "next/link";
import { useState } from "react";

export default function TaskList({ tasks, isAdmin, handleEdit, handleDelete }) {
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openEditModal = (task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedTask(null);
    setIsEditModalOpen(false);
  };

  const handleSaveTask = (updatedTask) => {
    handleEdit(updatedTask);
    closeEditModal();
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {tasks.map((task) => (
        <div key={task.task_id} className="p-4 border rounded shadow-md">
          <p className="text-xl font-bold">{task.name}</p>
          <p>{task.description}</p>
          <p>Skill Level:<strong> {task.skillLevel}</strong> </p>
          {/* resaltar el uduario asignado */}

<<<<<<< HEAD
          <p>usuario asignado: <strong>{task.user ? task.user.name : 'No asignado'}</strong></p>
=======
          <div>
                        {task.user ? (
                            <p className="text-sm text-gray-600">
                                Asignado a: {task.user.name}{" "}
                                {task.user.last_name}
                            </p>
                        ) : (
                            <p className="text-sm text-gray-600">
                                Usuario no asignado
                            </p>
                        )}
                    </div>
>>>>>>> 8dec3a7842a82fc3ccdef180fe1aae685824e24d

          <div className="flex justify-end mt-4 space-x-2">
            {isAdmin && (
              <>
                <button
                  onClick={() => openEditModal(task)}
                  className="bg-yellow-400 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(task.task_id)}
                  className="bg-red-400 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Eliminar
                </button>
              </>
            )}
            <Link
              href={`/gestionapp/tasks/${task.task_id}`}
              className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
            >
              Ver Más
            </Link>
          </div>
        </div>
      ))}
      {isEditModalOpen && (
        <EditTaskModal
          task={selectedTask}
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          onSave={handleSaveTask}
        />
      )}
    </div>
  );
}
