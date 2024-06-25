// Importar useState y getPdfReport
import React, { useState } from 'react';
import decodingToken from '@/actions/utils/decodingToken';

// Definir el componente funcional ReportDownloadButton
export default function ReportDownloadButton({ projectId }) {
    // Estado para manejar la descarga y el estado del botón
    const [downloading, setDownloading] = useState(false);

    // Función para manejar la descarga del Excel
    const handleDownload = async () => {
        try {
            // Obtener el token de acceso del usuario autenticado
            const data = await decodingToken();
            setDownloading(true);
            const response = await fetch(`http://localhost:8081/reports/excel/${projectId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${data.token}`
                },
            });

            if (response.ok) {
                const blob = await response.blob();

                // Crear una URL del blob para descargar o visualizar el Excel
                const url = window.URL.createObjectURL(blob);

                // Crear un enlace dinámico para iniciar la descarga
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = `reporte_${projectId}.xlsx`; // Nombre del archivo para descargar
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);

                // Revocar la URL del objeto después de la descarga
                window.URL.revokeObjectURL(url);
            } else {
                console.error('Error al descargar el Excel:', response.statusText);
            }
            setDownloading(false);
        } catch (error) {
            console.error('Error al descargar el Excel:', error);
            setDownloading(false);
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
