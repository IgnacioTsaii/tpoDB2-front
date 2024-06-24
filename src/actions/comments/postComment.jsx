
'use server';

export default async function postComment(formData) {
    try {
        const response = await fetch("http://localhost:8081/comment/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
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
