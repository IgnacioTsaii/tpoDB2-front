// Importar useState y getPdfReport
import React, { useState } from 'react';
// import getPdfReport from '@/actions/reports/getPdfReport';

// Definir el componente funcional ReportDownloadButton
export default function ReportDownloadButton({ projectId }) {
    // Estado para manejar la descarga y el estado del botón
    const [downloading, setDownloading] = useState(false);

    // Función para manejar la descarga del PDF
    const handleDownload = async () => {
        try {
            setDownloading(true);
            const response = await fetch(`http://localhost:8081/reports/pdf/${projectId}`, {
                method: 'GET',
                headers: {
                    // No necesitas Content-Type ni Authorization headers para descargar un archivo PDF
                },
            });

            if (response.ok) {
                const blob = await response.blob();

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

                // Revocar la URL del objeto después de la descarga
                window.URL.revokeObjectURL(url);
            } else {
                console.error('Error al descargar el PDF:', response.statusText);
            }
            setDownloading(false);
        } catch (error) {
            console.error('Error al descargar el PDF:', error);
            setDownloading(false);
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