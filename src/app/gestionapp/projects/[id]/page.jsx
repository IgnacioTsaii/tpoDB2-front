"use client";
import React, { useState } from "react";
import Loader from "@/components/Loader";
import CircularProgressWithLabel from "@/components/progress/CircularProgressWithLabel";
import TaskList from "@/components/taskComponents/TaskList";
import FormCreateTask from "@/components/formularios/FormCreateTask";
import ModalCreateTask from "@/components/modals/task/ModalCreateTask";
import AssignUserModal from "@/components/modals/proyects/AssignUserModal";

// projecto completo

//tareas completas del projecto

// user del projecto

export default function ProjectsDetailsPage({ params }) {
  const [isAdmin, setIsAdmin] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUserOpen, setIsModalUserOpen] = useState(false);
  // const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const project_id = params.id; // Renombramos id a project_id para ser consistente
  const [project, setProject] = useState({
    id: 1,
    name: "Proyecto 1",
    description: "Descripción del proyecto 1",
    status: 75,
    startDate: "2024-06-01",
    endDate: "2024-07-15",
    weeklyHours: 40,
  });
  const users = [
    {
      user_id: 1,
      username: "admin_user",
      role: "Admin",
      name: "Admin",
      last_name: "User",
      email: "admin@example.com",
      weeklyHours: 40,
      skillLevel: "FULLSTACK_SENIOR",
    },
    {
      user_id: 2,
      username: "developer1",
      role: "Employee",
      name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
      weeklyHours: 30,
      skillLevel: "BACKEND_MID",
    },
    {
      user_id: 3,
      username: "devops_specialist",
      role: "Employee",
      name: "Jane",
      last_name: "Smith",
      email: "jane.smith@example.com",
      weeklyHours: 35,
      skillLevel: "DEVOPS_SENIOR",
    },
  ];

  const tasks = [
    {
      task_id: 1,
      project_id: 1,
      user_id: 1,
      name: "Implementar API REST",
      description: "Desarrollar endpoints para la API REST del proyecto",
      skillLevel: "BACKEND_SENIOR",
      status: 80,
      startDate: "2024-06-01",
      endDate: "2024-07-01",
    },
    {
      task_id: 2,
      project_id: 1,
      user_id: 2,
      name: "Diseñar Interfaz de Usuario",
      description: "Crear maquetas y prototipos para la interfaz de usuario",
      skillLevel: "FRONTEND_MID",
      status: 60,
      startDate: "01-06-2024",
      endDate: "01-07-2024",
    },
    {
      task_id: 3,
      project_id: 2,
      user_id: 3,
      name: "Configurar Servidor de Producción",
      description: "Configurar y desplegar el servidor de producción",
      skillLevel: "DEVOPS_SENIOR",
      status: 90,
      startDate: "01-06-2024",
      endDate: "01-07-2024",
    },
  ];
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

  const handleAssignUser = (userId) => {
    // Implementar lógica para asignar usuario a la tarea
    console.log("Asignar usuario ID:", userId);
  };
  const handleCreateTask = (formData) => {
    // Lógica para enviar los datos del formulario para crear una nueva tarea
    console.log(formData);
    setIsModalOpen(false); // Cerrar el modal después de enviar el formulario
  };
  const handleEditTask = (formData) => {
    // Lógica para editar una tarea existente
    console.log(formData);
    setIsModalEditOpen(false); // Cerrar el modal después de enviar el formulario
  };

  const handleDeleteTask = async (task_id) => {
    // Implementar la lógica para eliminar la tarea
  };

  if (!project) return <Loader />;

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
                {user.name} {user.last_name}
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
          users={users}
          projectId={project.id} // Pasar la lista de usuarios al modal
        />
      </div>
    </div>
  );
}
