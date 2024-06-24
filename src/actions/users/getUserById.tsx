
'use server';
import { cookies } from "next/headers";
export default async function getUserById(Id:any) {
  const cookieStore = cookies();
    const token = cookieStore.get("access_token")?.value || "";
  try {
    const response = await fetch(
      `http://localhost:8081/users/project/${Id}`,{
        method: "GET",
        cache: "no-store",
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
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}