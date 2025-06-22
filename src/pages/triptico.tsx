import React from "react";
import Link from "next/link";
import TripticoLr1 from "../components/TripticoLr1";
import TripticoLr2 from "../components/TripticoLr2";
import TripticoLr3 from "../components/TripticoLr3";

export default function TripticoPage() {
  return (
    <>
      <header className="bg-gray-900 text-white p-4">
        <Link href="/" className="text-cyan-400 hover:underline">
          🔰 Volver al inicio
        </Link>
      </header>

      <TripticoLr1 />     
      <TripticoLr2 />
      <TripticoLr3 />
    </>
  );
}
