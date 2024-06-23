'use client';
import Loader from "@/components/Loader";
import FormEditProject from "@/components/formularios/formProject";
import React, { useState } from "react";

export default function EditProjectPage(params) {
    const [project, setProject] = useState()

    
    return (
        <div>
            <FormEditProject/>
        </div>
    );
};
