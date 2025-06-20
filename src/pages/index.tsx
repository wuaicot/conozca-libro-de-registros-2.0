import React from "react";
import { useRouter } from "next/router";

export default function LandingPage() {
  const router = useRouter();

  const baseButton =
    "flex items-center justify-center px-6 py-3 text-lg font-semibold rounded-2xl shadow-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900";
  const primaryButton = `${baseButton} border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white`;
  const outlineButton = `${baseButton} border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500`;

  const handleAuth = (action: "login" | "register") => {
    const path = action === "login" ? "/admin/login" : "/register";
    router.push(path);
  };

  const handleTriptico = () => {
    router.push("/triptico");
  };

  const handleVideoDemo = () => router.push("/video-demo");
  const handleConserjeria = () => router.push("/conserjeria");

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <section className="animate-pulse translate-y-8 text-yellow-400 text-center text-lg mt-12">
        <h1>Conozca su nuevo sistema</h1>
      </section>
      <section className="flex flex-col items-center justify-center flex-grow p-6 sm:p-8 lg:p-12">
        <header className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="border text-cyan-400 rounded-lg px-1">L</span>
            ibro de{" "}
            <span className="border text-cyan-400 rounded-lg px-1">R</span>
            egistros
            <span className="text-cyan-400 font-extrabold border rounded-lg px-1 ml-1 text-lg">
              2.0
            </span>
          </h1>
          <p className="mt-6 text-xl font-bold text-gray-300 animate-pulse">
            Nombre de su edificio aquí
          </p>
        </header>

        <div className="flex flex-col items-center gap-4 w-full max-w-md">
          <button onClick={handleTriptico} className={primaryButton}>
            Ver Tríptico
          </button>

          <button onClick={handleVideoDemo} className={primaryButton}>
            Ver Video-Demo
          </button>

          <button
            onClick={() => handleAuth("register")}
            className={outlineButton}
          >
            Probar Aplicación-Demo
          </button>
        </div>
      </section>

      <footer className="text-center p-4 text-gray-400 text-sm animate-pulse">
        <p>
          &copy; {new Date().getFullYear()} Naycol Linares • Todos los derechos
          reservados.
        </p>
      </footer>
    </main>
  );
}
