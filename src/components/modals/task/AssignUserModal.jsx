import React, { useState } from 'react';
import Modal from 'react-modal';

export default function AssignUserModal({ isOpen, onClose, onAssign, users, projectId }) {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSelectUser = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedUser) {
      onAssign(selectedUser, projectId);
      onClose();
    } else {
      alert("Por favor, selecciona un usuario.");
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h2>Asignar Usuario al Proyecto</h2>
      <div>
        <select onChange={handleSelectUser} value={selectedUser}>
          <option value="">Selecciona un usuario</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.firstname} {user.lastnames}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Asignar
      </button>
      <button onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded">
        Cancelar
      </button>
    </Modal>
  );
}
