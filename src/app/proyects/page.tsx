"use client";
import React, { useState, MouseEvent } from "react";
import { projecto } from "@luca/interface/projectos";
import FormProject from "@luca/components/formularios/formProject";
import FormTask from "@luca/components/formularios/formTask";
import { Task } from "@luca/interface/task";
import { BiCheckSquare } from "react-icons/bi";

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
        name: "Análisis de Requisitos",
        description: "Recolección y análisis de los requisitos del sistema.",
        start_date: new Date("2023-01-01"),
        end_date: new Date("2023-02-15"),
        status: "Completada",
        completed: true,
        activities: [
          {
            id: 1,
            description: "Entrevistas con stakeholders",
            completed: true,
          },
          {
            id: 2,
            description: "Análisis de documentación existente",
            completed: true,
          },
        ],
      },
      {
        id: 2,
        name: "Diseño del Sistema",
        description: "Diseño de la arquitectura del sistema.",
        start_date: new Date("2023-02-16"),
        end_date: new Date("2023-04-30"),
        status: "En progreso",
        completed: false,
        activities: [
          {
            id: 3,
            description: "Diseño de la base de datos",
            completed: false,
          },
          {
            id: 4,
            description: "Diseño de la interfaz de usuario",
            completed: false,
          },
        ],
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
        id: 3,
        name: "Desarrollo del Backend",
        description: "Implementación del servidor y API.",
        start_date: new Date("2023-03-01"),
        end_date: new Date("2023-08-31"),
        status: "En progreso",
        completed: false,
        activities: [
          {
            id: 5,
            description: "Configuración del servidor",
            completed: true,
          },
          {
            id: 6,
            description: "Desarrollo de la API REST",
            completed: false,
          },
        ],
      },
      {
        id: 4,
        name: "Desarrollo del Frontend",
        description: "Implementación de la interfaz de usuario.",
        start_date: new Date("2023-09-01"),
        end_date: new Date("2023-12-31"),
        status: "Planificado",
        completed: false,
        activities: [
          {
            id: 7,
            description: "Diseño de mockups",
            completed: false,
          },
          {
            id: 8,
            description: "Implementación de componentes",
            completed: false,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Aplicación Móvil de Salud",
    description:
      "Desarrollo de una aplicación móvil para el seguimiento de la salud y recordatorios de medicación.",
    start_date: new Date("2023-04-01"),
    end_date: new Date("2024-05-20"),
    status: "Finalizado",
    tasks: [
      {
        id: 5,
        name: "Desarrollo de Funcionalidades",
        description: "Implementación de las principales funcionalidades de la aplicación.",
        start_date: new Date("2023-04-01"),
        end_date: new Date("2023-09-30"),
        status: "Completada",
        completed: true,
        activities: [
          {
            id: 9,
            description: "Recordatorios de medicación",
            completed: true,
          },
          {
            id: 10,
            description: "Seguimiento de la actividad física",
            completed: true,
          },
        ],
      },
      {
        id: 6,
        name: "Pruebas de Usuario",
        description: "Realización de pruebas con usuarios finales.",
        start_date: new Date("2023-10-01"),
        end_date: new Date("2023-12-31"),
        status: "Completada",
        completed: true,
        activities: [
          {
            id: 11,
            description: "Reclutamiento de usuarios",
            completed: true,
          },
          {
            id: 12,
            description: "Realización de pruebas y recolección de feedback",
            completed: true,
          },
        ],
      },
    ],
  },
];

const ProjectList: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<projecto | null>(null);
  const [showAddProjectForm, setShowAddProjectForm] = useState(false);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [showTasks, setShowTasks] = useState(false); // Estado para controlar la visibilidad de las tareas

  const handleOpenAddProjectForm = () => {
    setShowAddProjectForm(true);
  };

  const handleCloseAddProjectForm = () => {
    setShowAddProjectForm(false);
  };

  const handleAddProject = () => {
    setShowAddProjectForm(true); // Mostrar formulario para agregar proyecto
  };

  const handleEdit = (project: projecto) => {
    console.log("Edit project:", project);
  };

  const handleViewDetails = (project: projecto) => {
    setSelectedProject(project);
    setShowTasks(false); // Al ver detalles, ocultar las tareas
  };

  const handleDelete = (project: projecto) => {
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

  const handleAddTask = () => {
    setShowAddTaskForm(true);
  };

  const handleCloseAddTaskForm = () => {
    setShowAddTaskForm(false);
  };

  const handleToggleTasks = () => {
    setShowTasks(!showTasks); // Alternar visibilidad de las tareas
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Proyectos</h1>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-1"
            onClick={handleAddProject}
          >
            Agregar Proyecto
          </button>
        </div>
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
      {showAddTaskForm && (
        <div className="modal py-10">
          <FormTask onSubmit={function (formData: Task): void {
            throw new Error("Function not implemented.");
          } } />
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleCloseAddTaskForm}
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
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleDelete(project)}
                  >
                    Eliminar
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
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={handleAddTask}
            >
              Agregar Tarea
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleToggleTasks}
            >
              {showTasks ? "Ocultar Tareas" : "Ver Tareas"}
            </button>
            {showTasks && (
              <div>
                {selectedProject.tasks.map((task: Task) => (
                  <div key={task.id} className="mt-4">
                    <h3 className="text-lg font-bold">{task.name}</h3>
                    <p>{task.description}</p>
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
            )}
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
