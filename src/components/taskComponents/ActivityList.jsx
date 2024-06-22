import React from 'react';
import ActivityCard from '@/components/activity/activitiCard';

export default function ActivityList({ list, taskName, onEdit, onCreate }) {
    return (
        <div>
            <h2 className="text-2xl font-bold mt-6">Actividades</h2>
            <button className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded"
                onClick={() => console.log("revertir")}
            >
                Revertir
            </button>
            <button className="ml-2 bg-gray-300 hover:bg-green-400 text-gray-800 font-bold py-1 px-2 rounded"
                onClick={onCreate}
            >
                Crear actividad
            </button>
            <ul>
                {list.map((activity) => (
                    <ActivityCard key={activity.id} activity={activity} taskName={taskName} onEdit={onEdit} />
                ))}
            </ul>
        </div>
    );
}
