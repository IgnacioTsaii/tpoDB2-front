"use client";
import React, { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import CircularProgressWithLabel from "@/components/progress/CircularProgressWithLabel";
import TaskList from "@/components/taskComponents/TaskList";
import FormCreateTask from "@/components/formularios/FormCreateTask";
import ModalCreateTask from "@/components/modals/task/ModalCreateTask";
import AssignUserModal from "@/components/modals/proyects/AssignUserModal";
import getProjectById from "@/actions/projects/getProjectById";
import getUsersByProjectId from "@/actions/users/getUsersByProjectId";
import decodingToken from "@/actions/utils/decodingToken";
import getTasksByProjectId from "@/actions/tasks/getTasksByProjectId";
import getUserAll from "@/actions/users/getUserAll";

// projecto completo

//tareas completas del projecto

// user del projecto

export default function ProjectsDetailsPage({ params }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUserOpen, setIsModalUserOpen] = useState(false);
  // const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const project_id = params.id; // Renombramos id a project_id para ser consistente

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [usersAll, setUsersAll] = useState([]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const decodedToken = await decodingToken();
        console.log(decodedToken);
        if (decodedToken.userType === "Admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
        const projectData = await getProjectById(project_id);
        setProject(projectData);
        // users por projecto
        const usersData = await getUsersByProjectId(project_id);
        setUsers(usersData);
        // tareas del projecto
        const tasksData = await getTasksByProjectId(project_id);
        setTasks(tasksData);
        // todos los usuarios
        const usersAllData = await getUserAll();
        setUsersAll(usersAllData);
      } catch (error) {
        console.error("Error:", error);
        // Implementar la lógica para manejar el error
        alert()
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [project_id]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenUserModal = () => {
    setIsModalUserOpen(true);
  };

  const handleCloseUserModal = () => {
    setIsModalUserOpen(false);
  };

  const handleAssignUser = async (userId) => {
    // Implementar lógica para asignar usuario a la tarea
    console.log("Asignar usuario ID:", userId);
  };
  const handleCreateTask = async (formData) => {
    // Lógica para enviar los datos del formulario para crear una nueva tarea
    console.log(formData);
    setIsModalOpen(false); // Cerrar el modal después de enviar el formulario
  };
  const handleEditTask = async (formData) => {
    // Lógica para editar una tarea existente
    console.log(formData);
    setIsModalEditOpen(false); // Cerrar el modal después de enviar el formulario
  };

  const handleDeleteTask = async (task_id) => {
    // Lógica para eliminar una tarea
    console.log("Eliminar tarea ID:", task_id);
  };

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{project.name}</h1>
      </div>
      <div className="flex">
        <div className="w-3/4">
          <p className="mb-4">{project.description}</p>
          <p className="mb-4">
            <strong>Start Date:</strong> {project.startDate}
          </p>
          <p className="mb-4">
            <strong>End Date:</strong> {project.endDate}
          </p>
          <div className="mb-4 flex items-center">
            {" "}
            {/* Añadido flex y items-center para alinear verticalmente */}
            <strong>Status:</strong>
            <span className="ml-2">
              <CircularProgressWithLabel value={project.status} />
            </span>
          </div>
          <p className="mb-4">
            <strong>Weekly Hours:</strong> {project.weeklyHours}
          </p>
        </div>
        <div className="w-1/4 pl-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Usuarios</h2>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleOpenUserModal}
            >
              Agregar Usuario
            </button>
          </div>
          <ul>
            {users.map((user) => (
              <li key={user.id} className="mb-2">
                {user.firstname} {user.lastnames}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Tareas</h2>
        {isAdmin && (
          <div className="p-8">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleOpenModal}
            >
              Crear Tarea
            </button>
            <ModalCreateTask isOpen={isModalOpen} onClose={handleCloseModal}>
              <FormCreateTask
                onSubmit={handleCreateTask}
                onClose={handleCloseModal}
                project_id={project.id}
              />
            </ModalCreateTask>
          </div>
        )}
        <TaskList
          tasks={tasks}
          isAdmin={isAdmin}
          handleDelete={handleDeleteTask}
          handleEdit={handleEditTask}
        />
        <AssignUserModal
          isOpen={isModalUserOpen}
          onClose={handleCloseUserModal}
          onAssign={handleAssignUser}
          users={usersAll}
          projectId={project.id} // Pasar la lista de usuarios al modal
        />
      </div>
    </div>
  );
}
