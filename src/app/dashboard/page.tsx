"use client";
import Link from "next/link";
import Navbar from "@luca/components/navbar";
import Dashboard from "@luca/components/dashboard";
import QuizComponent from "@luca/components/quizComponents";
import { Quiz } from "@luca/interface/quiz";
import { Project } from "@luca/interface/projects";

export default function Home() {
  const handleFormSubmit = (projectData: Project): void => {
    throw new Error("Function not implemented.");
  };

  return (
    <div>
      <div className="scale-75">
        <QuizComponent onSubmit={handleFormSubmit} />
      </div>
      <div className="text-center align-center">
        <Dashboard />
      </div>
    </div>
  );
}
