import React, { useState } from "react";
import { Task } from "@luca/interface/task";
import ActivityList from "./ActivityList";



export default function TaskList ({ tasks }) {
  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id} className="mt-4">
          <h3 className="text-lg font-bold">{task.name}</h3>
          <ActivityList task={task} />
        </div>
      ))}
    </div>
  );
};


