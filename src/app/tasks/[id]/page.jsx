'use client'
import React, { useEffect, useState } from 'react';
import CircularProgressWithLabel from '@/components/CircularProgressWithLabel';
import ActivityList from '@/components/ActivityList';
import Loader from '@/components/Loader';

export default function TaskPage({ params }) {
    const { id: task_id } = params;
    const [task, setTask] = useState(null);
    const [activities, setActivities] = useState([]);

    if (!task) return <Loader />;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">{task.name}</h1>
            <p className="mb-4">{task.description}</p>
            <p className="mb-4">
                <strong>Nivel de Habilidad:</strong> {task.skill_level}
            </p>
            <p className="mb-4">
                <CircularProgressWithLabel value={task.status} />
            </p>
            <p className="mb-4">
                <strong>Fecha de Inicio:</strong> {new Date(task.start_date).toLocaleDateString()}
            </p>
            <p className="mb-4">
                <strong>Fecha de Finalización:</strong> {new Date(task.end_date).toLocaleDateString()}
            </p>
            <ActivityList list={activities} taskName={task.name} />
        </div>
    );
}
