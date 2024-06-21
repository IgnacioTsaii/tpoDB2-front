import Link from 'next/link';
import React from 'react';

export default function TaskList({ tasks, isAdmin, handleEdit, handleDelete }) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {tasks.map((task) => (
        <div key={task.id} className="p-4 border rounded shadow-md">
          <p className="text-lg font-bold">{task.name}</p>
          <p>{task.description}</p>
          <p>Skill Level: {task.skill_level}</p>

          <div className="flex justify-end mt-4 space-x-2">
            {isAdmin && (
              <>
                <button
                  onClick={() => handleEdit(task.task_id)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(task.task_id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Eliminar
                </button>
              </>
            )}
            <Link href={`/tasks/${task.task_id}`}
             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                Ver Más

            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

