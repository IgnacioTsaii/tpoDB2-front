'use server';
import { cookies } from "next/headers";

export default async function deleteReverseActivities(task_id:any, userId:any) {
    const cookieStore = cookies();
    const token = cookieStore.get("access_token")?.value || "";
    try {
        const response = await fetch(`http://localhost:8081/activity/delete/task/${task_id}/${userId}`, {
            method: "DELETE",
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        // console.log(response);
        var data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Something went wrong');
        }
        
        const responseData = data.message;

        if (responseData === "Activity deleted successfully") {
            console.log("Tarea eliminada correctamente");
        } else {
            throw new Error("Error al eliminar la tarea");
        }
    } catch (error) {
        console.error(error);
        throw error;  // Lanza el error para manejarlo en el contexto superior
    }
}
