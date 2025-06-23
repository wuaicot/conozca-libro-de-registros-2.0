import React from 'react'
//import styles from './VideoDemo.module.css'

export default function VideoDemo() {
  return (
    <div className="flex flex-col items-center  justify-center p-4 bg-black min-h-screen  mt-4">
      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 justify-start -mt-20">
        Video Demo — 
      </h1>
      <aside className='mb-3'>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-3">
            <span className="border text-cyan-400 rounded-lg px-1">L</span>
            ibro de {" "}
            <span className="border text-cyan-400 rounded-lg px-1">R</span>
            egistros
            <span className="text-cyan-400 font-extrabold border rounded-lg px-1 ml-1 text-lg">
              2.0
            </span>
          </h1>
          </aside>
      <div className="w-full max-w-md sm:max-w-lg lg:max-w-2xl">
        <video
          src="/vd-conozca-lr-2-0.mp4"
          controls
          playsInline
          className="w-full h-auto rounded-xl shadow-2xl"
        />
      </div>
      <p className="mt-4 text-gray-400 text-sm text-center">
        Formato vertical optimizado para móviles, pero perfectamente adaptable a escritorio.
      </p>
    </div>
  )
}
