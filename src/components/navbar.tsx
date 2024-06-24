"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import decodingToken from "@/actions/utils/decodingToken";
import Image from "next/image";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUserRole = async () => {
      const decodedToken = await decodingToken();
      console.log(decodedToken);
      if (decodedToken && decodedToken.userType === "Admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    };
    fetchUserRole();
  }, []);

  return (
    <nav
      className={`block w-full z-10 bg-gray-700 text-gray-200 shadow ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
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
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/gestionapp/projects">
                <Image 
                src={"/images/taskflow.png"}
                alt="TaskFlow"
                width={50}
                height={50}
                ></Image>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {isAdmin && (
                  <Link
                    href="/gestionapp/empleado"
                    className="px-3 py-2 rounded-md text-md font-medium hover:text-gray-700 hover:bg-gray-300"
                  >
                    Gestion de empleados
                  </Link>
                )}
                <Link
                  href="/gestionapp/projects"
                  className="px-3 py-2 rounded-md text-md font-medium hover:text-gray-700 hover:bg-gray-300"
                >
                  Proyectos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 text-center space-y-1 sm:px-3 flex flex-col items-center">
            {isAdmin && (
              <Link
                href="/gestionapp/empleado"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
              >
                Gestion de empleados
              </Link>
            )}
            <Link
              href="/gestionapp/projects"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
            >
              Proyectos
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
