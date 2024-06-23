import React from 'react';
import FormCreateActivity from '../../formularios/FromCreateActivity';

const CreateActivityModal = ({ isOpen, onClose, onSave, task_id }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <h2 className="text-xl font-bold mb-4">Crear Actividad</h2>
                <FormCreateActivity onClose={onClose} onSave={onSave}  task_id={task_id}/>
            </div>
        </div>
    );
};

export default CreateActivityModal;
