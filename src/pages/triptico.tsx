import React from "react";
import Link from "next/link";
import TripticoLr1 from "../components/tripticolr1";
import TripticoLr2 from "../components/tripticolr2";
import TripticoLr3 from "../components/tripticolr3";

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
