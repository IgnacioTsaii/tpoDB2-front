import React, { useState, useEffect } from "react";
import Link from "next/link";
import DeleteProject from "@/components/modals/proyects/DeleteProject";
import AssignUserModal from "@/components/modals/proyects/AssignUserModal";

export default function ProjectList({
  projects,
  isAdmin,
  handleEdit,
  handleDelete,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [users, setUsers] = useState([]);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  useEffect(() => {
    setUsers([
      {
        user_id: 1,
        username: "admin_user",
        role: "Admin",
        name: "Admin",
        last_name: "User",
        email: "admin@example.com",
        weeklyHours: 40,
        skillLevel: "FULLSTACK_SENIOR",
      },
      {
        user_id: 2,
        username: "developer1",
        role: "Employee",
        name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
        weeklyHours: 30,
        skillLevel: "BACKEND_MID",
      },
      {
        user_id: 3,
        username: "devops_specialist",
        role: "Employee",
        name: "Jane",
        last_name: "Smith",
        email: "jane.smith@example.com",
        weeklyHours: 35,
        skillLevel: "DEVOPS_SENIOR",
      },
    ]);
  }, []);

  const openModal = (projectId) => {
    setProjectToDelete(projectId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setProjectToDelete(null);
  };

  const confirmDelete = () => {
    if (projectToDelete) {
      handleDelete(projectToDelete);
      closeModal();
    }
  };
  const handleOpenUserModal = () => {
    setIsUserModalOpen(true);
  };

  const handleCloseUserModal = () => {
    setIsUserModalOpen(false);
  };

  const handleAssignUser = (userId) => {
    // Implementar lógica para asignar usuario a la tarea
    console.log("Asignar usuario ID:", userId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Proyectos</h1>
        {isAdmin && (
          <Link
            href="/gestionapp/projects/create"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-1"
          >
            Agregar Proyecto
          </Link>
        )}
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
            {projects.length > 0 ? (
              projects.map((project) => (
                <tr key={project.projectId} className="border-b">
                  <td className="py-2 px-4 text-center">{project.name}</td>
                  <td className="py-2 px-4 text-center">
                    {project.description}
                  </td>
                  <td className="py-2 px-4 text-center">{project.status}</td>
                  <td className="py-2 px-4 text-center">
                    {isAdmin ? (
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleEdit(project)}
                          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
                        >
                          Editar
                        </button>
                        <Link
                          href={`/gestionapp/projects/${project.projectId}`}
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                        >
                          Ver Más
                        </Link>
                        <button
                          onClick={() => openModal(project.projectId)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                        >
                          Eliminar
                        </button>
                        <button
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                          onClick={handleOpenUserModal}
                        >
                          Agregar Usuario
                        </button>
                      </div>
                    ) : (
                      <Link
                        href={`/gestionapp/projects/${project.projectId}`}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                      >
                        Ver Más
                      </Link>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-4 text-center text-gray-500">
                  No hay proyectos disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <DeleteProject
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
        projectName={projectToDelete ? projectToDelete.name : ""}
      />
      <AssignUserModal
        isOpen={isUserModalOpen}
        onClose={handleCloseUserModal}
        onAssign={handleAssignUser}
        users={users} // Pasar la lista de usuarios al modal
      />
    </div>
  );
}
