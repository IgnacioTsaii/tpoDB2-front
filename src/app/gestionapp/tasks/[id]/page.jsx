"use client";
import React, { useEffect, useState } from "react";

// componentes usados
import CircularProgressWithLabel from "@/components/progress/CircularProgressWithLabel";
import ActivityList from "@/components/taskComponents/ActivityList";
import Loader from "@/components/Loader";
import FormComment from "@/components/formularios/formComment";
import CommentList from "@/components/comment/CommentList";
// modales
import EditActivityModal from "@/components/modals/activity/EditActivityModal";
import CreateActivityModal from "@/components/modals/activity/CreateActityModal";
import AssignUserModal from "@/components/modals/task/AssignUserModal";
// actions para los fetchs
import getTaskById from "@/actions/tasks/getTaskById";
import getActivitiesByTask from "@/actions/activities/getActivitiesByTask";
import getCommentsByTask from "@/actions/comments/getCommentsByTask";
import decodingToken from "@/actions/utils/decodingToken";
import putAssignTask from "@/actions/tasks/putAssignTask";
import PostActiviy from "@/actions/activities/postActivity";
import PutActiviy from "@/actions/activities/putActivity";

export default function TaskPage({ params }) {
    const task_id = params.id;

    const [isAdmin, setIsAdmin] = useState(false); // Asegúrate de definir y establecer esto correctamente
    const [task, setTask] = useState(null);
    const [activities, setActivities] = useState([]);
    const [comments, setComments] = useState([]);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false); // Estado para el modal de asignación
    const [currentActivity, setCurrentActivity] = useState(null);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const decodedToken = await decodingToken();
                console.log(decodedToken);
                if (decodedToken.userType === "Admin") {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
                // Tarea por id
                const taskData = await getTaskById(task_id);
                setTask(taskData);
                // Actividades por tarea
                const activitiesData = await getActivitiesByTask(task_id);
                setActivities(activitiesData);
                console.log(activitiesData);
                // Comentarios por tarea
                const commentsData = await getCommentsByTask(task_id);
                setComments(commentsData);
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

    const handleSaveActivity = async (activity) => {
        try {
            const response = await PutActiviy(activity);
            alert("Actividad actualizada correctamente: " + response.message);
            window.location.reload();
        } catch (error) {
            console.error("Error al actualizar actividad:", error);
            alert("Error al actualizar actividad: " + error.message);
        }
      }

    const handleOpenCreateModal = () => {
        setIsCreateModalOpen(true);
    };

    const handleCloseCreateModal = () => {
        setIsCreateModalOpen(false);
    };

    const handleCreateActivity = async (newActivity) => {
        try {
            const response = await PostActiviy(newActivity);
            alert("Usuario asignado correctamente: " + response.message);
            window.location.reload();
        } catch (error) {
            console.error("Error al asignar usuario:", error);
            alert("Error al asignar usuario: " + error.message);
        }
    };

    const handleSubmitComment = async (data) => {
        console.log(data);
    };

    const assignTask = async (userId, task_id) => {
        console.log(userId, task_id);
        try {
            const response = await putAssignTask(userId, task_id);
            alert("Actividad creada correctamente: " + response.message);
            window.location.reload();
        } catch (error) {
            console.error("Error al asignar usuario:", error);
            alert("Error al asignar usuario: " + error.message);
        }
    };

    const handleOpenAssignModal = () => {
        setIsAssignModalOpen(true);
    };

    const handleCloseAssignModal = () => {
        setIsAssignModalOpen(false);
    };

    if (!task) return <Loader />;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">{task.name}</h1>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <p className="mb-4">{task.description}</p>
                    <p className="mb-4">
                        <strong>Nivel de Habilidad:</strong> {task.skill_level}
                    </p>
                    <div className="mb-4 flex items-center">
                        <strong>Status:</strong>
                        <span className="ml-2">
                            <CircularProgressWithLabel value={task.status} />
                        </span>
                    </div>
                    <p className="mb-4">
                        <strong>Fecha de Inicio:</strong> {task.start_date}
                    </p>
                    <p className="mb-4">
                        <strong>Fecha de Finalización:</strong> {task.end_date}
                    </p>
                </div>
                <div className="flex flex-col items-end">
                    <div className="mb-4">
                        <h2 className="text-xl font-bold mb-2">
                            Asignación de Usuario
                        </h2>
                        {isAdmin && (
                            <>
                                {task.user ? (
                                    <button
                                        onClick={handleOpenAssignModal}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                                        Reasignar
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleOpenAssignModal}
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
                                        Asignar
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                    <div>
                        {task.user ? (
                            <p className="text-sm text-gray-600">
                                Asignado a: {task.user.name}{" "}
                                {task.user.last_name}
                            </p>
                        ) : (
                            <p className="text-sm text-gray-600">
                                Usuario no asignado
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <ActivityList
                list={activities}
                taskId={task_id}
                onEdit={handleOpenEditModal}
                onCreate={handleOpenCreateModal}
            />

            <div>
                <FormComment
                    onSubmit={handleSubmitComment}
                    taskId={task.task_id}
                />
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
                    user_id={task.user ? task.user.user_id : null}
                />
            )}
            {isAssignModalOpen && (
                <AssignUserModal
                    isOpen={isAssignModalOpen}
                    onClose={handleCloseAssignModal}
                    onAssign={assignTask}
                    projectId={task.project.projectId}
                    taskId={task.task_id}
                />
            )}
        </div>
    );
}
