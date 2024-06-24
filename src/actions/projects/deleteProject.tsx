'use server'
import { cookies } from "next/headers";
export default async function deleteUser(user_id: string) {
    const cookieStore = cookies();
    const token = cookieStore.get("access_token")?.value || "";
    // convierto el id a int
    const id = parseInt(user_id);
    console.log("user_id:", user_id);
    try {
        const response = await fetch(`http://localhost:8081/projects/delete/${id}`, {
            method: "DELETE",
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        let data = await response.json();
        console.log("Response:", response);
        
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