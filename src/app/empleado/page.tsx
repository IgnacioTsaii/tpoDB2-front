"use client";
import { useState } from "react";
import RegisterForm from "@/components/formularios/formRegister";
import UserTable from "@/components/employee/UserTable";

// username: string;
//     password: string;
//     nombre: string;
//     skillLevel: string;
//     weeklyHours: number;
//     email: string;

const usersExample = [
    {
        password: "123456",
        nombre: "John Doe",
        skillLevel: "backend",
        weeklyHours: 40,
        email: "jhondoe@hotmail.com"
    },
    {
       
        password
        : "123456",
        nombre: "Jane Doe",
        skillLevel: "frontend",
        weeklyHours: 30,
        email: "dfasdfasdfa@gmail.com"
    }

];


export default function Employee() {
    const [showComponent, setShowComponent] = useState("");

    return (
        <div className="container mx-auto px-4 max-w-4xl py-8">
            {/* Componente condicional basado en showComponent */}
            <div className="mt-8">
                {showComponent === "register" && (
                    <div className="shadow-lg rounded-lg bg-white p-6 m-4 w-full">
                        <RegisterForm />
                    </div>
                )}
                <div className="shadow-lg rounded-lg bg-white p-6 m-4 w-full">
                    <UserTable users={usersExample} skills={["backend","frontend"]}/>
                </div>
            </div>
        </div>
    );
}
