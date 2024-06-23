'use server';

export default async function getCommentsByTask(id) {
    try {
        let task_id = parseInt(id);
        const response = await fetch(`http://localhost:8081/comment/${task_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Puedes agregar otros encabezados aquí si es necesario, como la autenticación
            },
        });

        if (!response.ok) {
            // Lanza un error si la respuesta no es OK (200-299)
            throw new Error(`Error al obtener los comentarios: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en getCommentsByTask:', error);
        // Puedes lanzar el error o devolver un valor por defecto
        throw error;
    }
}