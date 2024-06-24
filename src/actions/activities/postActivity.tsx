'use server';
import { cookies } from "next/headers";

export default async function PostActiviy(formData:any) {
    const cookieStore = cookies();
    const token = cookieStore.get("access_token")?.value || "";
    console.log('Form data:', formData);
    try {
        const response = await fetch("http://localhost:8081/activity/add", {
            method: "POST",
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(formData),  // Asegúrate de convertir formData a JSON
        });

        // console.log(response);
        var data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        } else {
            data.ok = true;
            console.log("Data:", data);
        }
        
        return data;
    } catch (error) {
        console.error("Error al enviar la solicitud:", error);
        throw error;  // Throw the caught error
    }

};