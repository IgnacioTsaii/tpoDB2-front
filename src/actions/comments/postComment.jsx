'use server';
import { cookies } from "next/headers";

export default async function postComment(formData) {
    const cookieStore = cookies();
    const token = cookieStore.get("access_token")?.value || "";
    try {
        const response = await fetch("http://localhost:8081/comment/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        });
        if(!response.ok){
            throw new Error("Error en la petición");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
    
};
