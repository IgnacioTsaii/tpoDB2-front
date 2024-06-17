'use client';
// src/components/QuizComponent.tsx
import React, { useState } from 'react';
import { Project } from '@luca/interface/projects';

interface QuizComponentProps {
    project?: Project; // Opcional, para edición de proyectos existentes
    onSubmit: (projectData: Project) => void; // Función para manejar el envío del formulario
    onCancel?: () => void; // Opcional, función para manejar la cancelación del formulario
}

const QuizComponent: React.FC<QuizComponentProps> = ({ onSubmit, onCancel }) => {
  const [projectForm, setProjectForm] = useState<Project>({
    id: 0, // Este campo podría no ser necesario en el formulario si los IDs son generados automáticamente
    name: '',
    activities: '',
    comments: '',
    progress: '',
    employee: '',
    company: '',
    deadline: '',
    specialty: '',
    imageUrl: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProjectForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(projectForm); // Asumiendo que onSubmit maneja la lógica de envío
  };

  return (
    <><h1 className="text-lg font-bold text-center mb-2">Project Form</h1>
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      {/* Campo para 'name' */}
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
        <input type="text" name="name" id="name" value={projectForm.name} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Project Name" />
      </div>

      {/* Campo para 'activities' */}
      <div className="mb-4">
        <label htmlFor="activities" className="block text-gray-700 text-sm font-bold mb-2">Activities</label>
        <textarea name="activities" id="activities" value={projectForm.activities} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Activities" />
      </div>

      {/* Campo para 'comments' */}
      <div className="mb-4">
        <label htmlFor="comments" className="block text-gray-700 text-sm font-bold mb-2">Comments</label>
        <textarea name="comments" id="comments" value={projectForm.comments} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Comments" />
      </div>

      {/* Campo para 'progress' */}
      <div className="mb-4">
        <label htmlFor="progress" className="block text-gray-700 text-sm font-bold mb-2">Progress</label>
        <input type="text" name="progress" id="progress" value={projectForm.progress} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Progress" />
      </div>

      {/* Campo para 'employee' */}
      <div className="mb-4">
        <label htmlFor="employee" className="block text-gray-700 text-sm font-bold mb-2">Employee</label>
        <input type="text" name="employee" id="employee" value={projectForm.employee} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Employee" />
      </div>

      {/* Campo para 'company' */}
      <div className="mb-4">
        <label htmlFor="company" className="block text-gray-700 text-sm font-bold mb-2">Company</label>
        <input type="text" name="company" id="company" value={projectForm.company} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Company" />
      </div>

      {/* Campo para 'deadline' */}
      <div className="mb-4">
        <label htmlFor="deadline" className="block text-gray-700 text-sm font-bold mb-2">Deadline</label>
        <input type="date" name="deadline" id="deadline" value={projectForm.deadline} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>

      {/* Campo para 'specialty' */}
      <div className="mb-4">
        <label htmlFor="specialty" className="block text-gray-700 text-sm font-bold mb-2">Specialty</label>
        <input type="text" name="specialty" id="specialty" value={projectForm.specialty} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Specialty" />
      </div>

      {/* Campo para 'imageUrl' */}
      <div className="mb-4">
        <label htmlFor="imageUrl" className="block text-gray-700 text-sm font-bold mb-2">Image URL</label>
        <input type="text" name="imageUrl" id="imageUrl" value={projectForm.imageUrl} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Image URL" />
      </div>

      {/* Botones de envío y cancelación */}
      <div className="flex items-center justify-between">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
        {onCancel && <button type="button" onClick={onCancel} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cancel</button>}
      </div>
    </form></>

  );
};

export default QuizComponent;