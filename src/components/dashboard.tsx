'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie } from 'recharts';

const data = [
    { name: 'Enero', ventas: 4000, gastos: 2400 },
    { name: 'Febrero', ventas: 3000, gastos: 1398 },
    { name: 'Marzo', ventas: 2000, gastos: 9800 },
    { name: 'Abril', ventas: 2780, gastos: 3908 },
    { name: 'Mayo', ventas: 1890, gastos: 4800 },
    { name: 'Junio', ventas: 2390, gastos: 3800 },
    { name: 'Julio', ventas: 3490, gastos: 4300 },
];

const Dashboard = () => {
    return (
        <div className="flex justify-center sm:justify-center w-[100%] mt-10">
            <div className="bg-white shadow-md rounded-lg p-4">
                <h2 className="text-lg font-bold text-center mb-2">Análisis de Ventas y Gastos</h2>
                <div className="block md:hidden">
                    <PieChart width={320} height={250}>
                        <Pie data={data} dataKey="ventas" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label />
                        <Tooltip />
                    </PieChart>
                </div>
                <div className="hidden md:block">
                    <BarChart
                        width={1430}
                        height={280}
                        data={data}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="ventas" fill="#8884d8" />
                        <Bar dataKey="gastos" fill="#82ca9d" />
                    </BarChart>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
