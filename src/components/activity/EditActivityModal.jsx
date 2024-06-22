import React from 'react';
import FormEditActivity from '../formularios/FormEditActivity';

export default function EditActivityModal({ activity, isOpen, onClose, onSave }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <h2 className="text-xl font-bold mb-4">Editar Actividad</h2>
                <FormEditActivity activity={activity} onClose={onClose} onSave={onSave} />
            </div>
        </div>
    );
};


