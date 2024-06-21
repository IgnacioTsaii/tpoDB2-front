"use client";
import UserTable from "@/components/employee/UserTable";
import { useState, useEffect} from "react";
import getAllEmployees from "@/actions/getAllEmployees";







export default function Employee() {
    // Variable de estado para almacenar los usuarios
    const [usersResponse, setUsersResponse] = useState([]);
    
    useEffect(() => {
        const usersResponse=async()=>{
            try {
                const response = await getAllEmployees();
                console.log("Users:", response);
                setUsersResponse(response);
            } catch (error) {
                console.error("Error:", error);
            }
        }
        usersResponse();
    }
    , []);
        
    
    return (
        <div className="container mx-auto px-4 max-w-4xl py-8">
            {/* Componente condicional basado en showComponent */}
            <div className="mt-8">
                <div className="shadow-lg rounded-lg bg-white p-6 m-4 w-full">
                    <UserTable users={usersResponse} skills={["backend","frontend"]}/>
                </div>
            </div>
        </div>
    );
}
