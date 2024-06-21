import React from 'react';
import Modal from 'react-modal';

interface DeleteUserModalProps {
    isOpen: boolean;
    closeModal: () => void;
    handleDelete: () => void;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({ isOpen, closeModal, handleDelete }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Confirm Delete"
            className="fixed inset-0 flex items-center justify-center"
            overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-50"
        >
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
                <p className="mb-4">Are you sure you want to delete this Employee?</p>
                <div className="flex items-center justify-between">
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Delete
                    </button>
                    <button
                        type="button"
                        onClick={closeModal}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteUserModal;