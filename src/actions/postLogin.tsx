'use server'

export default async function postLogin(formData: { email: string, userPassword: string }) {
    console.log('formData', formData);

    try {
        const response = await fetch('http://localhost:8081/auth/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        console.log('response', response);
        return response.json();
    }
    catch (error) {
        console.error('Error:', error);
    }

}
