// Importar useState y getPdfReport
import React, { useState } from 'react';
import getPdfReport from '@/actions/reports/getPdfReport';

// Definir el componente funcional ReportDownloadButton
export default function ReportDownloadButton({ projectId }) {
    // Estado para manejar la descarga y el estado del botón
    const [downloading, setDownloading] = useState(false);

    // Función para manejar la descarga del PDF
    const handleDownload = async () => {
        try {
            // Indicar que se está realizando la descarga
            setDownloading(true);

            // Obtener el blob del PDF mediante getPdfReport
            const blob = await getPdfReport(projectId);

            // Crear una URL del blob para descargar o visualizar el PDF
            const url = window.URL.createObjectURL(blob);

            // Crear un enlace dinámico para iniciar la descarga
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = `reporte_${projectId}.pdf`; // Nombre del archivo para descargar
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            // Simular la apertura del PDF en una nueva pestaña
            window.open(url, '_blank');

            // Finalizar la descarga y cambiar el estado del botón
            setDownloading(false);
        } catch (error) {
            // Manejar errores en la consola y restablecer el estado del botón
            console.error('Error al descargar el PDF:', error);
            setDownloading(false);
            // Podrías añadir aquí un manejo de errores más específico, como mostrar un mensaje al usuario
        }
    };

    return (
        <button
            className={`bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded ${downloading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            disabled={downloading}
            onClick={handleDownload}
        >
            {downloading ? 'Descargando...' : 'Descargar PDF'}
        </button>
    );
};
