'use client'
import React, { useState } from "react";
import Loader from '@/components/Loader';
import CircularProgressWithLabel from '@/components/progress/CircularProgressWithLabel';
import TaskList from '@/components/taskComponents/TaskList';

// projecto completo 

//tareas completas del projecto 

// user del projecto 

export default function ProjectsDetailsPage({ params }) {
  const { id: project_id } = params; // Renombramos id a project_id para ser consistente
  const [project, setProject] = useState({
    id: 1,
    name: "Proyecto 1",
    description: "Descripción del proyecto 1",
    status: 75,
    start_date: "2024-06-01",
    end_date: "2024-07-15",
});
  const users = [
    {
      user_id: 1,
      username: "admin_user",
      role: "Admin",
      name: "Admin",
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

  // useEffect(() => {

  //     //call to server action
  // },[project_id]);
  
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
          <p className="mb-4">
            <strong>Status:</strong>{" "}
            <CircularProgressWithLabel value={project.status} />
          </p>
          <p className="mb-4">
            <strong>Weekly Hours:</strong> {project.weeklyHours}
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
        <TaskList tasks={tasks}/>
      </div>
    </div>
  );
}
