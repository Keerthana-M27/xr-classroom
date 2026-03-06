import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import * as THREE from 'three'

function MountainsLesson({ name }) {
  const navigate = useNavigate()
  const [slide, setSlide] = useState(0)
  const [mascotText, setMascotText] = useState('Hi! I am Globey! Tap me! 😄')
  const [mascotBounce, setMascotBounce] = useState(false)
  const mountRef = useRef(null)

  const slides = [
    {
      content: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '80px', marginBottom: '20px' }}>🏔️</div>
          <h2 style={{ fontSize: '30px', color: '#FFD700' }}>Mountains are very tall landforms!</h2>
          <p style={{ fontSize: '22px', color: '#d8b4fe', marginTop: '10px' }}>They rise high above the ground! ⛰️</p>
        </div>
      )
    },
    {
      content: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '80px', marginBottom: '10px' }}>🏔️</div>
          <h2 style={{ fontSize: '28px', color: '#FFD700' }}>Mount Everest is the TALLEST mountain!</h2>
          <div style={{ fontSize: '40px', marginTop: '10px' }}>🇳🇵</div>
          <p style={{ fontSize: '20px', color: '#d8b4fe', marginTop: '10px' }}>It is in Nepal and China! 8,849 meters tall! 🌟</p>
        </div>
      )
    },
    {
      content: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '80px', marginBottom: '10px' }}>🇮🇳</div>
          <h2 style={{ fontSize: '28px', color: '#FFD700' }}>The Himalayas are in India!</h2>
          <div style={{ fontSize: '60px', marginTop: '10px' }}>🏔️🏔️🏔️</div>
          <p style={{ fontSize: '20px', color: '#d8b4fe', marginTop: '10px' }}>The biggest mountain range in India! 🌟</p>
        </div>
      )
    },
    {
      content: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '80px', marginBottom: '10px' }}>❄️</div>
          <h2 style={{ fontSize: '28px', color: '#FFD700' }}>Mountain tops are always snowy!</h2>
          <div style={{ fontSize: '60px', marginTop: '10px' }}>🏔️❄️🌨️</div>
          <p style={{ fontSize: '20px', color: '#d8b4fe', marginTop: '10px' }}>Very tall mountains are always covered in snow! ⛄</p>
        </div>
      )
    },
    {
      content: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '80px', marginBottom: '10px' }}>🦅</div>
          <h2 style={{ fontSize: '28px', color: '#FFD700' }}>Animals that live in mountains!</h2>
          <div style={{ fontSize: '60px', marginTop: '10px' }}>🦅🐆🐑</div>
          <p style={{ fontSize: '20px', color: '#d8b4fe', marginTop: '10px' }}>Eagles, Snow Leopards and Mountain Goats! 🌟</p>
        </div>
      )
    },
    {
      content: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '100px', marginBottom: '20px' }}>🏆</div>
          <h2 style={{ fontSize: '35px', color: '#FFD700' }}>Amazing! You learned Mountains!</h2>
          <p style={{ fontSize: '22px', color: '#d8b4fe', marginTop: '10px' }}>Now lets play a fun game! 🎮</p>
        </div>
      )
    },
  ]

  const mascotTexts = [
    'Hi! I am Globey! Tap me! 😄',
    'Everest is the highest! 🏔️',
    'Himalayas are in India! 🇮🇳',
    'Brrr! Mountains are cold! ❄️',
    'Eagles fly so high! 🦅',
    'You know Mountains now! 🌟',
  ]

  useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    mountRef.current.appendChild(renderer.domElement)

    const objects = []

    // Mountain peaks using cones
    for (let i = 0; i < 10; i++) {
      const height = Math.random() * 4 + 2
      const geometry = new THREE.ConeGeometry(Math.random() * 1.5 + 0.5, height, 8)
      const material = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? 0x95A5A6 : 0xBDC3C7,
        roughness: 0.9
      })
      const cone = new THREE.Mesh(geometry, material)
      cone.position.set(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10 - 5
      )
      cone.userData = { originalY: cone.position.y }
      scene.add(cone)
      objects.push(cone)

      // Snow cap
      const snowGeometry = new THREE.ConeGeometry(Math.random() * 0.5 + 0.2, height * 0.3, 8)
      const snowMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.5 })
      const snow = new THREE.Mesh(snowGeometry, snowMaterial)
      snow.position.set(cone.position.x, cone.position.y + height * 0.4, cone.position.z)
      scene.add(snow)
      objects.push(snow)
    }

    // Floating snowflakes
    for (let i = 0; i < 20; i++) {
      const geometry = new THREE.SphereGeometry(0.1, 8, 8)
      const material = new THREE.MeshStandardMaterial({ color: 0xFFFFFF })
      const snow = new THREE.Mesh(geometry, material)
      snow.position.set(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10 - 5
      )
      snow.userData = { speedY: Math.random() * 0.05 + 0.01, originalY: snow.position.y }
      scene.add(snow)
      objects.push(snow)
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
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
        if (obj.userData.speedY) {
          obj.position.y -= obj.userData.speedY
          if (obj.position.y < -15) obj.position.y = 15
        }
        obj.rotation.y += 0.005
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
      background: 'linear-gradient(to bottom, #2C3E50, #3498DB, #85C1E9)',
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

        {/* Top bar */}
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
            🏔️ Mountains — Slide {slide + 1} of {slides.length}
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

        {/* Main area */}
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>

          {/* Mascot */}
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
              🌍
            </div>
            <p style={{ color: '#d8b4fe', fontSize: '12px', marginTop: '5px' }}>Tap me! 👆</p>
          </div>

          {/* Slide content */}
          <div style={{
            flex: 1,
            backgroundColor: 'rgba(255,255,255,0.15)',
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

        {/* Navigation */}
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
              onClick={() => navigate('/games/mountains', { state: { name } })}
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

export default MountainsLesson