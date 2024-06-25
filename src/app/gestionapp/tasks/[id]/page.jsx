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
import postComment from "@/actions/comments/postComment";

export default function TaskPage({ params }) {
    const task_id = params.id;

    const [isAdmin, setIsAdmin] = useState(false); // Asegúrate de definir y establecer esto correctamente
    const [task, setTask] = useState(null);
    const [activities, setActivities] = useState([]);
    const [comments, setComments] = useState([]);
    const [userId, setUserId] = useState("");

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
                setUserId(decodedToken.userId);
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
    };

    const handleOpenCreateModal = () => {
        setIsCreateModalOpen(true);
    };

    const handleCloseCreateModal = () => {
        setIsCreateModalOpen(false);
    };

    const handleCreateActivity = async (newActivity) => {
        try {
            const response = await PostActiviy(newActivity);
            alert(response.message);
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    const handleSubmitComment = async (data) => {
        console.log(data);
        try {
            const response = await postComment(data);
            alert("Comentario creado correctamente: " + response.message);
            window.location.reload();
        } catch (error) {
            console.error("Error al crear comentario:", error);
            alert("Error al crear comentario: " + error.message);
        }
    };

    const assignTask = async (userId, task_id) => {
        console.log(userId, task_id);
        try {
            const response = await putAssignTask(userId, task_id);
            alert(response.message);
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
    const formatDate = (time) => {
        // Obtener el timestamp como una cadena
        const timestampString = time;
        // Crear un objeto Date a partir del timestamp
        const dateObject = new Date(timestampString);
        // Formatear la fecha y hora en formato legible
        const formattedTimestamp = `${dateObject.toLocaleDateString()}`;
        return formattedTimestamp;
    };
    if (!task) return <Loader />;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">{task.name}</h1>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white shadow-md rounded-md p-6">
                    <p className="mb-4 text-gray-700">{task.description}</p>
                    <p className="mb-4 text-gray-700">
                        <strong>Nivel de Habilidad:</strong> {task.skillLevel}
                    </p>
                    <div className="mb-4 flex items-center text-gray-700">
                        <strong>Status:</strong>
                        <span className="ml-2">
                            <CircularProgressWithLabel value={task.status} />
                        </span>
                    </div>
                    <p className="mb-4 text-gray-700">
                        <strong>Fecha de Inicio:</strong>{" "}
                        {formatDate(task.start_date)}
                    </p>
                    <p className="mb-4 text-gray-700">
                        <strong>Fecha de Finalización:</strong>{" "}
                        {formatDate(task.end_date)}
                    </p>
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

                {isAdmin && (
                    <div className="bg-white shadow-md rounded-md p-6 flex flex-col justify-between">
                        <div className="mb-4">
                            <h2 className="text-xl font-bold mb-2 text-gray-700">
                                Asignación de Usuario
                            </h2>
                            {task.user ? (
                                <button
                                    onClick={handleOpenAssignModal}
                                    className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded mt-2">
                                    Reasignar
                                </button>
                            ) : (
                                <button
                                    onClick={handleOpenAssignModal}
                                    className="bg-green-400 hover:bg-green-600 text-white font-bold py-1 px-2 rounded mt-2">
                                    Asignar
                                </button>
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
                )}
            </div>

            <ActivityList
                list={activities}
                task_Id={task_id}
                onEdit={handleOpenEditModal}
                onCreate={handleOpenCreateModal}
                userId={userId}
            />

            <div>
                <FormComment
                    onSubmit={handleSubmitComment}
                    taskId={task.task_id}
                    userId={userId}
                />
                <CommentList list={comments} />
            </div>

            {isEditModalOpen && (
                <EditActivityModal
                    activity={currentActivity}
                    isOpen={isEditModalOpen}
                    onClose={handleCloseEditModal}
                    onSave={handleSaveActivity}
                    UserID={userId}
                />
            )}
            {isCreateModalOpen && (
                <CreateActivityModal
                    isOpen={isCreateModalOpen}
                    onClose={handleCloseCreateModal}
                    onSave={handleCreateActivity}
                    task_id={task_id}
                    user_id={userId}
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
