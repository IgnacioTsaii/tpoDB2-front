import React, { useState } from 'react';

export default function AssignUserModal({ isOpen, onClose, onAssign, users = [],projectId }) {
  const [selectedUser, setSelectedUser] = useState({
    userId: "",
    projectId: projectId,
  }


  );

  const handleAssign = () => {
    if (selectedUser) {
      onAssign(selectedUser);
      onClose();
    } else {
      alert('Por favor, seleccione un usuario.');
    }
  };

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? 'flex' : 'hidden'} items-center justify-center`}>
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 z-10">
        <h2 className="text-2xl mb-4">Asignar Usuario</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Seleccione un Usuario</label>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Seleccione</option>
            {users.map((user) => (
              <option key={user.user_id} value={user.user_id}>
                {user.name} {user.last_name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleAssign}
          >
            Asignar
          </button>
        </div>
      </div>
    </div>
  );
}
