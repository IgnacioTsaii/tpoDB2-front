'use server'

import { cookies } from "next/headers";

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
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || "Login failed");
        }

        cookies().set("access_token", data.access_token, { secure: true });
        console.log("Token guardado en las cookies", data.access_token);
        return data;
    } catch (error:any) {
        console.error('Error:', error);
        return { error: error.message };
    }
}