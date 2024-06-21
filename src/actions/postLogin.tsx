'use server'

export default async function postLogin() {
    
    const formData = {
        email: 'hb@example.com',
        userPassword: '1234'
    }

    try {
        const response = await fetch('http://localhost:8081/auth/authenticate', {
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
