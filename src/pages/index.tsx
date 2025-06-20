import React from "react";
import { useRouter } from "next/router";


import { RiAdminLine, RiUserAddLine, RiLoginBoxLine } from "react-icons/ri";

export default function LandingPage() {
  const router = useRouter();

  const baseButtonStyles =
    "flex items-center justify-center w-sm:sm px-6 py-3 text-lg font-semibold rounded-2xl shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 ease-in-out";
  const outlineButtonStyles = `${baseButtonStyles} text-cyan-400 border-2 border-violet-00 hover:bg-cyan-500 hover:text-white focus:ring-cyan-400`;

  // Handles authentication actions like login and register
  const handleAuthAction = (action: "login" | "register") => {
    if (action === "login") {
      router.push("/admin/login");
    } else if (action === "register") {
      router.push("/register");
    }
  };

  // Handles conserjería button click
  const handleConserjeriaClick = () => {
    router.push("/conserjeria/login");
  };

  

 

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <main className="flex flex-col items-center justify-center flex-grow p-6 sm:p-8 lg:p-12">
        <div className="text-center mb-24 sm:mb-12 md:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight -mt-4 -ml-10 ">
            <span className="border text-cyan-400 rounded-lg  pl-1 pr-1 ">
              L
            </span>
            ibro de{" "}
            <span className=" text-cyan-400 border pl-1 pr-1 rounded-lg">
              R
            </span>
            egistros
            <span className="text-cyan-400 font-extrabold border rounded-tr-lg rounded-br-lg ml-1 pl-1 pr-1 text-lg absolute rounded-tl-lg">
              2.0
            </span>
          </h1>
          <p className="mt-8 text-xl animate-pulse font-bold text-gray-300 ">
            Nombre del edificio aquí
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 w-full max-w-md sm:max-w-sm md:max-w-md lg:max-w-lg -mt-8">
          <button
            onClick={() => handleAuthAction("login")}
            className={`${baseButtonStyles} w-full md:max-w-xs border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white cursor-pointer`}
          >
            <RiAdminLine className="mr-2 text-xl md:text-2xl" />
            <span className="hidden sm:inline">Admin.</span>
            <span className="sm:hidden">Admin.</span>
          </button>
          <button
            onClick={handleConserjeriaClick}
            className={`${baseButtonStyles} w-xs  border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white cursor-pointer`}
          >
            <RiLoginBoxLine className="mr-2 text-xl md:text-2xl" />
            <span className="hidden sm:inline">Conserjería</span>
            <span className="sm:hidden">Conserjería</span>
          </button>
          <button
            onClick={() => handleAuthAction("register")}
            className={`${outlineButtonStyles} w-full md:max-w-xs cursor-pointer`}
          >
            <RiUserAddLine className="mr-2 text-xl md:text-2xl" />
            <span className="text-white hidden sm:inline">
              Solicitar Acceso
            </span>
            <span className="text-white hover:text-black  sm:hidden">
              Solicitar acceso{" "}
            </span>
          </button>
        </div>
      </main>
      <footer className="text-center p-4 text-gray-400 text-sm animate-pulse">
        <p className="-translate-y-34">
          &copy; {new Date().getFullYear()} Naycol Linares • Todos los derechos
          reservados.
        </p>
      </footer>
    </div>
  );
}
