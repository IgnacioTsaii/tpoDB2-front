'use client'
import React, { useEffect, useState } from 'react';
import CircularProgressWithLabel from '@/components/progress/CircularProgressWithLabel';
import ActivityList from '@/components/taskComponents/ActivityList';
import Loader from '@/components/Loader';
import FormTask from '@/components/formularios/formTask';
import CommentList from '@/components/comment/CommentList'

export default function TaskPage({ params }) {
    const task_id = params.id;
    const [task, setTask] = useState(null);
    const [activities, setActivities] = useState([]);
    const [comments, setCommets] = useState([])


    useEffect(() => {
            
        },[task_id]);

    if (!task) return <Loader />;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">{task.name}</h1>
            <p className="mb-4">{task.description}</p>
            <p className="mb-4">
                <strong>Nivel de Habilidad:</strong> {task.skill_level}
            </p>
            <div className="mb-4">
                <CircularProgressWithLabel value={task.status} />
            </div>
            <p className="mb-4">
                <strong>Fecha de Inicio:</strong> {new Date(task.start_date).toLocaleDateString()}
            </p>
            <p className="mb-4">
                <strong>Fecha de Finalización:</strong> {new Date(task.end_date).toLocaleDateString()}
            </p>
            <ActivityList list={activities} taskName={task.name} />

            {/* form para crear comentario */}
            <div>
                <FormTask/>
                {/* Lista de comentarios de la tarea */}
                <CommentList list={comments}  />

            </div>
        </div>
    );
}
