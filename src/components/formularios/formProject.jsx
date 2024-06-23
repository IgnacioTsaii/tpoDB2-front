import React, { useState } from "react";
import postProject from "@/actions/projects/postProject";
import {useRouter} from "next/navigation";

export default function FormProject() {
  const [project, setProject] = useState({
    id: 0, // Considera cómo manejarás el ID
    name: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    status: "",
    weeklyHours: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prevState) => ({
      ...prevState,
      [name]:
        name === "startDate" || name === "endDate"
          ? new Date(value)
          : name === "status" || name === "weeklyHours"
          ? parseInt(value)
          : value,
    }));
  };

  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postProject(project);
      if (response.ok) {
        alert("Proyecto creado exitosamente");
        // Redirigir a la página de proyectos
        router.push("/gestionapp/projects");
      } else {
        alert(`Error: ${response.message}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
    
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
          htmlFor="startDate"
          className="text-sm font-medium text-gray-700"
        >
          Fecha de Inicio
        </label>
        <input
          type="date"
          name="startDate"
          value={project.startDate.toISOString().split("T")[0]}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-150 ease-in-out sm:text-sm"
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label
          htmlFor="endDate"
          className="text-sm font-medium text-gray-700"
        >
          Fecha de Fin
        </label>
        <input
          type="date"
          name="endDate"
          value={project.endDate.toISOString().split("T")[0]}
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
