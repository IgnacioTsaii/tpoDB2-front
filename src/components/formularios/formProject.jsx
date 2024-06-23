import React, { useState } from "react";
import postProject from "@/actions/projects/postProject";
import {useRouter} from "next/navigation";

export default function FormProject() {
  const [project, setProject] = useState({
    id: 0, // Considera cómo manejarás el ID
    name: "",
    description: "",
    start_date: new Date(),
    end_date: new Date(),
    status: "",
    weeklyHours: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prevState) => ({
      ...prevState,
      [name]:
        name === "start_date" || name === "end_date"
          ? new Date(value)
          : name === "status" || name === "weeklyHours"
          ? parseInt(value)
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postProject(project)
      .then((data) => {
        console.log("Data:", data);
        if (data.ok) {
          alert("Proyecto guardado correctamente");
          router.push("/gestionapp/projects");
          
        } else {
          alert("Error al guardar el proyecto");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error al guardar el proyecto");
      });
    
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-lg mx-auto bg-white p-8 border border-gray-200 rounded-xl shadow-md"
    >
      <div className="flex flex-col space-y-1">
        <label
          htmlFor="name"
          className="text-sm font-medium text-gray-700"
        >
          Nombre del Proyecto
        </label>
        <input
          type="text"
          name="name"
          value={project.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-150 ease-in-out sm:text-sm"
          placeholder="Ingrese el nombre del proyecto"
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label
          htmlFor="description"
          className="text-sm font-medium text-gray-700"
        >
          Descripción
        </label>
        <textarea
          name="description"
          value={project.description}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-150 ease-in-out sm:text-sm"
          placeholder="Ingrese una descripción del proyecto"
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label
          htmlFor="start_date"
          className="text-sm font-medium text-gray-700"
        >
          Fecha de Inicio
        </label>
        <input
          type="date"
          name="start_date"
          value={project.start_date.toISOString().split("T")[0]}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-150 ease-in-out sm:text-sm"
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label
          htmlFor="end_date"
          className="text-sm font-medium text-gray-700"
        >
          Fecha de Fin
        </label>
        <input
          type="date"
          name="end_date"
          value={project.end_date.toISOString().split("T")[0]}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-150 ease-in-out sm:text-sm"
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label
          htmlFor="status"
          className="text-sm font-medium text-gray-700"
        >
          Estado
        </label>
        <input
          type="number"
          name="status"
          max={100}
          min={0}
          value={project.status}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-150 ease-in-out sm:text-sm"
          placeholder="Ingrese el estado (0-100)"
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label
          htmlFor="weeklyHours"
          className="text-sm font-medium text-gray-700"
        >
          Horas Semanales
        </label>
        <input
          type="number"
          name="weeklyHours"
          min={0}
          value={project.weeklyHours}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-150 ease-in-out sm:text-sm"
          placeholder="Ingrese las horas semanales"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
      >
        Guardar Proyecto
      </button>
    </form>
  );
}
