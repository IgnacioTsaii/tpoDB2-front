"use client";
import React, { useEffect, useState } from "react";
import CircularProgressWithLabel from "@/components/progress/CircularProgressWithLabel";
import ActivityList from "@/components/taskComponents/ActivityList";
import Loader from "@/components/Loader";
import FormComment from "@/components/formularios/formComment";
import CommentList from "@/components/comment/CommentList";
import EditActivityModal from "@/components/modals/activity/EditActivityModal";
import CreateActivityModal from "@/components/modals/activity/CreateActityModal";
import AssignUserModal from "@/components/modals/task/AssignUserModal";
import getTaskById from "@/actions/tasks/getTaskById";
import getActitiesByTask from "@/actions/activities/getActitiesByTask";
import getCommentsByTask from "@/actions/comments/getCommentsByTask";
import decodingToken from "@/actions/utils/decodingToken";


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
  const [users, setUsers] = useState([]); // Estado para la lista de usuarios

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
        const activitiesData = await getActitiesByTask(task_id);
        setActivities(activitiesData);
        // Comentarios por tarea
        const commentsData = await getCommentsByTask(task_id);
        setComments(commentsData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTask();
  }, [task_id]);

  const fetchUsers = async () => {
    // Lógica para obtener usuarios (puedes reemplazar esta parte con tu propia lógica)
    const response = await fetch("http://localhost:3001/users");
    const data = await response.json();
    return data;
  };

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

  const handleSubmitComment = async (data) => {
    console.log(data);
  };

  const assignTask = async (userId, task_id) => {
    // Lógica para asignar la tarea (puedes reemplazar esta parte con tu propia lógica)
    console.log(`Asignar tarea ${task_id} a usuario ${userId}`);
    setTask({ ...task, user: users.find((user) => user.id === userId) }); // Actualiza el estado de la tarea
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
        <strong>Fecha de Inicio:</strong>{" "}
        {new Date(task.start_date).toLocaleDateString()}
      </p>
      <p className="mb-4">
        <strong>Fecha de Finalización:</strong>{" "}
        {new Date(task.end_date).toLocaleDateString()}
      </p>

      <div className="flex justify-end items-center mb-4">
        {isAdmin && (
          <>
            {task.user ? (
              <button
                onClick={handleOpenAssignModal}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
              >
                Reasignar
              </button>
            ) : (
              <button
                onClick={handleOpenAssignModal}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
              >
                Asignar
              </button>
            )}
          </>
        )}
      </div>
      <div className="text-right mb-4">
        {task.user ? (
          <p className="text-sm text-gray-600">
            Asignado a: {task.user.firstname} {task.user.lastnames}
          </p>
        ) : (
          <p className="text-sm text-gray-600">Usuario no asignado</p>
        )}
      </div>

      <ActivityList
        list={activities}
        taskName={task.name}
        onEdit={handleOpenEditModal}
        onCreate={handleOpenCreateModal}
      />

      <div>
        <FormComment onSubmit={handleSubmitComment} taskId={task.task_id} />
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
