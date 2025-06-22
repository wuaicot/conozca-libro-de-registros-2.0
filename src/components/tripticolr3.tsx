import React from "react";
import Image from "next/image";

export default function TripticoLr3() {
  return (
    <main className=" ">
      

      <div className="">
        <Image
          src="/tripticolr3.png"
          alt="Tríptico de Libro de Registros 2.0"
          width={1200}
          height={1800}
          className="w-full h-auto rounded-lg shadow-lg shadow-amber-400 r-shadow-amber-400 hover:shadow-amber-500 transition-shadow duration-300 ease-in-out"
          priority
        />
      </div>
    </main>
  );
}
