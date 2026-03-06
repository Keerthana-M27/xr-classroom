import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import * as THREE from 'three'

function DivisionLesson({ name }) {
  const navigate = useNavigate()
  const [slide, setSlide] = useState(0)
  const [mascotText, setMascotText] = useState('Hi! I am Numero! Tap me! 😄')
  const [mascotBounce, setMascotBounce] = useState(false)
  const mountRef = useRef(null)

  const slides = [
    {
      content: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '60px', marginBottom: '20px' }}>➗</div>
          <h2 style={{ fontSize: '30px', color: '#FFD700' }}>Division means sharing equally!</h2>
          <p style={{ fontSize: '22px', color: '#d8b4fe', marginTop: '10px' }}>We split things into equal groups! 🤝</p>
        </div>
      )
    },
    {
      content: (
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '26px', color: '#FFD700', marginBottom: '15px' }}>Share 6 cookies between 2 friends!</h2>
          <div style={{ fontSize: '50px', marginBottom: '15px' }}>🍪🍪🍪🍪🍪🍪</div>
          <div style={{ fontSize: '35px', color: '#4ECDC4', marginBottom: '15px' }}>➗ 2 friends</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px' }}>
            <div>
              <div style={{ fontSize: '30px' }}>👦</div>
              <div style={{ fontSize: '45px' }}>🍪🍪🍪</div>
            </div>
            <div>
              <div style={{ fontSize: '30px' }}>👧</div>
              <div style={{ fontSize: '45px' }}>🍪🍪🍪</div>
            </div>
          </div>
          <div style={{ fontSize: '35px', color: '#FFD700', marginTop: '15px' }}>6 ÷ 2 = 3! 🎉</div>
        </div>
      )
    },
    {
      content: (
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '26px', color: '#FFD700', marginBottom: '15px' }}>Share 8 stars between 4 friends!</h2>
          <div style={{ fontSize: '50px', marginBottom: '15px' }}>⭐⭐⭐⭐⭐⭐⭐⭐</div>
          <div style={{ fontSize: '35px', color: '#4ECDC4', marginBottom: '15px' }}>➗ 4 friends</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            {['👦','👧','👦','👧'].map((e, i) => (
              <div key={i}>
                <div style={{ fontSize: '28px' }}>{e}</div>
                <div style={{ fontSize: '40px' }}>⭐⭐</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: '35px', color: '#FFD700', marginTop: '15px' }}>8 ÷ 4 = 2! 🎉</div>
        </div>
      )
    },
    {
      content: (
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '28px', color: '#FFD700', marginBottom: '20px' }}>Special Rules! 🌟</h2>
          <div style={{ fontSize: '22px', color: 'white', lineHeight: '2.2' }}>
            <div>Any number ÷ <span style={{ color: '#FFD700' }}>1</span> = <span style={{ color: '#4ECDC4' }}>same number!</span></div>
            <div>Any number ÷ <span style={{ color: '#FFD700' }}>itself</span> = <span style={{ color: '#FF6B6B' }}>1</span></div>
            <div style={{ marginTop: '10px', fontSize: '20px' }}>
              <div>10 ÷ 1 = 10 &nbsp; 😄</div>
              <div>5 ÷ 5 = 1 &nbsp; 😄</div>
            </div>
          </div>
        </div>
      )
    },
    {
      content: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '100px', marginBottom: '20px' }}>🏆</div>
          <h2 style={{ fontSize: '35px', color: '#FFD700' }}>Amazing! You learned Division!</h2>
          <p style={{ fontSize: '22px', color: '#d8b4fe', marginTop: '10px' }}>Now lets play a fun game! 🎮</p>
        </div>
      )
    },
  ]

  const mascotTexts = [
    'Division is sharing! 🤝',
    'Share the cookies equally! 🍪',
    'Give each friend 2 stars! ⭐',
    'Remember the special rules! 🌟',
    'You are a Math Champion! 🏆',
  ]

  useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    mountRef.current.appendChild(renderer.domElement)

    const objects = []
    const colors = [0x96CEB4, 0x4ECDC4, 0xFFD700, 0xFF6B6B, 0x45B7D1]

    // Pizza slice shapes (flat wedges) to show division/sharing
    for (let i = 0; i < 12; i++) {
      const geometry = new THREE.CylinderGeometry(0, Math.random() * 0.8 + 0.5, 0.2, 3)
      const material = new THREE.MeshStandardMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        roughness: 0.5
      })
      const slice = new THREE.Mesh(geometry, material)
      slice.position.set(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10 - 5
      )
      slice.userData = { originalY: slice.position.y, phase: Math.random() * Math.PI * 2 }
      scene.add(slice)
      objects.push(slice)
    }

    // Divide symbols (flat rings)
    for (let i = 0; i < 8; i++) {
      const geometry = new THREE.TorusGeometry(0.5, 0.12, 16, 100)
      const material = new THREE.MeshStandardMaterial({ color: 0x96CEB4, roughness: 0.4 })
      const ring = new THREE.Mesh(geometry, material)
      ring.position.set(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10 - 5
      )
      ring.userData = { originalY: ring.position.y, phase: Math.random() * Math.PI * 2, speedR: 0.015 }
      scene.add(ring)
      objects.push(ring)
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)
    const pointLight = new THREE.PointLight(0xffffff, 1)
    pointLight.position.set(10, 10, 10)
    scene.add(pointLight)

    camera.position.z = 30
    let time = 0

    const animate = () => {
      requestAnimationFrame(animate)
      time += 0.01
      objects.forEach((obj) => {
        obj.position.y = obj.userData.originalY + Math.sin(time + obj.userData.phase) * 1.2
        obj.rotation.x += 0.008
        obj.rotation.y += 0.01
        if (obj.userData.speedR) obj.rotation.z += obj.userData.speedR
      })
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  const handleMascotClick = () => {
    setMascotBounce(true)
    setMascotText(mascotTexts[slide])
    setTimeout(() => setMascotBounce(false), 500)
  }

  const handleNext = () => {
    if (slide < slides.length - 1) {
      setSlide(slide + 1)
      setMascotText(mascotTexts[slide + 1])
    }
  }

  const handlePrev = () => {
    if (slide > 0) {
      setSlide(slide - 1)
      setMascotText(mascotTexts[slide - 1])
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #0f0c29, #302b63, #24243e)', color: 'white', fontFamily: 'Arial, sans-serif', position: 'relative', overflow: 'hidden' }}>
      <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, padding: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <button onClick={() => navigate('/student', { state: { name } })}
            style={{ backgroundColor: 'transparent', color: '#FFD700', fontSize: '18px', border: '2px solid #FFD700', padding: '10px 20px', borderRadius: '50px', cursor: 'pointer' }}>
            ⬅️ Back
          </button>
          <h2 style={{ color: '#FFD700', fontSize: '22px' }}>➗ Division — Slide {slide + 1} of {slides.length}</h2>
          <div style={{ display: 'flex', gap: '8px' }}>
            {slides.map((_, i) => (
              <div key={i} style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: i === slide ? '#FFD700' : 'rgba(255,255,255,0.3)' }} />
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '150px' }}>
            <div style={{ backgroundColor: 'white', color: 'black', padding: '12px 16px', borderRadius: '15px', fontSize: '14px', fontWeight: 'bold', textAlign: 'center', marginBottom: '10px', position: 'relative', maxWidth: '140px', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
              {mascotText}
              <div style={{ position: 'absolute', bottom: '-10px', left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderTop: '10px solid white' }} />
            </div>
            <div onClick={handleMascotClick} style={{ fontSize: '80px', cursor: 'pointer', transform: mascotBounce ? 'scale(1.3)' : 'scale(1)', transition: 'transform 0.2s', userSelect: 'none', animation: mascotBounce ? 'none' : 'bounce 1s infinite' }}>🔢</div>
            <p style={{ color: '#d8b4fe', fontSize: '12px', marginTop: '5px' }}>Tap me! 👆</p>
          </div>

          <div style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '30px', padding: '40px', textAlign: 'center', backdropFilter: 'blur(10px)', boxShadow: '0 8px 30px rgba(0,0,0,0.3)', minHeight: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {slides[slide].content}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
          {slide > 0 && (
            <button onClick={handlePrev} style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', fontSize: '20px', fontWeight: 'bold', padding: '15px 40px', borderRadius: '50px', border: 'none', cursor: 'pointer' }}>
              ⬅️ Previous
            </button>
          )}
          {slide < slides.length - 1 ? (
            <button onClick={handleNext} style={{ backgroundColor: '#FFD700', color: 'black', fontSize: '20px', fontWeight: 'bold', padding: '15px 40px', borderRadius: '50px', border: 'none', cursor: 'pointer', boxShadow: '0 0 20px rgba(255,215,0,0.5)' }}>
              Next ➡️
            </button>
          ) : (
            <button onClick={() => navigate('/games/division', { state: { name } })} style={{ backgroundColor: '#4ECDC4', color: 'white', fontSize: '20px', fontWeight: 'bold', padding: '15px 40px', borderRadius: '50px', border: 'none', cursor: 'pointer', boxShadow: '0 0 20px rgba(78,205,196,0.5)' }}>
              🎮 Play Game!
            </button>
          )}
        </div>
      </div>

      <style>{`@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }`}</style>
    </div>
  )
}

export default DivisionLesson