'use server';
import { cookies } from "next/headers";

export default async function getActivitiesByTask(id) {
    const cookieStore = cookies();
    const token = cookieStore.get("access_token")?.value || "";
    try {
        let task_id = parseInt(id);
        const response = await fetch(`http://localhost:8081/activity/task/${task_id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            // Lanza un error si la respuesta no es OK (200-299)
            throw new Error(`Error al obtener las actividades: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en getActivitiesByTask:', error);
        // Puedes lanzar el error o devolver un valor por defecto
        throw error;
    }
};
