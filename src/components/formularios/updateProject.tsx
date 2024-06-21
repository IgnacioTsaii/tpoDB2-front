import React, { useEffect, useState } from "react";
import { projecto } from "@/interface/projectos";

interface UpdateProjectProps {
  projectData: projecto;
  onUpdate: (data: Partial<projecto>) => void;
}

const UpdateProject: React.FC<UpdateProjectProps> = ({
  projectData,
  onUpdate,
}) => {
  const [formData, setFormData] = useState<Partial<projecto>>({
    name: projectData.name,
    description: projectData.description,
    status: projectData.status,
    end_date: projectData.end_date,
  });

  const [projects, setProjects] = useState<projecto[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      console.log("Cargar proyectos");
    };

    fetchProjects();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onUpdate(formData);
  };

  const handleDeleteProject = async () => {
    console.log("Proyecto borrado");
  };

  return (
    <>
      <div>
        {projects.map((projecto) => (
          <div
            key={projecto.id}
            className="mb-4 p-4 border rounded-lg shadow-lg"
          >
            <h3 className="text-lg font-bold">{projecto.name}</h3>
            <p className="text-sm">{projecto.description}</p>
            <p className="text-sm">Estado: {projecto.status}</p>
            <p className="text-sm">
              Fecha de Finalización: {projecto.end_date.toString()}
            </p>
          </div>
        ))}
      </div>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto my-10 p-5 border rounded-lg shadow-lg"
      >
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre del Proyecto
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Descripción
          </label>
          <textarea
            name="description"
            id="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          ></textarea>
        </div>
        <div className="mb-5">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Estado
          </label>
          <select
            name="status"
            id="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
            <option value="completado">Completado</option>
          </select>
        </div>
        <div className="mb-5">
          <label
            htmlFor="end_date"
            className="block text-sm font-medium text-gray-700"
          >
            Fecha de Finalización
          </label>
          <input
            type="date"
            name="end_date"
            id="end_date"
            value={formData.end_date?.toISOString().split("T")[0] || ""}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Actualizar Proyecto
        </button>
        <button
          type="button"
          onClick={handleDeleteProject}
          className="mt-4 w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Borrar Proyecto
        </button>
      </form>
    </>
  );
};

export default UpdateProject;
