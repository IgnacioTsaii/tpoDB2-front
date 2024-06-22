import React from 'react';
import CircularProgressWithLabel from '@/components/progress/CircularProgressWithLabel';

export default function ActivityCard({ activity, taskName }) {
    return (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{taskName}</h3>
            <p className="text-gray-600 mb-2">{activity.description}</p>
            <p className="text-gray-600 mb-2">Duración: {activity.time_worked} horas</p>
            <div className="mb-4">
                <CircularProgressWithLabel value={activity.progress_percentage} />
            </div>
            <p className="text-gray-600">
                <strong>Timestamp:</strong> {activity.timestamp}
            </p>
        </div>
    );
}
