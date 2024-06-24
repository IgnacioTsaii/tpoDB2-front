"use server";
import { cookies } from "next/headers";

const putAssignTask = async (userId:any,taskId:any) => {
    const cookieStore = cookies();
    const token = cookieStore.get("access_token")?.value || "";
    console.log(userId,taskId)
    try {
        const response = await fetch(`http://localhost:8081/task/assign/${taskId}/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        
        console.log(response);
        var data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        } else {
            data.ok = true;
            console.log("Data:", data);
        }
        
        return data;
    } catch (error) {
        console.error("Error al enviar la solicitud:", error);
        throw error;  // Throw the caught error
    }
};

export default putAssignTask;