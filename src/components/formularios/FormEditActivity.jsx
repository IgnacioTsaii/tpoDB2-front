import React, { useState } from "react";

export default function FormEditActivity({ activity, onClose, onSave, UserID }) {
  const [formData, setFormData] = useState({
    description: activity.description,
    time_worked: activity.time_worked,
    progress_percentage: activity.progress_percentage,
    user_id:UserID,
    timestamp: activity.timestamp,
    task_id: activity.task_id,
    }
  );

  


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="description"
        >
          Descripción
        </label>
        <input
          id="description"
          name="description"
          type="text"
          value={formData.description}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="time_worked"
        >
          Tiempo Trabajado
        </label>
        <input
          id="time_worked"
          name="time_worked"
          type="number"
          value={formData.time_worked}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="progress_percentage"
        >
          Porcentaje de Progreso
        </label>
        <input
          id="progress_percentage"
          name="progress_percentage"
          type="number"
          value={formData.progress_percentage}
          min="0"
          max="100"
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={onClose}
        >
          Cancelar
        </button>
        <button
          className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Guardar
        </button>
      </div>
    </form>
  );
}
