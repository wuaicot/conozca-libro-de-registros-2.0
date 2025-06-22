import React from "react";
import Link from "next/link";
import TripticoLr1 from "../components/triptico1";
import TripticoLr2 from "../components/triptico2";
import TripticoLr3 from "../components/triptico3";

export default function TripticoPage() {
  return (
    <>
      <header className="bg-gray-800 text-white p-4 ">
        <Link href="/" className="text-white/80 hover:underline">
          🔰 Volver al inicio
        </Link>
      </header>

      <TripticoLr1 />     
      <TripticoLr2 />
      <TripticoLr3 />
    </>
  );
}
