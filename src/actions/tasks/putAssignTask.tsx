"use server";

const putAssignTask = async (userId:any,taskId:any) => {
    console.log(userId,taskId)
    try {
        const response = await fetch(`http://localhost:8081/task/assign/${taskId}/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
        });
        
        console.log(response);
        var data = await response.json();
        
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

export default putAssignTask;