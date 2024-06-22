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
        
        if (data.access_token == undefined) {
            throw Error(data.message || "Login failed");
          } else {
            cookies().set("access_token", data.access_token, { secure: true });
            console.log("Token guardado en las cookies", data.access_token);
            return data;
          }
    }
    catch (error) {
        console.error('Error:', error);
    }

}
