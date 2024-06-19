"use client";
import React, { useState, MouseEvent } from "react";
import { projecto } from "@luca/interface/projectos";
import FormProject from "@luca/components/formularios/formProject";
import { Activity } from "@luca/interface/activities";
import { Task } from "@luca/interface/task";
import { BiCheckSquare } from "react-icons/bi";

// Datos de proyectos
const projects: projecto[] = [
  {
    id: 1,
    name: "Sistema de Gestión de Recursos",
    description:
      "Desarrollo de un sistema integral para la gestión de recursos humanos, financieros y materiales.",
    start_date: new Date("2023-01-01"),
    end_date: new Date("2023-12-31"),
    status: "En desarrollo",
    tasks: [
      {
        id: 1,
        title: "Actividad de Recreación",
        activities: [
          {
            description: "Caminata por el parque local",
            completed: false,
            id: 0
          },
        ],
        completed: false,
      },
    ],
  },
  {
    id: 2,
    name: "Plataforma Educativa Online",
    description:
      "Desarrollo de una plataforma educativa interactiva para cursos en línea.",
    start_date: new Date("2023-02-15"),
    end_date: new Date("2024-02-14"),
    status: "Planificado",
    tasks: [
      {
        id: 2,
        title: "Educación Continua",
        activities: [
          {
            description: "Curso intensivo de programación",
            completed: false,
            id: 0
          },
          {
            description: "Aprender los fundamentos de Python",
            completed: false,
            id: 1
          },
          {
            description: "Introducción a la programación orientada a objetos",
            completed: false,
            id: 2
          },
          {
            description: "Desarrollo de una aplicación web con Django",
            completed: false,
            id: 3
          },
          {
            description: "Implementación de bases de datos SQL",
            completed: false,
            id: 4
          },
        ],
        completed: false,
      },
    ],
  },
  {
    id: 3,
    name: "Aplicación Móvil de Salud",
    description:
      "Desarrollo de funcionalidades, pruebas de usuario. Incluir recordatorios de medicación.",
    start_date: new Date("2023-04-01"),
    end_date: new Date("2024-05-20"),
    status: "Finalizado",
    tasks: [
      {
        id: 3,
        title: "Exploración Artística",
        activities: [
          {
            description: "Taller de arte contemporáneo",
            completed: false,
            id: 0
          },
          {
            description: "Exploración de técnicas mixtas",
            completed: false,
            id: 1
          },
          {
            description: "Creación de tu propia obra de arte",
            completed: false,
            id: 2
          },
        ],
        completed: false,
      },
    ],
  },
];

// Componente para mostrar la lista de proyectos
const ProjectList: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<projecto | null>(null);
  const [showAddProjectForm, setShowAddProjectForm] = useState(false);

  const handleOpenAddProjectForm = () => {
    setShowAddProjectForm(true);
  };

  const handleCloseAddProjectForm = () => {
    setShowAddProjectForm(false);
  };

  const handleAddProject = () => {
    setShowAddProjectForm(true); // Asumiendo que esto es para mostrar el formulario de agregar proyecto
  };

  const handleEdit = (project: projecto) => {
    console.log("Edit project:", project);
  };

  const handleViewDetails = (project: projecto) => {
    setSelectedProject(project);
  };

  const handleMarkTaskDone = (task: Task, activityId: number) => {
    const updatedProjects = projects.map(proj => {
      if (proj.id === selectedProject?.id) {
        const updatedTasks = proj.tasks.map(t => {
          if (t.id === task.id) {
            const updatedActivities = t.activities.map(act => {
              if (act.id === activityId) {
                return { ...act, completed: !act.completed };
              }
              return act;
            });
            return { ...t, activities: updatedActivities };
          }
          return t;
        });
        return { ...proj, tasks: updatedTasks };
      }
      return proj;
    });

    setSelectedProject(updatedProjects.find(proj => proj.id === selectedProject?.id) || null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Proyectos</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddProject} // Cambiado para usar la función correcta
        >
          Agregar Proyecto
        </button>
      </div>

      {showAddProjectForm && (
        <div className="modal py-10">
          <FormProject />
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleCloseAddProjectForm}
          >
            Cerrar
          </button>
        </div>
      )}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/4 py-2 px-4">Nombre</th>
              <th className="w-1/4 py-2 px-4">Descripción</th>
              <th className="w-1/4 py-2 px-4">Estado</th>
              <th className="w-1/4 py-2 px-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-b">
                <td className="py-2 px-4 text-left">{project.name}</td>
                <td className="py-2 px-4">{project.description}</td>
                <td className="py-2 px-4 text-center">{project.status}</td>
                <td className="py-2 px-4">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                    onClick={() => handleEdit(project)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
                    onClick={() => handleViewDetails(project)}
                  >
                    Ver Más
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedProject && (
        <div className="mt-8 bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4">Detalles del Proyecto: </h2>
          <p><strong>Nombre:</strong> {selectedProject.name}</p>
          <p><strong>Descripción:</strong> {selectedProject.description}</p>
          <p><strong>Fecha de Inicio:</strong> {selectedProject.start_date.toLocaleDateString()}</p>
          <p><strong>Fecha de Finalización:</strong> {selectedProject.end_date.toLocaleDateString()}</p>
          <p><strong>Estado:</strong> {selectedProject.status}</p>
          <div className="mt-4">
            <h3 className="text-xl font-bold">Tareas: </h3>
            {selectedProject.tasks.map((task: Task) => (
              <div key={task.id} className="mt-4">
                <h4 className="text-base font-bold">{task.title}</h4>
                <ul className="list-disc list-inside">
                  {task.activities.map(activity => (
                    <li key={activity.id} className="flex items-center">
                      <span>{activity.description}</span>
                      {!activity.completed && (
                        <button
                          className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold rounded"
                          onClick={() => handleMarkTaskDone(task, activity.id)}
                        >
                          <BiCheckSquare />
                        </button>
                      )}
                      {activity.completed && (
                        <span className="ml-2 text-gray-500">Hecho</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setSelectedProject(null)}
          >
            Cerrar
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectList;

