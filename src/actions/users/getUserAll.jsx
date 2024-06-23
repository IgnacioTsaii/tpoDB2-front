'use server';
export default async function getUserAll() {
    try{
        const response = await fetch(
            `http://localhost:8081/users/`,{
              method: "GET",
              cache: "no-store",
              headers: {
                "Content-Type": "application/json",
                // 'Authorization': 'Bearer ' + localStorage.getItem('token')
              },
            }
          );
          console.log("Response:", response);
          let data = await response.json();
      
          if (!response.ok) {
            throw new Error(data.message || "Something went wrong");
          } else {
            data.ok = true;
            console.log("Data:", data);
          }
          return data;
    } catch (e) {
        console.error("Error:", e);
        throw e;
    }
};
