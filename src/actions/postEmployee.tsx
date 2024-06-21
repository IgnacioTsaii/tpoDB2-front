'use server'

export default async function postEmployee(formData: any) {
    
    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        return response.json();
    }
    catch (error) {
        console.error('Error:', error);
    }

}
