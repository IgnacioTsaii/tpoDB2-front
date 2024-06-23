import React from "react";
import Modal from "react-modal";

interface DeleteProjectProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

// Modal.setAppElement('#__next'); // Asegúrate de que este ID coincide con el contenedor principal de tu app

const DeleteProject: React.FC<DeleteProjectProps> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      contentLabel="Confirmar Eliminación"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Confirmar Eliminación</h2>
        <p className="mb-6">¿Estás seguro de que deseas eliminar este proyecto?</p>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={onConfirm}
          >
            Eliminar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteProject;
