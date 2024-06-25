"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import decodingToken from "@/actions/utils/decodingToken";
import Image from "next/image";
import {useRouter} from "next/navigation";
import logOut from "@/actions/logOut";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUserRole = async () => {
      const decodedToken = await decodingToken();
      if (decodedToken && decodedToken.userType === "Admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    };
    fetchUserRole();
  }, []);

  const router = useRouter();

  const handlelogOut = async() => {
  try{
    const response = await logOut();
    if(response){
      router.push("/");
    }
  }catch(error){
    console.log(error);
  }}


  return (
    <nav className="fixed w-full z-10 bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/gestionapp/projects">
              <Image
                src={"/images/taskflow.png"}
                alt="TaskFlow"
                width={50}
                height={50}
              />
            </Link>
            <div className="hidden md:flex md:ml-10">
              <div className="flex items-baseline space-x-4">
                <Link
                  href="/gestionapp/projects"
                  className="px-3 py-2 rounded-md text-md font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition duration-300"
                  >
                  Proyectos
                </Link>
                  {isAdmin && (
                    <Link
                      href="/gestionapp/empleado"
                      className="px-3 py-2 rounded-md text-md font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition duration-300"
                    >
                      Gestión de empleados
                    </Link>
                  )}
              </div>
            </div>
          </div>
          <div className="hidden md:flex md:items-center">
            <button
            onClick={() => handlelogOut()}
              className="ml-4 px-3 py-2 text-red-600 rounded-md font-medium hover:bg-gray-700 transition duration-300"
            >
              Sign Out
            </button>
          </div>
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isAdmin && (
              <Link
                href="/gestionapp/empleado"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition duration-300"
              >
                Gestión de empleados
              </Link>
            )}
            <Link
              href="/gestionapp/projects"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition duration-300"
            >
              Proyectos
            </Link>
            <button onClick={()=>handlelogOut()}
              className="w-full mt-2 px-3 py-2  text-red-600 rounded-md font-medium hover:bg-gray-700 transition duration-300"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}