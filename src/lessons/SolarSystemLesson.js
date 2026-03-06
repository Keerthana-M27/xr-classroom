import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import * as THREE from 'three'

function SolarSystemLesson({ name }) {
  const navigate = useNavigate()
  const [slide, setSlide] = useState(0)
  const [mascotText, setMascotText] = useState('Hi! I am Cosmo! Tap me! 🚀')
  const [mascotBounce, setMascotBounce] = useState(false)
  const mountRef = useRef(null)

  const slides = [
    {
      content: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '60px', marginBottom: '20px' }}>☀️</div>
          <h2 style={{ fontSize: '30px', color: '#FFD700' }}>Our Solar System!</h2>
          <p style={{ fontSize: '22px', color: '#d8b4fe', marginTop: '10px' }}>The Sun and 8 planets that go around it! 🪐</p>
        </div>
      )
    },
    {
      content: (
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '26px', color: '#FFD700', marginBottom: '15px' }}>The 8 Planets in Order!</h2>
          <div style={{ fontSize: '20px', lineHeight: '2', color: 'white' }}>
            <div>1. ☿ Mercury — closest to Sun!</div>
            <div>2. ♀️ Venus — hottest planet!</div>
            <div>3. 🌍 Earth — our home!</div>
            <div>4. 🔴 Mars — the Red Planet!</div>
          </div>
        </div>
      )
    },
    {
      content: (
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '26px', color: '#FFD700', marginBottom: '15px' }}>More Planets!</h2>
          <div style={{ fontSize: '20px', lineHeight: '2', color: 'white' }}>
            <div>5. 🪐 Jupiter — BIGGEST planet!</div>
            <div>6. 💍 Saturn — has beautiful rings!</div>
            <div>7. 🔵 Uranus — spins sideways!</div>
            <div>8. 🌀 Neptune — farthest from Sun!</div>
          </div>
        </div>
      )
    },
    {
      content: (
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '26px', color: '#FFD700', marginBottom: '20px' }}>Fun Facts! 🌟</h2>
          <div style={{ fontSize: '20px', lineHeight: '2.2', color: 'white' }}>
            <div>☀️ The Sun is a giant star!</div>
            <div>🌍 Only Earth has life on it!</div>
            <div>🪐 Jupiter is the biggest planet!</div>
            <div>🌙 Moon goes around Earth!</div>
          </div>
        </div>
      )
    },
    {
      content: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '100px', marginBottom: '20px' }}>🏆</div>
          <h2 style={{ fontSize: '35px', color: '#FFD700' }}>You know the Solar System!</h2>
          <p style={{ fontSize: '22px', color: '#d8b4fe', marginTop: '10px' }}>Now lets play a fun game! 🎮</p>
        </div>
      )
    },
  ]

  const mascotTexts = [
    'Hi! I am Cosmo! Tap me! 🚀',
    'My Very Educated Mother Just Served Us Nachos! 🪐',
    'Jupiter is the biggest! 🪐',
    'Only Earth has life! 🌍',
    'You are a Space Explorer! 🚀',
  ]

  useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    mountRef.current.appendChild(renderer.domElement)
    const objects = []

    // Sun
    const sunGeo = new THREE.SphereGeometry(2.5, 32, 32)
    const sunMat = new THREE.MeshStandardMaterial({ color: 0xFFD700, emissive: 0xFFAA00, emissiveIntensity: 0.6 })
    const sun = new THREE.Mesh(sunGeo, sunMat)
    sun.position.set(-12, 0, -10)
    scene.add(sun)
    objects.push(sun)

    // Planets
    const planetData = [
      { color: 0xAAAAAA, size: 0.3 }, { color: 0xFFAA44, size: 0.5 },
      { color: 0x4488FF, size: 0.55 }, { color: 0xFF4422, size: 0.4 },
      { color: 0xFFAA88, size: 1.2 }, { color: 0xFFDDAA, size: 1.0 },
      { color: 0x88DDFF, size: 0.7 }, { color: 0x4455FF, size: 0.65 },
    ]
    planetData.forEach((p, i) => {
      const geo = new THREE.SphereGeometry(p.size, 32, 32)
      const mat = new THREE.MeshStandardMaterial({ color: p.color, roughness: 0.7 })
      const planet = new THREE.Mesh(geo, mat)
      planet.position.set((Math.random() - 0.5) * 35, (Math.random() - 0.5) * 18, (Math.random() - 0.5) * 8 - 5)
      planet.userData = { originalY: planet.position.y, phase: i * 0.8 }
      scene.add(planet)
      objects.push(planet)
    })

    // Stars
    const starGeo = new THREE.BufferGeometry()
    const pos = []
    for (let i = 0; i < 600; i++) pos.push((Math.random()-0.5)*200, (Math.random()-0.5)*200, (Math.random()-0.5)*200)
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
    const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.4 }))
    scene.add(stars)

    scene.add(new THREE.AmbientLight(0xffffff, 0.5))
    const pl = new THREE.PointLight(0xFFAA00, 2)
    pl.position.set(-12, 0, -10)
    scene.add(pl)
    camera.position.z = 30
    let time = 0

    const animate = () => {
      requestAnimationFrame(animate)
      time += 0.01
      objects.forEach((obj, i) => {
        if (obj.userData.originalY !== undefined) obj.position.y = obj.userData.originalY + Math.sin(time + obj.userData.phase) * 1
        obj.rotation.y += 0.005
      })
      stars.rotation.y += 0.0003
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => { camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight) }
    window.addEventListener('resize', handleResize)
    return () => { window.removeEventListener('resize', handleResize); if (mountRef.current) mountRef.current.removeChild(renderer.domElement); renderer.dispose() }
  }, [])

  const handleMascotClick = () => { setMascotBounce(true); setMascotText(mascotTexts[slide]); setTimeout(() => setMascotBounce(false), 500) }
  const handleNext = () => { if (slide < slides.length - 1) { setSlide(slide + 1); setMascotText(mascotTexts[slide + 1]) } }
  const handlePrev = () => { if (slide > 0) { setSlide(slide - 1); setMascotText(mascotTexts[slide - 1]) } }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #0f0c29, #302b63, #24243e)', color: 'white', fontFamily: 'Arial, sans-serif', position: 'relative', overflow: 'hidden' }}>
      <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'relative', zIndex: 1, padding: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <button onClick={() => navigate('/student', { state: { name } })} style={{ backgroundColor: 'transparent', color: '#FFD700', fontSize: '18px', border: '2px solid #FFD700', padding: '10px 20px', borderRadius: '50px', cursor: 'pointer' }}>⬅️ Back</button>
          <h2 style={{ color: '#FFD700', fontSize: '22px' }}>🪐 Solar System — Slide {slide + 1} of {slides.length}</h2>
          <div style={{ display: 'flex', gap: '8px' }}>{slides.map((_, i) => <div key={i} style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: i === slide ? '#FFD700' : 'rgba(255,255,255,0.3)' }} />)}</div>
        </div>
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '150px' }}>
            <div style={{ backgroundColor: 'white', color: 'black', padding: '12px 16px', borderRadius: '15px', fontSize: '14px', fontWeight: 'bold', textAlign: 'center', marginBottom: '10px', position: 'relative', maxWidth: '140px', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
              {mascotText}
              <div style={{ position: 'absolute', bottom: '-10px', left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderTop: '10px solid white' }} />
            </div>
            <div onClick={handleMascotClick} style={{ fontSize: '80px', cursor: 'pointer', transform: mascotBounce ? 'scale(1.3)' : 'scale(1)', transition: 'transform 0.2s', userSelect: 'none', animation: mascotBounce ? 'none' : 'bounce 1s infinite' }}>🪐</div>
            <p style={{ color: '#d8b4fe', fontSize: '12px', marginTop: '5px' }}>Tap me! 👆</p>
          </div>
          <div style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '30px', padding: '40px', textAlign: 'center', backdropFilter: 'blur(10px)', boxShadow: '0 8px 30px rgba(0,0,0,0.3)', minHeight: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {slides[slide].content}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
          {slide > 0 && <button onClick={handlePrev} style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', fontSize: '20px', fontWeight: 'bold', padding: '15px 40px', borderRadius: '50px', border: 'none', cursor: 'pointer' }}>⬅️ Previous</button>}
          {slide < slides.length - 1
            ? <button onClick={handleNext} style={{ backgroundColor: '#FFD700', color: 'black', fontSize: '20px', fontWeight: 'bold', padding: '15px 40px', borderRadius: '50px', border: 'none', cursor: 'pointer', boxShadow: '0 0 20px rgba(255,215,0,0.5)' }}>Next ➡️</button>
            : <button onClick={() => navigate('/games/solarsystem', { state: { name } })} style={{ backgroundColor: '#4ECDC4', color: 'white', fontSize: '20px', fontWeight: 'bold', padding: '15px 40px', borderRadius: '50px', border: 'none', cursor: 'pointer' }}>🎮 Play Game!</button>}
        </div>
      </div>
      <style>{`@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }`}</style>
    </div>
  )
}
export default SolarSystemLesson