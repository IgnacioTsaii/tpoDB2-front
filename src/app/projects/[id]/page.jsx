import React from "react";
import { useState } from "react";
import Link from "next/link";
import Loader from '@/components/Loader';
import ProgressBar from '@/components/ProgressBar';



export default function ProjectsPage({ params }) {
  const { id: project_id } = params; // Renombramos id a project_id para ser consistente
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
      //call to server action
  },[project_id]);
  
  const handleDeleteTask = async (task_id) => {
    // Implementar la lógica para eliminar la tarea
  }



  if (!project) return <Loader />;

  if (!project) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{project.name}</h1>
      <p className="mb-4">{project.description}</p>
      <p className="mb-4">
        <strong>Start Date:</strong>{" "}
        {new Date(project.start_date).toLocaleDateString()}
      </p>
      <p className="mb-4">
        <strong>End Date:</strong>{" "}
        {new Date(project.end_date).toLocaleDateString()}
      </p>
      <div className="mb-4">
        <strong>Status:</strong>
        <ProgressBar progress={project.status} />
      </div>

      <h2 className="text-2xl font-bold mt-6">Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="mb-4 p-4 border rounded shadow-md">
            <p className="text-xl font-bold">{task.name}</p>
            <div className="flex mt-2">
              <Link href={`/projects/${project_id}/tasks/${task.id}`}>
                <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                  View More
                </a>
              </Link>
              <button
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={() =>
                  router.push(`/projects/${project_id}/tasks/${task.id}/edit`)
                }
              >
                Edit
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleDeleteTask(task.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
