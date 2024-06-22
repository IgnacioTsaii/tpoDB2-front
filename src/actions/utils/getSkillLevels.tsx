'use server'
export default async function getskillLevels() {
    try {
        const response = await fetch('http://localhost:8081/util/skill-level', {
            method: "GET",
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
              },
        });

        // console.log("Full Response:", response);
        const data = await response.json();
        console.log("Parsed JSON Data:", data);
        // console.log("Parsed JSON Data:", data);
        return data;
    } catch (error) {
        console.error("Error:", error);
        // You might want to handle the error here, depending on your use case
        throw error;
    }
}