'use client'
import React, { useEffect, useState } from 'react';
import CircularProgressWithLabel from '@/components/progress/CircularProgressWithLabel';
import ActivityList from '@/components/taskComponents/ActivityList';
import Loader from '@/components/Loader';
import FormComment from '@/components/formularios/formComment';
import CommentList from '@/components/comment/CommentList'
import EditActivityModal from '@/components/modals/activity/EditActivityModal';
import CreateActivityModal from '@/components/modals/activity/CreateActityModal';

export default function TaskPage({ params }) {
    const task_id = params.id;
    

    const [task, setTask] = useState(
        {
            task_id: 1,
            name: 'Tarea 1',
            description: 'Descripción de la tarea 1',
            skill_level: 'Intermedio',
            status: 50,
            start_date: '2021-09-01',
            end_date: '2021-09-10',
        }
    );
    const [activities, setActivities] = useState([
        {
            id: 1,
            description: 'Actividad 1',
            time_worked: 5,
            progress_percentage: 50,
            timestamp: '2021-09-01 12:00:00',
        },
        {
            id: 2,
            description: 'Actividad 2',
            time_worked: 10,
            progress_percentage: 100,
            timestamp: '2021-09-02 12:00:00',
        },
    ]);
    const [comments, setCommets] = useState([
        {
            id: 1,
            users:
                {
                    user_id: 2,
                    username: "developer1",
                    role: "Employee",
                    name: "John",
                    last_name: "Doe",
                    email: "john.doe@example.com",
                    weekly_hours: 30,
                    skill_level: "BACKEND_MID",
                  },
            comment: 'Comentario 1',
            timestamp: '2021-09-01 12:00:00',
        },
        {
            id: 2,
            users:
                {
                    user_id: 3,
                    username: "devops_specialist",
                    role: "Employee",
                    name: "Jane",
                    last_name: "Smith",
                    email: "jane.smith@example.com",
                    weekly_hours: 35,
                    skill_level: "DEVOPS_SENIOR",
                    },
            comment: 'Comentario 2',
            timestamp: '2021-09-02 12:00:00',
            }
    ]);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [currentActivity, setCurrentActivity] = useState(null);

    useEffect(() => {
        // Aquí puedes agregar la lógica para obtener los datos de la tarea y las actividades desde una API
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
