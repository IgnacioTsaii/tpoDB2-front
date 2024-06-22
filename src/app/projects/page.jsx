'use client'
import React, {useState} from "react";
import ProjectList from "@/components/projectComponents/projectList"


export default function ProjectsPage() {
  const [isAdmin, setIsAdmin] = useState(true);
  const initialProjects = [
    {
      id: 1,
      name: "Proyecto 1",
      description: "Descripción del proyecto 1",
      startDate: "2023-01-01",
      endDate: "2023-06-01",
      status: 75,
      weeklyHours: 40
    },
    {
      id: 2,
      name: "Proyecto 2",
      description: "Descripción del proyecto 2",
      startDate: "2023-02-01",
      endDate: "2023-07-01",
      status: 50,
      weeklyHours: 30
    },
    {
      id: 3,
      name: "Proyecto 3",
      description: "Descripción del proyecto 3",
      startDate: "2023-03-01",
      endDate: "2023-08-01",
      status: 25,
      weeklyHours: 20
    },
    {
      id: 4,
      name: "Proyecto 4",
      description: "Descripción del proyecto 4",
      startDate: "2023-04-01",
      endDate: "2023-09-01",
      status: 90,
      weeklyHours: 25
    },
    {
      id: 5,
      name: "Proyecto 5",
      description: "Descripción del proyecto 5",
      startDate: "2023-05-01",
      endDate: "2023-10-01",
      status: 60,
      weeklyHours: 35
    }
  ];
  

const handlerDelete = async (e) => {
  console.log('delete')
}

  return (
    <div>
      {/* listado de projectos */}
      <ProjectList projects={initialProjects} handleDelete={handlerDelete} isAdmin={isAdmin}/>
    </div>
  );
};
