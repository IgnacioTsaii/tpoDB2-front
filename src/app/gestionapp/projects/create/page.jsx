'use client'
import React from "react";
import FormProject from "@/components/formularios/formProject";
import Loader from "@/components/Loader";


export default function Page({ params }) {

    return (
        <div>
            {/* Form para crear proyectos */}
            <FormProject />
        </div>
    );
}
