import React, { useEffect, useState } from 'react';
import getUsersByProjectId from "@/actions/users/getUsersByProjectId";

export default function AssignUserModal({ isOpen, onClose, onAssign, projectId, taskId }) {
  const [selectedUser, setSelectedUser] = useState();
  const [users, setUsers] = useState([]);

  useEffect(
    () => {
      const fetchUsers = async () => {
        const usersData = await getUsersByProjectId(projectId);
        setUsers(usersData);
      };
      fetchUsers();
    },[projectId])

  const handleSelectUser = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedUser) {
      onAssign(selectedUser, taskId);
      onClose();
    } else {
      alert("Por favor, selecciona un usuario.");
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
              className="w-full bg-white border border-gray-300 rounded px-3 py-2 outline-none"
              value={selectedUser}
              onChange={handleSelectUser}
            >
              <option value="">Seleccione un Usuario</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.firstname} {user.lastname} ({user.skillLevel})
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
              onClick={handleSubmit}
            >
              Asignar
            </button>
          </div>
        </div>
      </div>
    );
}
