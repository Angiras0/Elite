import { useState, useCallback } from 'react'
import Cursor from './components/Cursor'
import AmbientBackground from './components/AmbientBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Identity from './components/Identity'
import Value from './components/Value'
import Stats from './components/Stats'
import SocialProof from './components/SocialProof'
import Scarcity from './components/Scarcity'
import Footer from './components/Footer'
import ApplyModal from './components/ApplyModal'

export default function App() {
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = useCallback(() => setModalOpen(true), [])
  const closeModal = useCallback(() => setModalOpen(false), [])

  return (
    <div className="grain relative min-h-screen bg-[#0a0a0a] overflow-x-hidden">
      <AmbientBackground />
      <div className="grid-overlay fixed inset-0 z-[1] pointer-events-none" />
      <Cursor />
      <ApplyModal open={modalOpen} onClose={closeModal} />
      <Navbar onApply={openModal} />
      <main className="relative z-10">
        <Hero onApply={openModal} />
        <Identity />
        <Value />
        <Stats />
        <SocialProof />
        <Scarcity onApply={openModal} />
      </main>
      <Footer onApply={openModal} />
    </div>
  )
}
