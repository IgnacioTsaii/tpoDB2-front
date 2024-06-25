"use client";
import React, { useState, useEffect } from "react";
import ProjectList from "@/components/projectComponents/projectList";
import FormEditProject from "@/components/formularios/FormEditProject";
import decodingToken from "@/actions/utils/decodingToken";
import Loader from "@/components/Loader";
import getallProjects from "@/actions/projects/getallProjects";
import deleteProject from "@/actions/projects/deleteProject";
import putProject from "@/actions/projects/putProject";
import getProjectsByUserId from "@/actions/projects/getProjectsByUserId";

export default function ProjectsPage() {
    const [isAdmin, setIsAdmin] = useState(true);
    const [userId, setUserId] = useState("")
    const [selectedProject, setSelectedProject] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const decodedToken = await decodingToken();
            console.log(decodedToken);
            if (decodedToken.userType === "Admin") {
                setIsAdmin(true);
                const projects = await getallProjects();
                setProjects(projects);
            } else{
                setIsAdmin(false);
            }
            setUserId(decodedToken.userId);
        };
        fetchData();

        // si el usuario es admin, se le permite ver toda la lista de los proyectos
        // si el usuario es un usuario normal, se le permite ver solo los proyectos en los que está asignado
        const response2 = async () => {
            if (isAdmin) {
                const projects = await getallProjects();
                setProjects(projects);
            }
            if (!isAdmin) {
                const projects = await getProjectsByUserId(userId);
                setProjects(projects);
            }
        };

        response2();

    }, [isAdmin]);

    const handleEditClick = (project) => {
        setSelectedProject(project);
        setShowEditModal(true);
    };

    const handleDelete = async (project_id) => {
        console.log("Proyecto a eliminar:", project_id);
        // Aquí puedes enviar el ID del proyecto a eliminar a tu servidor o eliminarlo del estado local, según sea necesario
        try {
            const response = await deleteProject(project_id);
            console.log(response)
            console.log(response.ok, response.message);
            if (response.ok) {
                alert("Projects deleted successfully");
                window.location.reload();
            } else {
                alert(`Deletion failed: ${response.message}`);
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    const handleModalClose = () => {
        setShowEditModal(false);
    };

    const handleUpdateProject = async (updatedProject) => {
        // Aquí puedes enviar los datos actualizados a tu servidor o actualizar el estado local, según sea necesario
        console.log("Datos actualizados:", updatedProject);
        try {
            const response = await putProject(updatedProject);
            console.log(response);
            if (response.ok) {
                alert("Project updated successfully");
                window.location.reload();
            } else {
                alert(`Update failed: ${response.message}`);
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
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
