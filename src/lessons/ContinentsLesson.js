import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import * as THREE from 'three'

function ContinentsLesson({ name }) {
  const navigate = useNavigate()
  const [slide, setSlide] = useState(0)
  const [mascotText, setMascotText] = useState('Hi! I am Globey! Tap me! 🌍')
  const [mascotBounce, setMascotBounce] = useState(false)
  const mountRef = useRef(null)

  const slides = [
    {
      content: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '60px', marginBottom: '20px' }}>🌍</div>
          <h2 style={{ fontSize: '30px', color: '#FFD700' }}>Earth has 7 big landmasses called Continents!</h2>
        </div>
      )
    },
    {
      content: (
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '26px', color: '#FFD700', marginBottom: '15px' }}>The 7 Continents! 🗺️</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {[['🌏','Asia — Biggest!'],['🌍','Africa — 2nd biggest!'],['🌎','North America'],['🌎','South America'],['🌍','Europe'],['🌏','Australia — Smallest!'],['❄️','Antarctica — Coldest!']].map(([e,t]) => (
              <div key={t} style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', padding: '10px', textAlign: 'center' }}>
                <div style={{ fontSize: '28px' }}>{e}</div>
                <div style={{ fontSize: '14px', marginTop: '4px', color: '#FFD700' }}>{t}</div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      content: (
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '26px', color: '#FFD700', marginBottom: '15px' }}>Where do we live? 🇮🇳</h2>
          <div style={{ fontSize: '20px', lineHeight: '2.2', color: 'white' }}>
            <div>🌏 We live in <span style={{ color: '#FFD700' }}>ASIA!</span></div>
            <div>🇮🇳 India is in Asia!</div>
            <div>🏆 Asia is the biggest continent!</div>
            <div>👥 Asia has the most people!</div>
          </div>
        </div>
      )
    },
    {
      content: (
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '26px', color: '#FFD700', marginBottom: '15px' }}>Fun Facts! 🌟</h2>
          <div style={{ fontSize: '20px', lineHeight: '2.2', color: 'white' }}>
            <div>🥶 Antarctica has no permanent people!</div>
            <div>🌊 Continents are surrounded by oceans!</div>
            <div>🌍 All continents were once ONE land!</div>
            <div>🦘 Australia is also called a country!</div>
          </div>
        </div>
      )
    },
    {
      content: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '100px', marginBottom: '20px' }}>🏆</div>
          <h2 style={{ fontSize: '35px', color: '#FFD700' }}>You know the Continents!</h2>
          <p style={{ fontSize: '22px', color: '#d8b4fe', marginTop: '10px' }}>Now lets play a fun game! 🎮</p>
        </div>
      )
    },
  ]

  const mascotTexts = [
    'Hi! I am Globey! Tap me! 🌍',
    '7 continents on Earth! 🌎',
    'We live in Asia! 🇮🇳',
    'All continents were once one! 🌍',
    'You are a Geography Star! 🏆',
  ]

  useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    mountRef.current.appendChild(renderer.domElement)
    const objects = []

    const globeGeo = new THREE.SphereGeometry(3, 32, 32)
    const globeMat = new THREE.MeshStandardMaterial({ color: 0x0984E3, roughness: 0.8 })
    const globe = new THREE.Mesh(globeGeo, globeMat)
    globe.position.set(0, 0, -15)
    scene.add(globe); objects.push(globe)

    const colors = [0x2ECC71, 0xF39C12, 0xE74C3C, 0xDFE6E9, 0x74B9FF, 0x27AE60]
    for (let i = 0; i < 12; i++) {
      const geo = new THREE.SphereGeometry(Math.random()*1+0.4, 32, 32)
      const mat = new THREE.MeshStandardMaterial({ color: colors[Math.floor(Math.random()*colors.length)], roughness: 0.7 })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set((Math.random()-0.5)*40, (Math.random()-0.5)*20, (Math.random()-0.5)*10-5)
      mesh.userData = { originalY: mesh.position.y, phase: Math.random()*Math.PI*2 }
      scene.add(mesh); objects.push(mesh)
    }

    scene.add(new THREE.AmbientLight(0xffffff, 0.6))
    const pl = new THREE.PointLight(0xffffff, 1); pl.position.set(10,10,10); scene.add(pl)
    camera.position.z = 30; let time = 0

    const animate = () => {
      requestAnimationFrame(animate); time += 0.01
      globe.rotation.y += 0.005
      objects.forEach(obj => {
        if (obj !== globe) {
          obj.position.y = obj.userData.originalY + Math.sin(time + obj.userData.phase) * 1
          obj.rotation.y += 0.007
        }
      })
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => { camera.aspect = window.innerWidth/window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight) }
    window.addEventListener('resize', handleResize)
    return () => { window.removeEventListener('resize', handleResize); if (mountRef.current) mountRef.current.removeChild(renderer.domElement); renderer.dispose() }
  }, [])

  const handleMascotClick = () => { setMascotBounce(true); setMascotText(mascotTexts[slide]); setTimeout(() => setMascotBounce(false), 500) }
  const handleNext = () => { if (slide < slides.length-1) { setSlide(slide+1); setMascotText(mascotTexts[slide+1]) } }
  const handlePrev = () => { if (slide > 0) { setSlide(slide-1); setMascotText(mascotTexts[slide-1]) } }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #0f0c29, #302b63, #24243e)', color: 'white', fontFamily: 'Arial, sans-serif', position: 'relative', overflow: 'hidden' }}>
      <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'relative', zIndex: 1, padding: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <button onClick={() => navigate('/student', { state: { name } })} style={{ backgroundColor: 'transparent', color: '#FFD700', fontSize: '18px', border: '2px solid #FFD700', padding: '10px 20px', borderRadius: '50px', cursor: 'pointer' }}>⬅️ Back</button>
          <h2 style={{ color: '#FFD700', fontSize: '22px' }}>🌍 Continents — Slide {slide+1} of {slides.length}</h2>
          <div style={{ display: 'flex', gap: '8px' }}>{slides.map((_,i) => <div key={i} style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: i===slide ? '#FFD700' : 'rgba(255,255,255,0.3)' }} />)}</div>
        </div>
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '150px' }}>
            <div style={{ backgroundColor: 'white', color: 'black', padding: '12px 16px', borderRadius: '15px', fontSize: '14px', fontWeight: 'bold', textAlign: 'center', marginBottom: '10px', position: 'relative', maxWidth: '140px', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
              {mascotText}
              <div style={{ position: 'absolute', bottom: '-10px', left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderTop: '10px solid white' }} />
            </div>
            <div onClick={handleMascotClick} style={{ fontSize: '80px', cursor: 'pointer', transform: mascotBounce ? 'scale(1.3)' : 'scale(1)', transition: 'transform 0.2s', userSelect: 'none', animation: mascotBounce ? 'none' : 'bounce 1s infinite' }}>🌍</div>
            <p style={{ color: '#d8b4fe', fontSize: '12px', marginTop: '5px' }}>Tap me! 👆</p>
          </div>
          <div style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '30px', padding: '40px', textAlign: 'center', backdropFilter: 'blur(10px)', boxShadow: '0 8px 30px rgba(0,0,0,0.3)', minHeight: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {slides[slide].content}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
          {slide > 0 && <button onClick={handlePrev} style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', fontSize: '20px', fontWeight: 'bold', padding: '15px 40px', borderRadius: '50px', border: 'none', cursor: 'pointer' }}>⬅️ Previous</button>}
          {slide < slides.length-1
            ? <button onClick={handleNext} style={{ backgroundColor: '#FFD700', color: 'black', fontSize: '20px', fontWeight: 'bold', padding: '15px 40px', borderRadius: '50px', border: 'none', cursor: 'pointer', boxShadow: '0 0 20px rgba(255,215,0,0.5)' }}>Next ➡️</button>
            : <button onClick={() => navigate('/games/continents', { state: { name } })} style={{ backgroundColor: '#4ECDC4', color: 'white', fontSize: '20px', fontWeight: 'bold', padding: '15px 40px', borderRadius: '50px', border: 'none', cursor: 'pointer' }}>🎮 Play Game!</button>}
        </div>
      </div>
      <style>{`@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }`}</style>
    </div>
  )
}
export default ContinentsLesson