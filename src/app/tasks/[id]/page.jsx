'use client'
import React, {useState} from 'react';

export default function taskPage(params) {
    const [task , setTask] = useState(null);
    const [activity, setActivity] = useState([]);



        return (
            <div>
            {/* lista de actividades */}
            <taskActivities list={activity}/>
            </div>
        );
    }