import React from 'react';
import ActivityCard from '@/components/activity/activitiCard';
import deleteReverseActivities from '@/actions/activities/deleteReverseActivities';



export default function ActivityList({ list, task_Id, onEdit, onCreate }) {
        
    
    const handleRevert = async(task_Id)=>{
        try {
            const response = await deleteReverseActivities(task_Id);
            // console.log(response);
            alert("Actividad revertida correctamente");
            window.location.reload();
        }
        catch (error) {
            console.error("Error al revertir actividades:", error);
            alert("Error al revertir actividades: " + error.message);
        }
    }
    
    return (
        <div>
            <h2 className="text-2xl font-bold mt-6">Actividades</h2>
            <button className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded"
                onClick={() => handleRevert(task_Id)}
            >
                Revertir
            </button>
            <button className="ml-2 bg-gray-300 hover:bg-green-400 text-gray-800 font-bold py-1 px-2 rounded"
                onClick={onCreate}
            >
                Crear actividad
            </button>
            <ul>
                {list.map((activity) => (
                    <ActivityCard key={activity.id} activity={activity}  onEdit={onEdit} />
                ))}
            </ul>
        </div>
    );
}
