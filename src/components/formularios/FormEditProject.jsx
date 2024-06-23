import React, { useState, useEffect } from "react";

export default function FormEditProject({ project, onSubmit,handleModalClose }) {
  const [formData, setFormData] = useState({
    projectId: project.projectId,
    name: project.name,
    description: project.description,
    startDate: project.startDate,
    endDate: project.endDate,
    status: project.status, // Asegurando que status sea un string
    weeklyHours: project.weeklyHours, // Asegurando que weeklyHours sea un string
  });

  useEffect(() => {
    setFormData({
      projectId: project.projectId,
      name: project.name,
      description: project.description,
      startDate: project.startDate,
      endDate: project.endDate,
      status: project.status,
      weeklyHours: project.weeklyHours,
    });
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]:
        name === "start_date" || name === "end_date" ? value : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Llamar a la función onSubmit pasando los datos actualizados
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-lg mx-auto bg-white p-8 border border-gray-200 rounded-xl shadow-md"
      style={{
        maxWidth: "calc(100vw - 20px)",
        maxHeight: "80vh",
        overflowY: "auto",
      }}
    >
      <div className="flex flex-col space-y-4">
        <label htmlFor="name" className="text-sm font-medium text-gray-700">
          Nombre del Proyecto
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-150 ease-in-out sm:text-sm"
          placeholder="Ingrese el nombre del proyecto"
        />
      </div>
      <div className="flex flex-col space-y-4">
        <label
          htmlFor="description"
          className="text-sm font-medium text-gray-700"
        >
          Descripción
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-150 ease-in-out sm:text-sm"
          placeholder="Ingrese una descripción del proyecto"
        />
      </div>
      <div className="grid grid-cols-2 gap-x-4">
        <div className="flex flex-col space-y-4">
          <label
            htmlFor="start_date"
            className="text-sm font-medium text-gray-700"
          >
            Fecha de Inicio
          </label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-150 ease-in-out sm:text-sm"
          />
        </div>
        <div className="flex flex-col space-y-4">
          <label
            htmlFor="end_date"
            className="text-sm font-medium text-gray-700"
          >
            Fecha de Fin
          </label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-150 ease-in-out sm:text-sm"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-4">
        <div className="flex flex-col space-y-4">
          <label htmlFor="status" className="text-sm font-medium text-gray-700">
            Estado (%)
          </label>
          <input
            type="number"
            name="status"
            max={100}
            min={0}
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-150 ease-in-out sm:text-sm"
            placeholder="Ingrese el estado (0-100)"
          />
        </div>
        <div className="flex flex-col space-y-4">
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
            value={formData.weeklyHours}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-150 ease-in-out sm:text-sm"
            placeholder="Ingrese las horas semanales"
          />
        </div>
      </div>
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-150 ease-in-out"
          onClick={handleModalClose}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
        >
          Guardar Cambios
        </button>
      </div>
    </form>
  );
}
