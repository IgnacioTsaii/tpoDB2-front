// En un archivo independiente, por ejemplo, actions/reports/getPdfReport.js

export default async function getPdfReport(projectId) {
    try {
        const response = await fetch(`http://localhost:8081/reports/pdf/${projectId}`, {
            method: 'GET',
            headers: {
                // No necesitas Content-Type ni Authorization headers para descargar un archivo PDF
            },
        });

        if (response.ok) {
            // Convertir la respuesta a un blob
            const blob = await response.blob();
            
            return blob;
        } else {
            console.error('Error al descargar el PDF:', response.statusText);
            throw new Error(`Error al descargar el PDF: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error al descargar el PDF:', error);
        throw error; // Propaga el error para manejarlo en la capa superior si es necesario
    }
};
