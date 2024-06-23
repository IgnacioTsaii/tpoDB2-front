'use client'
import React, { useState, useEffect } from "react";
import ProjectList from "@/components/projectComponents/projectList";
import FormEditProject from "@/components/formularios/FormEditProject";
import decodingToken from "@/actions/utils/decodingToken";
import Loader from "@/components/Loader";
import getallProjects from "@/actions/projects/getallProjects";



export default function ProjectsPage() {
  const [isAdmin, setIsAdmin] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [projects, setProjects] = useState([]);
  

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

    // si el usuario es admin, se le permite ver toda la lista de los proyectos
    // si el usuario es un usuario normal, se le permite ver solo los proyectos en los que está asignado
    const response2 = async() => {
      if(isAdmin){
        const projects = await getallProjects();
        setProjects(projects);
      }
    }
    response2();



  }, [isAdmin]);

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

  if (!projects.length) return <Loader />;

  return (
    <div>
      <ProjectList
        projects={projects}
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