import React from 'react'
import Link from 'next/link'
import VideoDemo from '@/components/VideoDemo'

export default function VideoDemoPage() {
  return (
    <>
      <header className="bg-gray-900 text-white p-4">
        <Link href="/" className="text-cyan-400 hover:underline">
          ← Volver al inicio
        </Link>
      </header>
      <VideoDemo />
    </>
  )
}
