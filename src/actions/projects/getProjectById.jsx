'use server';
import { cookies } from "next/headers";

export default async function getProjectById(Id) {
  const cookieStore = cookies();
    const token = cookieStore.get("access_token")?.value || "";
  try {
    
    const projectId = parseInt(Id);
    const response = await fetch(
      `http://localhost:8081/projects/${projectId}`,
      {
        method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
      }
    );
    // console.log("Response:", response);
    let data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    } else {
      data.ok = true;
      // console.log("Data:", data);
    }
    // agregar un .ok a data para verificar si la respuesta es correcta
    return data;
  } catch (error) {
    console.error("Error:", error);
    // You might want to handle the error here, depending on your use case
    throw error;
  }
}
