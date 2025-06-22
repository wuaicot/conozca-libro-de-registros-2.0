import React from "react";
import Image from "next/image";

export default function TripticoLr1() {
  return (
    <main className="flex flex-col items-center  p-4 bg-yellow-500 min-h-screen mt-4 ">
      <h4 className="text-4xl font-bold mb-6 mt-6 text-white ">
        Tríptico informativo{" "}
      </h4>

      <div className="w-full max-w-4xl">
        <Image
          src="/1tripticolr.png"
          alt="información Libro de Registros 2.0"
          width={1200}
          height={1800}
          className="w-full h-auto rounded-lg shadow-lg shadow-amber-400 r-shadow-amber-400 hover:shadow-amber-500 transition-shadow duration-300 ease-in-out"
          priority
        />
      </div>
    </main>
  );
}
