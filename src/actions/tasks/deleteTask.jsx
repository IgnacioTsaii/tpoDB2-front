'use server';

export default async function DeleteTask(task_id) {
    try {
        const response = await fetch(`http://localhost:8081/task/${task_id}`, {
            method: "DELETE",
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Error al eliminar la tarea');
        }
        const data = await response.json();
        console.log('Tarea eliminada correctamente:', data);
        return data;  // Devuelve los datos de la respuesta
    } catch (error) {
        console.error('Error al eliminar la tarea:', error);
        throw error;  // Lanza el error para manejarlo en el contexto superior
    }
}