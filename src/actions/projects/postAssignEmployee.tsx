"use server";

const postAssignEmployee = async (userId:any,projectId:any) => {
    const formData = {
        projectId: projectId,
        userId: userId
    };
    try {
        const response = await fetch("http://localhost:8081/project-assignment/assign", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        
        console.log("Response:", response);
        let data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }else{
            data.ok=true;
            console.log("Data:", data);
        }
        // agregar un .ok a data para verificar si la respuesta es correcta
        
        return data;
    } catch (error) {
        console.error("Error al enviar la solicitud:", error);
        throw error;
    }
};

export default postAssignEmployee;