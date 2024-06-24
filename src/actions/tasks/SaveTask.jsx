'use server';
import { cookies } from "next/headers";

export default async function SaveTask(formData) {
    const cookieStore = cookies();
    const token = cookieStore.get("access_token")?.value || "";
    try {
        const response = await fetch("http://localhost:8081/task/", {  
            method: "PUT",
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(formData),  // Asegúrate de convertir formData a JSON
        });
        
        if (!response.ok) {
            throw new Error('Error al actualizar la tarea');
        }
        const data = await response.json();
        console.log('Tarea actualizada correctamente:', data);
        return data;  // Devuelve los datos de la respuesta
    } catch (error) {
        console.error('Error al actualizar la tarea:', error);
        throw error;  // Lanza el error para manejarlo en el contexto superior
    }
}
