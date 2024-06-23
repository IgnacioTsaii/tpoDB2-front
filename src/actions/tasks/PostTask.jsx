'use server';

export default async function PostTask(formData) {
    try {
        const response = await fetch("http://localhost:8081/task/", {
            method: "POST",
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(formData),  // Asegúrate de convertir formData a JSON
        });

        if (!response.ok) {
            throw new Error('Error al crear la tarea');
        }

        const data = await response.json();
        console.log('Tarea creada correctamente:', data);
        return data; // Devuelve los datos de la respuesta

    } catch (error) {
        console.error('Error al crear la tarea:', error);
        throw error; // Propaga el error para manejarlo en el contexto que llama a esta función
    }
}
