"use server";

const postAssignProject = async (userId:any,projectId:any) => {
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
        
        console.log(response)
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
        console.error("Error al enviar la solicitud:", error);
        throw error;  // Throw the caught error
    }
};

export default postAssignProject;