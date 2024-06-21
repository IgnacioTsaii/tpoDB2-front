'use server'

export default async function postEmployee(formData: any) {
    console.log('formData', formData);
    
    try {
        const response = await fetch('http://localhost:8081/auth/register', {
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
