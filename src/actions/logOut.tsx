'use server'
import { cookies } from "next/headers";

// borrar token
export default async function logOut() {

    try {
        const cookieStore = cookies();
        cookieStore.delete("access_token");

        return true;
    }
    catch (error: any) {
        console.error("Error decoding token:", error);
        return { error: error.message };
    }

}