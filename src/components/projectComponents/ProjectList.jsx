"use client";
import React, { useState } from "react";
import FormProject from "@/components/formularios/formProject";
import Link from "next/link";


export default function ProjectList (params) {
    const [projects, setProjects] = useState([]);

    const handleDelete = (project) => {
        // Implementar la lógica para eliminar el proyecto
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Proyectos</h1>
                <Link
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-1"
                    href={`/projects/create`}
                >
                    Agregar Proyecto
                </Link>
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="w-1/4 py-2 px-4">Nombre</th>
                            <th className="w-1/4 py-2 px-4">Descripción</th>
                            <th className="w-1/4 py-2 px-4">Estado</th>
                            <th className="w-1/4 py-2 px-4">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project) => (
                            <tr key={project.id} className="border-b">
                                <td className="py-2 px-4 text-left">{project.name}</td>
                                <td className="py-2 px-4">{project.description}</td>
                                <td className="py-2 px-4 text-center">{project.status}</td>
                                <td className="py-2 px-4">
                                    <Link
                                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                                        href={`/projects/${project.id}/edit`}
                                    >
                                        Editar
                                    </Link>
                                    <Link
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
                                        href={`/projects/${project.id}`}
                                    >
                                        Ver Más
                                    </Link>
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                        onClick={() => handleDelete(project)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

