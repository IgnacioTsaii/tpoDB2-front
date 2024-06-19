"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@luca/components/navbar";
import Dashboard from "@luca/components/dashboard";
import RegisterForm from "@luca/components/formularios/formRegister";
import FormProject from "@luca/components/formularios/formProject";
import UpdateProjectForm from "@luca/components/formularios/updateProject";
import AdminPage from "../admin/page";

const Page = () => {
  const [showAdminPage, setShowAdminPage] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const resetForms = () => {
    setShowAdminPage(false);
    setShowRegisterForm(false);
  };

  return (
    <div className="container mx-auto px-4 max-w-4xl py-8">
      {!showAdminPage && !showRegisterForm && (
        <div className="flex flex-wrap justify-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="w-full md:w-1/2 lg:w-1/3 p-4">
            <div className="shadow-lg rounded-lg bg-white p-6 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold mb-4">Proyectos de la Compañía</h3>
                <p className="mb-4">Accede a la lista de proyectos de la compañía y gestiona sus detalles.</p>
              </div>
              <button
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded w-full"
                onClick={() => setShowAdminPage(true)}
              >
                Mostrar Proyectos
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 p-4">
            <div className="shadow-lg rounded-lg bg-white p-6 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold mb-4">Empleados de la Compañía</h3>
                <p className="mb-4">Consulta y gestiona la información de los empleados de la compañía.</p>
              </div>
              <button
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded w-full"
                onClick={() => setShowRegisterForm(true)}
              >
                Mostrar Empleados
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center justify-center my-4">
        {showAdminPage && (
          <div className="shadow-lg rounded-lg bg-white p-6 m-4 w-full">
            <AdminPage />
          </div>
        )}
        {showRegisterForm && (
          <div className="shadow-lg rounded-lg bg-white p-6 m-4 w-full">
            <RegisterForm />
          </div>
        )}
        {(showAdminPage || showRegisterForm) && (
          <button
            className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={resetForms}
          >
            Volver a la pagina principal 
          </button>
        )}
      </div>
    </div>
  );
};

export default Page;
