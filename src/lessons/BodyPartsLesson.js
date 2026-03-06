import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import * as THREE from 'three'

function BodyPartsLesson({ name }) {
  const navigate = useNavigate()
  const [slide, setSlide] = useState(0)
  const [mascotText, setMascotText] = useState('Hi! I am Broco! Tap me! 😄')
  const [mascotBounce, setMascotBounce] = useState(false)
  const mountRef = useRef(null)

  const slides = [
    {
      content: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '80px', marginBottom: '20px' }}>🧍</div>
          <h2 style={{ fontSize: '30px', color: '#FFD700' }}>Our body has amazing parts!</h2>
          <p style={{ fontSize: '22px', color: '#d8b4fe', marginTop: '10px' }}>All parts work together to keep us alive! 💪</p>
        </div>
      )
    },
    {
      content: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '80px', marginBottom: '10px' }}>🧠</div>
          <h2 style={{ fontSize: '28px', color: '#FFD700' }}>The Brain is our control center!</h2>
          <p style={{ fontSize: '22px', color: '#d8b4fe', marginTop: '10px' }}>The brain controls everything we think feel and do! 🌟</p>
          <div style={{ fontSize: '40px', marginTop: '10px' }}>🧠➡️💭➡️🏃</div>
        </div>
      )
    },
    {
      content: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '80px', marginBottom: '10px' }}>❤️</div>
          <h2 style={{ fontSize: '28px', color: '#FFD700' }}>The Heart pumps blood!</h2>
          <p style={{ fontSize: '22px', color: '#d8b4fe', marginTop: '10px' }}>Our heart beats 100,000 times every day! 🌟</p>
          <div style={{ fontSize: '40px', marginTop: '10px' }}>❤️💓❤️💓❤️</div>
        </div>
      )
    },
    {
      content: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '80px', marginBottom: '10px' }}>🫁</div>
          <h2 style={{ fontSize: '28px', color: '#FFD700' }}>The Lungs help us breathe!</h2>
          <p style={{ fontSize: '22px', color: '#d8b4fe', marginTop: '10px' }}>We breathe in oxygen and breathe out carbon dioxide! 🌟</p>
          <div style={{ fontSize: '40px', marginTop: '10px' }}>😮‍💨➡️🫁➡️💨</div>
        </div>
      )
    },
    {
      content: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '80px', marginBottom: '10px' }}>🦴</div>
          <h2 style={{ fontSize: '28px', color: '#FFD700' }}>We have 206 bones!</h2>
          <p style={{ fontSize: '22px', color: '#d8b4fe', marginTop: '10px' }}>Bones give our body shape and protect our organs! 🌟</p>
          <div style={{ fontSize: '40px', marginTop: '10px' }}>🦴🦷🦵🦶</div>
        </div>
      )
    },
    {
      content: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '100px', marginBottom: '20px' }}>🏆</div>
          <h2 style={{ fontSize: '35px', color: '#FFD700' }}>Amazing! You learned Body Parts!</h2>
          <p style={{ fontSize: '22px', color: '#d8b4fe', marginTop: '10px' }}>Now lets play a fun game! 🎮</p>
        </div>
      )
    },
  ]

  const mascotTexts = [
    'Hi! I am Broco! Tap me! 😄',
    'Brain controls everything! 🧠',
    'Heart beats all day! ❤️',
    'Lungs help us breathe! 🫁',
    'We have 206 bones! 🦴',
    'You know Body Parts now! 🌟',
  ]

  useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    mountRef.current.appendChild(renderer.domElement)

    const objects = []
    const colors = [0xFF6B6B, 0xFF8E8E, 0xFFB3B3, 0xFF4757, 0xEE5A24]

    // Floating hearts
    for (let i = 0; i < 15; i++) {
      const geometry = new THREE.SphereGeometry(Math.random() * 0.8 + 0.3, 32, 32)
      const material = new THREE.MeshStandardMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        roughness: 0.5
      })
      const heart = new THREE.Mesh(geometry, material)
      heart.position.set(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10 - 5
      )
      heart.userData = { originalY: heart.position.y }
      scene.add(heart)
      objects.push(heart)
    }

    // Floating bones (capsule like shapes)
    for (let i = 0; i < 10; i++) {
      const geometry = new THREE.CylinderGeometry(0.2, 0.2, Math.random() * 2 + 1, 8)
      const material = new THREE.MeshStandardMaterial({
        color: 0xF5F5F5,
        roughness: 0.8
      })
      const bone = new THREE.Mesh(geometry, material)
      bone.position.set(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10 - 5
      )
      bone.rotation.z = Math.random() * Math.PI
      bone.userData = { originalY: bone.position.y, speedR: Math.random() * 0.02 }
      scene.add(bone)
      objects.push(bone)
    }

    // Floating brain like shapes
    for (let i = 0; i < 5; i++) {
      const geometry = new THREE.IcosahedronGeometry(Math.random() * 0.8 + 0.5)
      const material = new THREE.MeshStandardMaterial({
        color: 0xFFC0CB,
        roughness: 0.9
      })
      const brain = new THREE.Mesh(geometry, material)
      brain.position.set(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10 - 5
      )
      brain.userData = { originalY: brain.position.y, speedR: Math.random() * 0.01 }
      scene.add(brain)
      objects.push(brain)
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
        obj.position.y = obj.userData.originalY + Math.sin(time + i) * 1
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
      background: 'linear-gradient(to bottom, #2D1B69, #11998E)',
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
            🧍 Body Parts — Slide {slide + 1} of {slides.length}
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
              🥦
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
              onClick={() => navigate('/games/bodyparts', { state: { name } })}
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

export default BodyPartsLesson