"use client";
import React, { useState, MouseEvent } from 'react';
import { projecto } from '@luca/interface/projectos';
import FormProject from "@luca/components/formularios/formProject";

// Datos de proyectos
const projects: projecto[] = [
  {
    id: 1,
    name: "Sistema de Gestión de Recursos",
    description: "Desarrollo de un sistema integral para la gestión de recursos humanos, financieros y materiales.",
    start_date: new Date("2023-01-01"),
    end_date: new Date("2023-12-31"),
    status: "En desarrollo"
  },
  {
    id: 2,
    name: 'Plataforma Educativa Online',
    description: 'Desarrollo de una plataforma educativa interactiva para cursos en línea.',
    start_date: new Date('2023-02-15'),
    end_date: new Date('2024-02-14'),
    status: 'Planificado'
  },
  {
    id: 3,
    name: 'Aplicación Móvil de Salud',
    description: 'Desarrollo de funcionalidades, pruebas de usuario. Incluir recordatorios de medicación.',
    start_date: new Date('2023-04-01'),
    end_date: new Date('2024-05-20'),
    status: 'Finalizado'
  }
];

// Componente para mostrar la lista de proyectos
const ProjectList: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<projecto | null>(null);
  const [showFormProject, setShowFormProject] = useState(false);

  function resetForms(event: MouseEvent<HTMLButtonElement>): void {
    setShowFormProject(false);
  }

  const handleEdit = (project: projecto) => {
    // Lógica para editar el proyecto
    console.log("Edit project:", project);
  };

  const handleViewDetails = (project: projecto) => {
    // Lógica para ver más detalles del proyecto
    setSelectedProject(project);
  };

  const handleMarkTasksDone = (project: projecto) => {
    // Lógica para marcar tareas como hechas
    console.log("Mark tasks done for project:", project);
  };
  
  const handleAddProject = () => {
    // Lógica para agregar un nuevo proyecto
    setShowFormProject(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Proyectos</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddProject}
        >
          Agregar Proyecto
        </button>
      </div>
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
                <td className="py-2 px-4">{project.name}</td>
                <td className="py-2 px-4">{project.description}</td>
                <td className="py-2 px-4">{project.status}</td>
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
                    onClick={() => handleMarkTasksDone(project)}
                  >
                    Tareas Hechas
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedProject && (
        <div className="mt-8 bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4">Detalles del Proyecto</h2>
          <p><strong>Nombre:</strong> {selectedProject.name}</p>
          <p><strong>Descripción:</strong> {selectedProject.description}</p>
          <p><strong>Fecha de Inicio:</strong> {selectedProject.start_date.toLocaleDateString()}</p>
          <p><strong>Fecha de Finalización:</strong> {selectedProject.end_date.toLocaleDateString()}</p>
          <p><strong>Estado:</strong> {selectedProject.status}</p>
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setSelectedProject(null)}
          >
            Cerrar
          </button>
        </div>
      )}

      {showFormProject && (
        <div className="mt-8 bg-white shadow-md rounded-lg p-4">
          <FormProject />
          <button
            className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={resetForms}
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
