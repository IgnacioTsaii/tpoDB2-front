import React from "react";


export default function ActivityList({ list }) {
    return (
        <div>
        {list.map((activity) => (
            <div key={activity.id} className="mt-2">
            <p className="text-sm">{activity.name}</p>
            <p className="text-sm">{activity.description}</p>
            </div>
        ))}
        </div>
    );
    }