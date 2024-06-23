'use server'
export default async function deleteUser(user_id: string) {
    // convierto el id a int
    const id = parseInt(user_id);
    console.log("user_id:", user_id);
    try {
        const response = await fetch(`http://localhost:8081/project/${id}`, {
            method: "DELETE",
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
              },
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
        console.error("Error:", error);
        // You might want to handle the error here, depending on your use case
        throw error;
    }
}