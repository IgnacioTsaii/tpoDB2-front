'use server'
import { cookies } from "next/headers";

export default async function getAllEmployees() {
    const cookieStore = cookies();
    const token = cookieStore.get("access_token")?.value || "";
    try {
        const response = await fetch('http://localhost:8081/users/', {
            method: "GET",
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        // console.log("Full Response:", response);
        const data = await response.json();
        // console.log("Parsed JSON Data:", data);
        // console.log("Parsed JSON Data:", data);
        return data;
    } catch (error) {
        console.error("Error:", error);
        // You might want to handle the error here, depending on your use case
        throw error;
    }
}