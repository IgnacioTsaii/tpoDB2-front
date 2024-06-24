"use server";
import { cookies } from "next/headers";

const putProject = async (formData:any) => {
    const cookieStore = cookies();
    const token = cookieStore.get("access_token")?.value || "";
    console.log("FormData:", formData);
    
    try {
        const response = await fetch(`http://localhost:8081/projects/update/${formData.projectId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        });
        
        console.log("Response:", response);
        let data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }else{
            data.ok=true;
            console.log("Data:", data);
        }
        // agregar un .ok a data para verificar si la respuesta es correcta
        
        return data;
    } catch (error) {
        console.error("Error al enviar la solicitud:", error);
        throw error;
    }
};

export default putProject;