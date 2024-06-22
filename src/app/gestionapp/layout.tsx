
import { Inter } from "next/font/google";

import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <Navbar/>
        {children}
    </>
    
  );
}
