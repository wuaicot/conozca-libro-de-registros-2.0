import React from "react";
import Link from "next/link";
import TripticoLr1 from "../components/TripticoLr1";

export default function TripticoPage() {
  return (
    <>
      <header className="bg-gray-900 text-white p-4">
        <Link href="/" className="text-cyan-400 hover:underline">
          🔰 Volver al inicio
        </Link>
      </header>

      <TripticoLr1 />
    </>
  );
}
