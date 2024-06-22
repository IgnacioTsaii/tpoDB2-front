import React from "react";
import Link from "next/link";

export default function EmployeeProjectDetails({ project }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <h1 className="text-2xl font-bold mb-6">{project.name}</h1>
        <p className="mb-4">{project.description}</p>
        <p className="mb-4">
          <strong>Estado:</strong> {project.status}
        </p>
        <h2 className="text-xl font-bold mt-6">Tareas</h2>
        <ul>
          {project.tasks.map((task) => (
            <li key={task.id} className="mb-4 p-4 border rounded shadow-md">
              <p className="text-xl font-bold">{task.name}</p>
              <p className="mb-2">{task.description}</p>
              <p>
                <strong>Estado:</strong> {task.status}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
