'use server';

export default async function deleteReverseActivities(task_id:any) {
    try {
        const response = await fetch(`http://localhost:8081/activity/delete/task/${task_id}`, {
            method: "DELETE",
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Error al eliminar la tarea");
        }

        // Leer el cuerpo de la respuesta como texto
        const responseData = await response.text();

        if (responseData === "Activity deleted successfully") {
            console.log("Tarea eliminada correctamente");
        } else {
            throw new Error("Error al eliminar la tarea");
        }
    } catch (error) {
        console.error('Error al eliminar la tarea:', error);
        throw error;  // Lanza el error para manejarlo en el contexto superior
    }
}
