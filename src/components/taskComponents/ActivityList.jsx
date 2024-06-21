import React from 'react';
import ActivityCard from '@/components/ActivityCard';

export default function ActivityList({ list, taskName }) {
    return (
        <div>
            <h2 className="text-2xl font-bold mt-6">Actividades</h2>
            <ul>
                {list.map((activity) => (
                    <ActivityCard key={activity.id} activity={activity} taskName={taskName} />
                ))}
            </ul>
        </div>
    );
}
