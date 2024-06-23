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
            throw new Error("Error al eliminar la tarea");
        }

        // Si la respuesta del servidor no tiene contenido JSON válido, manejarla de todas formas
        const responseData = await response.text(); // Leer como texto en lugar de JSON

        if (responseData === "Task deleted") {
            // Manejar lógica adicional si es necesario
            console.log("Tarea eliminada correctamente");
        } else {
            throw new Error("Error al eliminar la tarea");
        }
    } catch (error) {
        console.error('Error al eliminar la tarea:', error);
        throw error;  // Lanza el error para manejarlo en el contexto superior
    }
}