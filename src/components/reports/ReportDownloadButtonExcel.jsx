// Importar useState y getPdfReport
import React, { useState } from 'react';
import getExcelReport from '@/actions/reports/getExcelReport'; // Asegúrate de tener una función similar para obtener el reporte Excel

// Definir el componente funcional ReportDownloadButton
export default function ReportDownloadButton({ projectId }) {
    // Estado para manejar la descarga y el estado del botón
    const [downloading, setDownloading] = useState(false);

    // Función para manejar la descarga del Excel
    const handleDownload = async () => {
        try {
            // Indicar que se está realizando la descarga
            setDownloading(true);

            // Obtener el blob del Excel mediante la función getExcelReport (debe estar implementada)
            const blob = await getExcelReport(projectId);

            // Crear una URL del blob para descargar o visualizar el Excel
            const url = window.URL.createObjectURL(blob);

            // Crear un enlace dinámico para iniciar la descarga
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = `reporte_${projectId}.xlsx`; // Nombre del archivo para descargar (extensión .xlsx para Excel)
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            // Finalizar la descarga y cambiar el estado del botón
            setDownloading(false);
        } catch (error) {
            // Manejar errores en la consola y restablecer el estado del botón
            console.error('Error al descargar el Excel:', error);
            setDownloading(false);
            // Podrías añadir aquí un manejo de errores más específico, como mostrar un mensaje al usuario
        }
    };

    return (
        <button
            className={`bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded ${downloading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            disabled={downloading}
            onClick={handleDownload}
        >
            {downloading ? 'Descargando...' : 'Descargar Excel'}
        </button>
    );
};
