'use client'
import React, { useEffect, useState } from 'react';
import CircularProgressWithLabel from '@/components/progress/CircularProgressWithLabel';
import ActivityList from '@/components/taskComponents/ActivityList';
import Loader from '@/components/Loader';
import FormComment from '@/components/formularios/formComment';
import CommentList from '@/components/comment/CommentList'
import EditActivityModal from '@/components/modals/activity/EditActivityModal';
import CreateActivityModal from '@/components/modals/activity/CreateActityModal';
import getTaskById from '@/actions/tasks/getTaskById'
import getActitiesByTask from '@/actions/activities/getActitiesByTask'
import getCommentsByTask from '@/actions/comments/getCommentsByTask'

export default function TaskPage({ params }) {
    const task_id = params.id;
    

    const [task, setTask] = useState(null);
    const [activities, setActivities] = useState([]);
    const [comments, setCommets] = useState([]);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [currentActivity, setCurrentActivity] = useState(null);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                //tarea por id 
                const taskData = await getTaskById(task_id);
                setTask(taskData);
                //actividades por tarea
                const activitiesData = await getActitiesByTask(task_id);
                setActivities(activitiesData);
                //comentarios por tarea
                const commentsData = await getCommentsByTask(task_id);
                setCommets(commentsData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchTask();
    }, [task_id]);

    const handleOpenEditModal = (activity) => {
        setCurrentActivity(activity);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setCurrentActivity(null);
    };

    const handleSaveActivity = (updatedActivity) => {
        const updatedActivities = activities.map((activity) =>
            activity.id === updatedActivity.id ? updatedActivity : activity
        );
        setActivities(updatedActivities);
        handleCloseEditModal();
    };

    const handleOpenCreateModal = () => {
        setIsCreateModalOpen(true);
    };

    const handleCloseCreateModal = () => {
        setIsCreateModalOpen(false);
    };

    const handleCreateActivity = (newActivity) => {
        setActivities([...activities, newActivity]);
        handleCloseCreateModal();
    };

    const handlerSubmit = async (data) => {
        console.log(data);
    };

    if (!task) return <Loader />;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">{task.name}</h1>
            <p className="mb-4">{task.description}</p>
            <p className="mb-4">
                <strong>Nivel de Habilidad:</strong> {task.skill_level}
            </p>
            <div className="mb-4 flex items-center"> {/* Añadido flex y items-center para alinear verticalmente */}
                <strong>Status:</strong>
                <span className="ml-2">
                    <CircularProgressWithLabel value={task.status} />
                </span>
            </div>
            <p className="mb-4">
                <strong>Fecha de Inicio:</strong> {new Date(task.start_date).toLocaleDateString()}
            </p>
            <p className="mb-4">
                <strong>Fecha de Finalización:</strong> {new Date(task.end_date).toLocaleDateString()}
            </p>
            
            <ActivityList list={activities} taskName={task.name} onEdit={handleOpenEditModal} onCreate={handleOpenCreateModal} />

            {/* Formulario para crear comentario */}
            <div>
                <FormComment onSubmit={handlerSubmit} taskId={task.task_id} />
                {/* Lista de comentarios de la tarea */}
                <CommentList list={comments} />
            </div>

            {isEditModalOpen && (
                <EditActivityModal
                    activity={currentActivity}
                    isOpen={isEditModalOpen}
                    onClose={handleCloseEditModal}
                    onSave={handleSaveActivity}
                />
            )}
            {isCreateModalOpen && (
                <CreateActivityModal
                    isOpen={isCreateModalOpen}
                    onClose={handleCloseCreateModal}
                    onSave={handleCreateActivity}
                    task_id={task_id}
                />
            )}
        </div>
    );
}
