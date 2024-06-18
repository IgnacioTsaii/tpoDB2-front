import React, { useState } from 'react';
import { projecto } from '@luca/interface/projectos';

const FormProject: React.FC = () => {
  const [project, setProject] = useState<projecto>({
    id: 0, // Considera cómo manejarás el ID
    name: '',
    description: '',
    start_date: new Date(),
    end_date: new Date(),
    status: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProject(prevState => ({
      ...prevState,
      [name]: name === 'start_date' || name === 'end_date' ? new Date(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(project);
    // Aquí manejarías el envío del formulario, por ejemplo, actualizando un estado global o enviando los datos a un servidor
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre del Proyecto</label>
        <input type="text" name="name" value={project.name} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
        <textarea name="description" value={project.description} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      {/* Repite para los demás campos, ajustando el tipo de input según corresponda */}
      <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Enviar
      </button>
    </form>
  );
};

export default FormProject;