'use client'
import Navbar from "@/components/navbar"
import ProjectList from "@/components/projectComponents/projectList"
import Footer from "@/components/Footer"


export default function page() {
  return (
    <div>
      {/* listado de projectos */}
      <ProjectList />
    </div>
  );
};
