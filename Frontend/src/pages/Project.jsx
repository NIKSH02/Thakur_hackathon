import React from 'react'
import Beams from '../components/Beams.jsx'
import ScrollTextAnimation from '../components/AnimatedTextSection.jsx'
import Lanyard from '../components/Lanyard.jsx'
import MinimalNavbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

export default function Project() {
  return (
      <div style={{ width: '100%', height: '150vh', position: 'relative', backgroundColor: "black"}}>
        <MinimalNavbar />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '150%', height: '100%', objectFit: "cover", zIndex: 40 }}>
            <Beams
            beamWidth={2}
            beamHeight={15}
            beamNumber={12}
            lightColor="#ffffff"
            speed={2}
            noiseIntensity={1.75}
            scale={0.2}
            rotation={30}
            />
        </div>
        <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
            <div style={{ position: 'absolute', top: 0, left: 30, zIndex: 41, width: '100%', height: '100%' }}>
                <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
            </div>
            <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 10, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 41 }}>
                <ScrollTextAnimation />
            </div>
        </div>
        <Footer />
    </div>
  )
}
