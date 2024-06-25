'use server';
import { cookies } from "next/headers";

export default async function deleteProjectAssing(userId,projectId) {
    const cookieStore = cookies();
    const token = cookieStore.get("access_token")?.value || "";
    // convierto el id a int
    const id = parseInt(userId);
    const project_id = parseInt(projectId);
    console.log("user_id:", id);
    console.log("project_id:", project_id);
    try {
        const response = await fetch(`http://localhost:8081/project-assignment/delete`, {
            method: "DELETE",
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ userId: id, projectId: project_id }),
        });
        var data = await response.json();
        console.log(data);
        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        } else {
            data.ok = true;
            console.log("Data:", data);
        }
        
        return data;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
};
