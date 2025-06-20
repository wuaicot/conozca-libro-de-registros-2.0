import React from 'react'
import Image from 'next/image'

export default function TripticoLr2() {
  return (
    <main className="flex flex-col  p-4 bg-lime-950 min-h-screen mt-4 border">
      <h4 className="text-3xl font-bold mb-6 mt-6 text-amber-400 animate-pulse">Tríptico informativo </h4>
      <aside className='mb-3'>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="border text-cyan-400 rounded-lg px-1">L</span>
            ibro de {" "}
            <span className="border text-cyan-400 rounded-lg px-1">R</span>
            egistros
            <span className="text-cyan-400 font-extrabold border rounded-lg px-1 ml-1 text-lg">
              2.0
            </span>
          </h1>
          </aside>
      <div className="w-full max-w-4xl">
        <Image
          src="/Flayer.png"
          alt="Tríptico de Libro de Registros 2.0"
          width={1200}
          height={1800}
          className="w-full h-auto rounded-lg shadow-lg shadow-amber-400 r-shadow-amber-400 hover:shadow-amber-500 transition-shadow duration-300 ease-in-out"
          priority          
        />
      </div>        
    </main>    
  )
}
