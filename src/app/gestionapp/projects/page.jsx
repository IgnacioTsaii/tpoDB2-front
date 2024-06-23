'use client'
import React, { useState, useEffect } from "react";
import ProjectList from "@/components/projectComponents/projectList";
import FormEditProject from "@/components/formularios/FormEditProject";
import decodingToken from "@/actions/utils/decodingToken";
import Loader from "@/components/Loader";


export default function ProjectsPage() {
  const [isAdmin, setIsAdmin] = useState(true);
  const [initialProjects, setInitialProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const decodedToken = await decodingToken();
      console.log(decodedToken);
      if (decodedToken.userType === "Admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    };
    fetchData();

    // Simular carga de proyectos desde una fuente de datos (API, localStorage, etc.)
    const fetchedProjects = [
      {
        id: 1,
        name: "Proyecto 1",
        description: "Descripción del proyecto 1",
        startDate: "2023-01-01",
        endDate: "2023-06-01",
        status: 75,
        weeklyHours: 40,
      },
      {
        id: 2,
        name: "Proyecto 2",
        description: "Descripción del proyecto 2",
        startDate: "2023-02-01",
        endDate: "2023-07-01",
        status: 50,
        weeklyHours: 30,
      },
      {
        id: 3,
        name: "Proyecto 3",
        description: "Descripción del proyecto 3",
        startDate: "2023-03-01",
        endDate: "2023-08-01",
        status: 25,
        weeklyHours: 20,
      },
      {
        id: 4,
        name: "Proyecto 4",
        description: "Descripción del proyecto 4",
        startDate: "2023-04-01",
        endDate: "2023-09-01",
        status: 90,
        weeklyHours: 25,
      },
      {
        id: 5,
        name: "Proyecto 5",
        description: "Descripción del proyecto 5",
        start_date: "2023-05-01",
        end_date: "2023-10-01",
        status: 60,
        weekly_hours: 35,
      },
    ];

    setInitialProjects(fetchedProjects);
  }, []);

  const handleEditClick = (project) => {
    setSelectedProject(project);
    setShowEditModal(true);
  };

  const handleDelete = (project_id) => {
    // 
  }

  const handleModalClose = () => {
    setShowEditModal(false);
  };

  const handleUpdateProject = (updatedProject) => {
    // Aquí puedes enviar los datos actualizados a tu servidor o actualizar el estado local, según sea necesario
    console.log("Datos actualizados:", updatedProject);

    // Ejemplo de actualización del estado local:
    const updatedProjects = initialProjects.map((p) =>
      p.id === updatedProject.id ? updatedProject : p
    );
    setInitialProjects(updatedProjects);

    setShowEditModal(false); // Cerrar modal después de la edición
  };

  if (!initialProjects.length) return <Loader />;

  return (
    <div>
      <ProjectList
        projects={initialProjects}
        handleEdit={handleEditClick}
        handleDelete={handleDelete}
        isAdmin={isAdmin}
      />

      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 max-w-md mx-auto rounded-lg shadow-md">
            <FormEditProject
              project={selectedProject}
              onSubmit={handleUpdateProject}
              handleModalClose={handleModalClose}
            />
            
          </div>
        </div>
      )}
    </div>
  );
}