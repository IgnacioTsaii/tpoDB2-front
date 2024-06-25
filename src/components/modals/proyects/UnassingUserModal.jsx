// En el archivo donde estás manejando los modales (por ejemplo, AssignUserModal.js)

import React, { useState } from "react";

export default function UnassignUserModal({ isOpen, onClose, onUnassign, users, projectId }) {
  const [userId, setUserId] = useState(""); // Estado para almacenar el ID del usuario a desasignar

  const handleSubmit = (e) => {
    e.preventDefault();
    // Llamar a la función onUnassign con el userId y cerrar el modal
    onUnassign(userId,projectId);
    onClose();
  };
  const handleSelectUser = (e) => {
    setUserId(e.target.value);
  };

  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div
          className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <h1 className="text-lg font-bold mb-2">Desasignar Usuario</h1>
              <p className="text-sm text-gray-600">
                ¿Estás seguro de que deseas desasignar este usuario de la tarea?
              </p>
            </div>
            <div className="mb-4">
          <label className="block text-gray-700 mb-2">Seleccione un Usuario</label>
          <select
            className="w-full bg-white border border-gray-300 rounded px-3 py-2 outline-none"
            value={userId}
            onChange={handleSelectUser}
          >
            <option value="null">Seleccione un Usuario</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.firstname} {user.lastname}
              </option>
            ))}
          </select>
        </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-150 ease-in-out"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-150 ease-in-out"
              >
                Desasignar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
