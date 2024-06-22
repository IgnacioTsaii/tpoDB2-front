import React from 'react';
import CircularProgressWithLabel from '@/components/progress/CircularProgressWithLabel';

export default function ActivityCard({ activity, onEdit }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">{activity.description}</h2>
            <div className="flex justify-between items-center mb-2">
                <p className="text-gray-600">Duración: {activity.time_worked} horas</p>
                <p className="text-gray-600">
                    <strong>Timestamp:</strong> {activity.timestamp}
                </p>
            </div>
            <div className="flex justify-between items-center">
                <CircularProgressWithLabel value={activity.progress_percentage} />
                <div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                        onClick={() => onEdit(activity)}
                    >
                        Editar
                    </button>
                </div>
            </div>
        </div>
    );
}
