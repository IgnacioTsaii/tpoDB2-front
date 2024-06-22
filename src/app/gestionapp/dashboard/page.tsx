"use client";
import { useState } from "react";
import Link from "next/link";
import Employee from "../empleado/page";

function Page() {
    const [showRegisterForm, setShowRegisterForm] = useState(false);

    const resetForms = () => {
        setShowRegisterForm(false);
    };

    return (
        <div className="container mx-auto px-4 max-w-4xl py-8">
            {!showRegisterForm && (
                <div className="flex flex-wrap justify-center space-y-4 md:space-y-0 md:space-x-4">
                    <div className="w-full md:w-1/2 lg:w-1/3 p-4">
                        <div className="shadow-lg rounded-lg bg-white p-6 h-full flex flex-col justify-between">
                            <div>
                                <h3 className="text-lg font-bold mb-4">
                                    Proyectos de la Compañía
                                </h3>
                                <p className="mb-4">
                                    Accede a la lista de proyectos de la
                                    compañía y gestiona sus detalles.
                                </p>
                            </div>
                            <Link
                                href="/proyects"
                                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded">
                                Mostrar Proyectos
                            </Link>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-1/3 p-4">
                        <div className="shadow-lg rounded-lg bg-white p-6 h-full flex flex-col justify-between">
                            <div>
                                <h3 className="text-lg font-bold mb-4">
                                    Empleados de la Compañía
                                </h3>
                                <p className="mb-4">
                                    Consulta y gestiona la información de los
                                    empleados de la compañía.
                                </p>
                            </div>
                            <Link
                                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded w-full"
                                href="empleado">
                                Mostrar Empleados
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Page;
