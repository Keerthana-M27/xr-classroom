import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import * as THREE from 'three'

function SculptureLesson({ name }) {
  const navigate = useNavigate()
  const [slide, setSlide] = useState(0)
  const [mascotText, setMascotText] = useState('Hi! I am Arty! Tap me! 😄')
  const [mascotBounce, setMascotBounce] = useState(false)
  const mountRef = useRef(null)

  const slides = [
    {
      content: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '80px', marginBottom: '20px' }}>🗿</div>
          <h2 style={{ fontSize: '30px', color: '#FFD700' }}>Sculpture is making 3D art!</h2>
          <p style={{ fontSize: '22px', color: '#d8b4fe', marginTop: '10px' }}>We use clay, mud and other materials! 🧱</p>
        </div>
      )
    },
    {
      content: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '80px', marginBottom: '10px' }}>🏺</div>
          <h2 style={{ fontSize: '28px', color: '#FFD700' }}>People made sculptures thousands of years ago!</h2>
          <div style={{ fontSize: '50px', marginTop: '10px' }}>🏛️🗿🏺</div>
          <p style={{ fontSize: '22px', color: '#d8b4fe', marginTop: '10px' }}>Ancient people made amazing sculptures! 🌟</p>
        </div>
      )
    },
    {
      content: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '80px', marginBottom: '10px' }}>🧱</div>
          <h2 style={{ fontSize: '28px', color: '#FFD700' }}>We use clay to make sculptures!</h2>
          <div style={{ fontSize: '50px', marginTop: '10px' }}>🐘🐱🐸</div>
          <p style={{ fontSize: '22px', color: '#d8b4fe', marginTop: '10px' }}>We can make animals pots and figures with clay! 🌟</p>
        </div>
      )
    },
    {
      content: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '80px', marginBottom: '10px' }}>☀️</div>
          <h2 style={{ fontSize: '28px', color: '#FFD700' }}>Dry clay in the sun!</h2>
          <div style={{ fontSize: '50px', marginTop: '10px' }}>🧱➡️☀️➡️🏺</div>
          <p style={{ fontSize: '22px', color: '#d8b4fe', marginTop: '10px' }}>Clay sculptures dry in the sun to become hard! 🌟</p>
        </div>
      )
    },
    {
      content: (
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '28px', color: '#FFD700', marginBottom: '20px' }}>Famous Sculptures!</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', fontSize: '60px' }}>
            <div>
              <div>🗽</div>
              <p style={{ fontSize: '16px', color: '#d8b4fe' }}>Statue of Liberty</p>
            </div>
            <div>
              <div>🗿</div>
              <p style={{ fontSize: '16px', color: '#d8b4fe' }}>The Sphinx</p>
            </div>
            <div>
              <div>🏛️</div>
              <p style={{ fontSize: '16px', color: '#d8b4fe' }}>Greek Statues</p>
            </div>
          </div>
        </div>
      )
    },
    {
      content: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '100px', marginBottom: '20px' }}>🏆</div>
          <h2 style={{ fontSize: '35px', color: '#FFD700' }}>Amazing! You learned Sculpture!</h2>
          <p style={{ fontSize: '22px', color: '#d8b4fe', marginTop: '10px' }}>Now lets play a fun game! 🎮</p>
        </div>
      )
    },
  ]

  const mascotTexts = [
    'Hi! I am Arty! Tap me! 😄',
    'Ancient art is so cool! 🏺',
    'Clay is so fun to use! 🧱',
    'Sun dries the clay! ☀️',
    'Famous sculptures are amazing! 🗽',
    'You are a Sculpture Star! 🗿',
  ]

  useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    mountRef.current.appendChild(renderer.domElement)

    const objects = []
    const colors = [0xC8A882, 0xB8860B, 0xD2691E, 0xA0522D, 0x8B4513]

    // Floating clay like shapes
    for (let i = 0; i < 10; i++) {
      const geometry = new THREE.SphereGeometry(Math.random() * 1.5 + 0.5, 8, 8)
      const material = new THREE.MeshStandardMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        roughness: 0.9
      })
      const clay = new THREE.Mesh(geometry, material)
      clay.position.set(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10 - 5
      )
      clay.userData = { originalY: clay.position.y }
      scene.add(clay)
      objects.push(clay)
    }

    // Floating 3D sculpture shapes
    for (let i = 0; i < 10; i++) {
      let geometry
      const rand = i % 4
      if (rand === 0) geometry = new THREE.TorusGeometry(0.8, 0.3, 16, 100)
      else if (rand === 1) geometry = new THREE.OctahedronGeometry(Math.random() * 1 + 0.5)
      else if (rand === 2) geometry = new THREE.DodecahedronGeometry(Math.random() * 1 + 0.5)
      else geometry = new THREE.IcosahedronGeometry(Math.random() * 1 + 0.5)

      const material = new THREE.MeshStandardMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        roughness: 0.7
      })
      const shape = new THREE.Mesh(geometry, material)
      shape.position.set(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10 - 5
      )
      shape.userData = { originalY: shape.position.y, speedR: Math.random() * 0.02 }
      scene.add(shape)
      objects.push(shape)
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
      objects.forEach((obj, i) => {
        obj.position.y = obj.userData.originalY + Math.sin(time + i) * 0.8
        obj.rotation.x += 0.01
        obj.rotation.y += obj.userData.speedR || 0.01
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
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #2C1810, #4A2C17, #6B3A2A)',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div ref={mountRef} style={{
        position: 'fixed', top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0, pointerEvents: 'none'
      }} />

      <div style={{ position: 'relative', zIndex: 1, padding: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <button
            onClick={() => navigate('/student', { state: { name } })}
            style={{
              backgroundColor: 'transparent',
              color: '#FFD700',
              fontSize: '18px',
              border: '2px solid #FFD700',
              padding: '10px 20px',
              borderRadius: '50px',
              cursor: 'pointer'
            }}
          >
            ⬅️ Back
          </button>
          <h2 style={{ color: '#FFD700', fontSize: '22px' }}>
            🗿 Sculpture — Slide {slide + 1} of {slides.length}
          </h2>
          <div style={{ display: 'flex', gap: '8px' }}>
            {slides.map((_, i) => (
              <div key={i} style={{
                width: '12px', height: '12px',
                borderRadius: '50%',
                backgroundColor: i === slide ? '#FFD700' : 'rgba(255,255,255,0.3)'
              }} />
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '150px' }}>
            <div style={{
              backgroundColor: 'white',
              color: 'black',
              padding: '12px 16px',
              borderRadius: '15px',
              fontSize: '14px',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '10px',
              position: 'relative',
              maxWidth: '140px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
            }}>
              {mascotText}
              <div style={{
                position: 'absolute',
                bottom: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0, height: 0,
                borderLeft: '10px solid transparent',
                borderRight: '10px solid transparent',
                borderTop: '10px solid white'
              }} />
            </div>
            <div
              onClick={handleMascotClick}
              style={{
                fontSize: '80px',
                cursor: 'pointer',
                transform: mascotBounce ? 'scale(1.3)' : 'scale(1)',
                transition: 'transform 0.2s',
                userSelect: 'none'
              }}
            >
              🎨
            </div>
            <p style={{ color: '#d8b4fe', fontSize: '12px', marginTop: '5px' }}>Tap me! 👆</p>
          </div>

          <div style={{
            flex: 1,
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: '30px',
            padding: '40px',
            textAlign: 'center',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
            minHeight: '350px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {slides[slide].content}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
          {slide > 0 && (
            <button onClick={handlePrev} style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              color: 'white',
              fontSize: '20px',
              fontWeight: 'bold',
              padding: '15px 40px',
              borderRadius: '50px',
              border: 'none',
              cursor: 'pointer'
            }}>
              ⬅️ Previous
            </button>
          )}
          {slide < slides.length - 1 ? (
            <button onClick={handleNext} style={{
              backgroundColor: '#FFD700',
              color: 'black',
              fontSize: '20px',
              fontWeight: 'bold',
              padding: '15px 40px',
              borderRadius: '50px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 0 20px rgba(255,215,0,0.5)'
            }}>
              Next ➡️
            </button>
          ) : (
            <button
              onClick={() => navigate('/games/sculpture', { state: { name } })}
              style={{
                backgroundColor: '#4ECDC4',
                color: 'white',
                fontSize: '20px',
                fontWeight: 'bold',
                padding: '15px 40px',
                borderRadius: '50px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 0 20px rgba(78,205,196,0.5)'
              }}
            >
              🎮 Play Game!
            </button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
      `}</style>
    </div>
  )
}

export default SculptureLesson