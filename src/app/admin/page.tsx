"use client";
import { useState, MouseEvent } from "react";
import Link from "next/link";
import FormProject from "@luca/components/formularios/formProject";
import UpdateProject from "@luca/components/formularios/updateProject";

const AdminPage = () => {
  const [showFormProject, setShowFormProject] = useState(false);
  const [showUpdateProject, setShowUpdateProject] = useState(false);
  // Corrección: Implementación de la función resetForms
  function resetForms(event: MouseEvent<HTMLButtonElement>): void {
    // Establece ambos estados a false para ocultar los formularios
    setShowFormProject(false);
    setShowUpdateProject(false);
  }

  return (
    <div className="container mx-auto px-4 max-w-4xl py-8">
      {!showFormProject && !showUpdateProject && (
        <div className="flex flex-wrap justify-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="w-full md:w-1/2 lg:w-1/3 p-4">
            <div className="shadow-lg rounded-lg bg-white p-6 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold mb-4">
                  Proyectos de la Compañía
                </h3>
                <p className="mb-4">
                  Accede a la lista de proyectos de la compañía y gestiona sus
                  detalles.
                </p>
              </div>
              <button
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded w-full"
                onClick={() => setShowFormProject(true)}
              >
                Crear nuevo proyectos
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 p-4">
            <div className="shadow-lg rounded-lg bg-white p-6 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold mb-4">Actualizar Proyecto</h3>
                <p className="mb-4">
                  Actualiza la información de los proyectos existentes en la
                  compañía.
                </p>
              </div>
              <button
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded w-full"
                onClick={() => setShowUpdateProject(true)}
              >
                Modificar Proyectos
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center justify-center my-4">
        {showFormProject && (
          <div className="shadow-lg rounded-lg bg-white p-6 m-4 w-full">
            <FormProject />
          </div>
        )}
        {showUpdateProject && (
          <div className="shadow-lg rounded-lg bg-white p-6 m-4 w-full">
            <UpdateProject />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
