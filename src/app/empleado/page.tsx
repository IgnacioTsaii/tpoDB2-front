"use client";
import { useState } from "react";
import RegisterForm from "@luca/components/formularios/formRegister";
import UserTable from "@luca/components/employee/UserTable";

export default function Employee() {
  const [showComponent, setShowComponent] = useState("");

  return (
    <div className="container mx-auto px-4 max-w-4xl py-8">
      <div className="flex flex-wrap justify-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="w-full md:w-1/2 lg:w-1/3 p-4">
          <div className="shadow-lg rounded-lg bg-white p-6 h-full flex flex-col justify-between">
            <h3 className="text-lg font-bold mb-4">Registro de Empleados</h3>
            <p className="mb-4">Registra nuevos usuarios o empleados.</p>
            <button
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded w-full"
              onClick={() => setShowComponent("register")}
            >
              Formulario de Registro
            </button>
          </div>
        </div>

        <div className="w-full md:w-1/2 lg:w-1/3 p-4">
          <div className="shadow-lg rounded-lg bg-white p-6 h-full flex flex-col justify-between">
            <h3 className="text-lg font-bold mb-4">Lista de Empleados</h3>
            <p className="mb-4">Visualiza los empleados registrados.</p>
            <button
              className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded w-full"
              onClick={() => setShowComponent("list")}
            >
              Listado de Empleados
            </button>
          </div>
        </div>
      </div>
      {/* Componente condicional basado en showComponent */}
      <div className="mt-8">
        {showComponent === "register" && (
          <div className="shadow-lg rounded-lg bg-white p-6 m-4 w-full">
            <RegisterForm />
          </div>
        )}
        {showComponent === "list" && (
          <div className="shadow-lg rounded-lg bg-white p-6 m-4 w-full">
            <UserTable users={[]} />
          </div>
        )}
      </div>
    </div>
  );
}
