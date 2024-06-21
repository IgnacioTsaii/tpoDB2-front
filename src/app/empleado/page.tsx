"use client";
import { useState } from "react";
import RegisterForm from "@/components/formularios/formRegister";
import UserTable from "@/components/employee/UserTable";


const usersExample = [
    {
        id: "1",
        password: "123456",
        nombre: "John",
        apellido: "Doe",
        skillLevel: "backend",
        weeklyHours: 40,
        email: "jhondoe@hotmail.com"
    },
    {
       id: "2",
        password
        : "123456",
        nombre: "Jane",
        apellido: "Doe",    
        skillLevel: "frontend",
        weeklyHours: 30,
        email: "dfasdfasdfa@gmail.com"
    }

];


export default function Employee() {

    return (
        <div className="container mx-auto px-4 max-w-4xl py-8">
            {/* Componente condicional basado en showComponent */}
            <div className="mt-8">
                <div className="shadow-lg rounded-lg bg-white p-6 m-4 w-full">
                    <UserTable users={usersExample} skills={["backend","frontend"]}/>
                </div>
            </div>
        </div>
    );
}
