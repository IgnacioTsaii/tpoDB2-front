import React, { useState } from "react";


export default function TaskList ({ tasks }) {
  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id} className="mt-4 p-4 border rounded shadow-md">
          <p className="text-lg font-bold">{task.name}</p>
          <p>{task.description}</p>
          <p>Skill Level: {task.skill_level}</p> {/* Corregido el nombre de la propiedad */}
        </div>
      ))}
    </div>
  );
};


