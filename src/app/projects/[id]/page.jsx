'use client'
import React, { useState } from "react";
import Loader from '@/components/Loader';
import CircularProgressWithLabel from '@/components/progress/CircularProgressWithLabel';
import TaskList from '@/components/taskComponents/TaskList';

// projecto completo 

//tareas completas del projecto 

// user del projecto 

export default function ProjectsDetailsPage({ params }) {
  const [isAdmin, setIsAdmin] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const  project_id  = params.id; // Renombramos id a project_id para ser consistente
  const [project, setProject] = useState({
    id: 1,
    name: "Proyecto 1",
    description: "Descripción del proyecto 1",
    status: 75,
    start_date: "2024-06-01",
    end_date: "2024-07-15",
    weekly_hours: 40,
});
  const users = [
    {
      user_id: 1,
      username: "admin_user",
      role: "Admin",
      name: "Admin",
      last_name: "User",
      email: "admin@example.com",
      weekly_hours: 40,
      skill_level: "FULLSTACK_SENIOR",
    },
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
  ];
  
  const tasks = [
    {
      task_id: 1,
      project_id: 1,
      user_id: 1,
      name: "Implementar API REST",
      description: "Desarrollar endpoints para la API REST del proyecto",
      skill_level: "BACKEND_SENIOR",
      status: 80,
      start_date: "2024-07-01",
      end_date: "2024-07-15",
    },
    {
      task_id: 2,
      project_id: 1,
      user_id: 2,
      name: "Diseñar Interfaz de Usuario",
      description: "Crear maquetas y prototipos para la interfaz de usuario",
      skill_level: "FRONTEND_MID",
      status: 60,
      start_date: "2024-06-25",
      end_date: "2024-07-10",
    },
    {
      task_id: 3,
      project_id: 2,
      user_id: 3,
      name: "Configurar Servidor de Producción",
      description: "Configurar y desplegar el servidor de producción",
      skill_level: "DEVOPS_SENIOR",
      status: 90,
      start_date: "2024-07-05",
      end_date: "2024-07-20",
    },
  ];

  

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };


    const handleCreateTask = (formData) => {
        // Lógica para enviar los datos del formulario para crear una nueva tarea
        console.log(formData);
        setIsModalOpen(false); // Cerrar el modal después de enviar el formulario
    };

    const handleSaveTask = (formData) => {
        
    }

  const handleDeleteTask = async (task_id) => {
    // Implementar la lógica para eliminar la tarea
  }



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
            <strong>Start Date:</strong> {project.start_date}
          </p>
          <p className="mb-4">
            <strong>End Date:</strong> {project.end_date}
          </p>
          <div className="mb-4 flex items-center"> {/* Añadido flex y items-center para alinear verticalmente */}
            <strong>Status:</strong> 
            <span className="ml-2">
              <CircularProgressWithLabel value={project.status} />
            </span>
          </div>
          <p className="mb-4">
            <strong>Weekly Hours:</strong> {project.weekly_hours}
          </p>
        </div>
        <div className="w-1/4 pl-8">
          <h2 className="text-2xl font-bold mb-4">Usuarios</h2>
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
                <button
                    onClick={handleOpenModal}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Crear tarea
                </button>
            )}

            {/* Modal para crear tarea */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-4">Crear Nueva Tarea</h2>
                        <form onSubmit={handleCreateTask}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                    Nombre de la tarea
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    // Aquí conectar el value y el onChange con el estado adecuado
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                    Descripción
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Crear
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
      <TaskList tasks={tasks} isAdmin={isAdmin} handleCloseEditModal={handleCloseModal} handleOpenModal={handleOpenModal} handleEdit={handleSaveTask}/>
    </div>
    </div>
  );
}
