import React, { useState, useEffect } from "react";
import getskillLevels from "@/actions/utils/getSkillLevels"; // Asegúrate de actualizar la ruta

export default function FormCreateTask({ onSubmit, project_id, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    skill_level: "",
    startDate: "",
    endDate: "",
    status: "",
    project: project_id,
  });

  const [skillLevels, setSkillLevels] = useState([]);

  useEffect(() => {
    async function fetchSkillLevels() {
      try {
        const levels = await getskillLevels();
        setSkillLevels(levels);
      } catch (error) {
        console.error("Error fetching skill levels:", error);
      }
    }
    fetchSkillLevels();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
    // Puedes añadir lógica adicional después de enviar el formulario si es necesario
    // Por ejemplo, limpiar el formulario o mostrar un mensaje de éxito.
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Crear Tarea</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Nombre de la tarea
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            name="name"
            type="text"
            placeholder="Nombre de la tarea"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="skillLevel"
          >
            Skill Level
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="skillLevel"
            name="skillLevel"
            onChange={handleChange}
          >
            <option value="">Select Skill Level</option>

            {skillLevels.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Descripción
          </label>
          <textarea
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            name="description"
            placeholder="Descripción"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            required
          />
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="startDate"
          >
            Fecha de inicio
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="startDate"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="endDate"
          >
            Fecha de finalización
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="endDate"
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="status"
          >
            Estado
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="status"
            name="status"
            type="number"
            min="0"
            max="100"
            placeholder="Estado"
            value={formData.status}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="flex items-center justify-end">
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={onClose}
        >
          Cancelar
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
          type="submit"
        >
          Crear
        </button>
      </div>
    </form>
  );
}
