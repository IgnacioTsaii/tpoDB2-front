import React, { useState } from "react";
import { Task } from "@luca/interface/task";
import { Activity } from "@luca/interface/activities";

interface FormTaskProps {
  onSubmit: (task: Task) => void;
}

const initialFormData: Task = {
  id: Date.now(), // Placeholder, debe ser generado adecuadamente en la aplicación real
  name: "",
  description: "",
  start_date: new Date(),
  end_date: new Date(),
  status: "",
  activities: [],
  completed: false,
};

const FormTask: React.FC<FormTaskProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<Task>(initialFormData);
  const [activityInput, setActivityInput] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "start_date" || name === "end_date") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: new Date(value),
      }));
    } else if (name === "completed") {
      const target = e.target as HTMLInputElement;
      setFormData((prevData) => ({
        ...prevData,
        [name]: target.checked,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleAddActivity = () => {
    if (activityInput.trim() !== "") {
      const newActivity: Activity = {
        id: formData.activities.length + 1, // Asumiendo que el ID es simplemente el siguiente número en la secuencia
        description: activityInput.trim(),
        completed: false,
      };
      setFormData((prevData) => ({
        ...prevData,
        activities: [...prevData.activities, newActivity],
      }));
      setActivityInput("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    // Restablecer el formulario a su estado inicial si es necesario
    setFormData(initialFormData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
          Nombre
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="start_date" className="block text-gray-700 text-sm font-bold mb-2">
          Fecha de Inicio
        </label>
        <input
          type="date"
          id="start_date"
          name="start_date"
          value={formData.start_date.toISOString().split("T")[0]}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="end_date" className="block text-gray-700 text-sm font-bold mb-2">
          Fecha de Fin
        </label>
        <input
          type="date"
          id="end_date"
          name="end_date"
          value={formData.end_date.toISOString().split("T")[0]}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">
          Estado
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        >
          <option value="">Seleccionar estado</option>
          <option value="En progreso">En progreso</option>
          <option value="Completada">Completada</option>
          <option value="Planificada">Planificada</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="completed" className="flex items-center">
          <input
            type="checkbox"
            id="completed"
            name="completed"
            checked={formData.completed}
            onChange={handleChange}
            className="mr-2 leading-tight"
          />
          <span className="text-sm">Completada</span>
        </label>
      </div>
      {/* Actividades */}
      <div className="mb-4">
        <label htmlFor="activityInput" className="block text-gray-700 text-sm font-bold mb-2">
          Actividad
        </label>
        <div className="flex">
          <input
            type="text"
            id="activityInput"
            value={activityInput}
            onChange={(e) => setActivityInput(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
          />
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleAddActivity}
          >
            Agregar
          </button>
        </div>
        <ul className="mt-2">
          {formData.activities.map((activity) => (
            <li key={activity.id} className="flex items-center mt-2">
              <span className="mr-2">{activity.description}</span>
              <button
                type="button"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                onClick={() => {
                  const updatedActivities = formData.activities.filter((act) => act.id !== activity.id);
                  setFormData((prevData) => ({
                    ...prevData,
                    activities: updatedActivities,
                  }));
                }}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-end">
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Agregar Tarea
        </button>
      </div>
    </form>
  );
};

export default FormTask;
