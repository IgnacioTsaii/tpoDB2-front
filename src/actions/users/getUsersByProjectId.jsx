
'use server';
export default async function getUsersByProjectId(projectId) {
  try {
    const response = await fetch(
      `http://localhost:8081/users/project/${projectId}`,{
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          // 'Authorization': 'Bearer ' + localStorage.getItem('token')
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