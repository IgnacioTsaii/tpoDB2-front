'use server'

import { cookies } from "next/headers";
import {jwtDecode}from "jwt-decode";

export default async function decodingToken() {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get("access_token")?.value || "";
        
        if (!token) {
            throw new Error("Token not found");
        }

        const decoded = jwtDecode(token); // decode the token
        
        console.log(decoded);
        const userType = decoded.role;
        const email = decoded.sub;
        const userId = decoded.userId;
        

        return { userType, email, userId, token};
    } catch (error: any) {
        console.error("Error decoding token:", error);
        return { error: error.message };
    }
}