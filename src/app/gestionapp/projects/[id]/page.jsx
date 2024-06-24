"use client";
import React, { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import CircularProgressWithLabel from "@/components/progress/CircularProgressWithLabel";
import TaskList from "@/components/taskComponents/TaskList";
import FormCreateTask from "@/components/formularios/FormCreateTask";
import ModalCreateTask from "@/components/modals/task/ModalCreateTask";
import AssignUserModal from "@/components/modals/proyects/AssignUserModal";

import getProjectById from "@/actions/projects/getProjectById";
import getUsersByProjectId from "@/actions/users/getUsersByProjectId";
import decodingToken from "@/actions/utils/decodingToken";
import getTasksByProjectId from "@/actions/tasks/getTasksByProjectId";
import getUserAll from "@/actions/users/getUserAll";
import PostTask from "@/actions/tasks/PostTask";
import SaveTask from "@/actions/tasks/SaveTask";
import deleteTask from "@/actions/tasks/deleteTask";
import postAssignProject from "@/actions/projects/postAssignProject";
import getPdfReport from "@/actions/reports/getPdfReport";
import ReportDownloadButton from "@/components/reports/ReportDownloadButton";
import ReportDownloadButtonExcel from "@/components/reports/ReportDownloadButtonExcel";

// projecto completo

//tareas completas del projecto

// user del projecto

export default function ProjectsDetailsPage({ params }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUserOpen, setIsModalUserOpen] = useState(false);
  // const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const project_id = params.id; // Renombramos id a project_id para ser consistente

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [usersAll, setUsersAll] = useState([]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const decodedToken = await decodingToken();
        console.log(decodedToken);
        if (decodedToken.userType === "Admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
        const projectData = await getProjectById(project_id);
        setProject(projectData);
        // users por projecto
        const usersData = await getUsersByProjectId(project_id);
        setUsers(usersData);
        // tareas del projecto
        const tasksData = await getTasksByProjectId(project_id);
        setTasks(tasksData);
        // todos los usuarios
        const usersAllData = await getUserAll();
        setUsersAll(usersAllData);
      } catch (error) {
        console.error("Error:", error);
        // Implementar la lógica para manejar el error
        alert();
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [project_id]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenUserModal = () => {
    setIsModalUserOpen(true);
  };

  const handleCloseUserModal = () => {
    setIsModalUserOpen(false);
  };

  const handleAssignUser = async (userId, taskId) => {
    console.log("Asignar usuario ID:", userId, taskId);
    try {
      const response = await postAssignProject(userId, taskId);
      alert("Usuario asignado correctamente: " + response.message);
      window.location.reload();
    } catch (error) {
      console.error("Error al asignar usuario:", error);
      alert("Error al asignar usuario: " + error.message);
    }
  };

  const handleCreateTask = async (formData) => {
    try {
      const response = await PostTask(formData);
      setIsModalOpen(false);

      if (response && response.task_id) {
        alert("¡Tarea creada con éxito!"); // Mensaje de éxito
        setTimeout(() => {
          window.location.reload();
        }, 1000); // Refrescar la página después de 1 segundo
      } else {
        throw new Error("Error al crear la tarea"); // Manejo de error si la respuesta no es válida
      }
    } catch (error) {
      console.error("Error al crear la tarea:", error);
      alert("Hubo un error al crear la tarea. Por favor, intenta nuevamente."); // Alerta de error
    }
  };

  const handleEditTask = async (formData) => {
    try {
      // console.log("Actualizar tarea:", formData);
      const response = await SaveTask(formData);
      // console.log("Respuesta de actualizar tarea:", response);

      // Comprueba si la respuesta es válida
      if (response) {
        alert("¡Tarea actualizada con éxito!");
        // Refrescar la página
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        throw new Error("Error al actualizar la tarea");
      }
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
      alert(
        "Hubo un error al actualizar la tarea. Por favor, intenta nuevamente."
      );
    }
  };

  const handleDeleteTask = async (task_id) => {
    // Lógica para eliminar una tarea
    console.log("Eliminar tarea ID:", task_id);
    try {
      // Llamar a la función para eliminar la tarea
      await deleteTask(task_id);

      // Mostrar alerta de éxito
      alert("Tarea eliminada correctamente.");

      // Refrescar la página
      window.location.reload();
    } catch (error) {
      // Capturar y manejar el error
      console.error("Error al eliminar tarea:", error);
      alert("Error al eliminar tarea. Por favor, intenta nuevamente.");
    }
  };

  // TODO
  const handleGenerateProjectReportPdf = async (projectId) => {
    try {
      console.log("Generando reporte del proyecto PDF...");

      // Llama a la función para obtener el PDF del servidor
      const response = await getPdfReport(projectId);

      // Manejo adicional después de descargar el PDF si es necesario
      console.log("Reporte del proyecto PDF generado correctamente.");
    } catch (error) {
      console.error("Error al generar el reporte del proyecto PDF:", error);
      alert(
        "Error al generar el reporte del proyecto PDF. Inténtalo de nuevo más tarde."
      );
    }
  };

  // TODO
  const handleGenerateProjectReportExcel = async () => {
    // Lógica para generar el reporte del proyecto excel
  };

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-3 gap-8">
      {/* Detalles del Proyecto */}
      <div className="col-span-2 bg-white shadow-md rounded-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{project.name}</h1>
        </div>
        <p className="mb-4 text-gray-700">{project.description}</p>
        <p className="mb-4 text-gray-700">
          <strong>Start Date:</strong> {project.startDate}
        </p>
        <p className="mb-4 text-gray-700">
          <strong>End Date:</strong> {project.endDate}
        </p>
        <div className="mb-4 flex items-center text-gray-700">
          <strong>Status:</strong>
          <span className="ml-2">
            <CircularProgressWithLabel value={project.status} />
          </span>
        </div>
        <p className="mb-4 text-gray-700">
          <strong>Weekly Hours:</strong> {project.weeklyHours}
        </p>
      </div>

      {/* Usuarios */}
      <div className="bg-white shadow-md rounded-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Usuarios</h2>
        <button
          className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded mb-2"
          onClick={handleOpenUserModal}
        >
          Agregar Usuario
        </button>
        <ul>
          {users.map((user) => (
            <li key={user.id} className="mb-2 text-gray-700">
              {user.firstname} {user.lastnames}
            </li>
          ))}
        </ul>
      </div>

      {/* Reportes */}
      {/* Reportes */}
      <div className="bg-white shadow-md rounded-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-700 text-center">
          Reportes
        </h2>
        <div className="flex items-center justify-between">
          <ReportDownloadButton projectId={project_id} />
          <div className="ml-4">
            <ReportDownloadButtonExcel projectId={project_id} />
          </div>
        </div>
      </div>

      {/* Tareas */}
      <div className="col-span-3 mt-8">
        <div className="text-2xl font-bold mb-4 text-gray-700 flex justify-between items-center">
          <span>Tareas</span>
          {isAdmin && (
            <button
              className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
              onClick={handleOpenModal}
            >
              Crear Tarea
            </button>
          )}
        </div>
        <div>
          <ModalCreateTask isOpen={isModalOpen} onClose={handleCloseModal}>
            <FormCreateTask
              onSubmit={handleCreateTask}
              onClose={handleCloseModal}
              project_id={project.projectId}
            />
          </ModalCreateTask>
        </div>
        <TaskList
          tasks={tasks}
          isAdmin={isAdmin}
          handleDelete={handleDeleteTask}
          handleEdit={handleEditTask}
        />
        <AssignUserModal
          isOpen={isModalUserOpen}
          onClose={handleCloseUserModal}
          onAssign={handleAssignUser}
          users={usersAll}
          projectId={project_id}
        />
      </div>
    </div>
  );
}
