import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import * as THREE from 'three'

function SubtractionLesson({ name }) {
  const navigate = useNavigate()
  const [slide, setSlide] = useState(0)
  const [mascotText, setMascotText] = useState('Hi! I am Numero! Tap me! 😄')
  const [mascotBounce, setMascotBounce] = useState(false)
  const mountRef = useRef(null)

  const slides = [
    {
      title: 'What is Subtraction?',
      content: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '60px', marginBottom: '20px' }}>➖</div>
          <h2 style={{ fontSize: '30px', color: '#FFD700' }}>Subtraction means taking away!</h2>
        </div>
      )
    },
    {
      title: '5 - 2 = ?',
      content: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '60px', marginBottom: '10px' }}>🍎🍎🍎🍎🍎</div>
          <div style={{ fontSize: '40px', color: '#FFD700', marginBottom: '10px' }}>Take away ➖</div>
          <div style={{ fontSize: '60px', marginBottom: '10px' }}>🍎🍎</div>
          <div style={{ fontSize: '50px', color: '#FFD700', marginBottom: '10px' }}>=</div>
          <div style={{ fontSize: '60px' }}>🍎🍎🍎</div>
          <h2 style={{ fontSize: '35px', color: '#FFD700', marginTop: '10px' }}>5 - 2 = 3! 🎉</h2>
        </div>
      )
    },
    {
      title: '8 - 3 = ?',
      content: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '55px', marginBottom: '10px' }}>🌟🌟🌟🌟🌟🌟🌟🌟</div>
          <div style={{ fontSize: '40px', color: '#4ECDC4', marginBottom: '10px' }}>Take away ➖</div>
          <div style={{ fontSize: '55px', marginBottom: '10px' }}>🌟🌟🌟</div>
          <div style={{ fontSize: '50px', color: '#FFD700', marginBottom: '10px' }}>=</div>
          <div style={{ fontSize: '55px' }}>🌟🌟🌟🌟🌟</div>
          <h2 style={{ fontSize: '35px', color: '#FFD700', marginTop: '10px' }}>8 - 3 = 5! 🎉</h2>
        </div>
      )
    },
    {
      title: '0 is Special!',
      content: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '60px', marginBottom: '10px' }}>🍊🍊🍊🍊</div>
          <div style={{ fontSize: '50px', color: '#FFD700', marginBottom: '10px' }}>➖ 0️⃣</div>
          <div style={{ fontSize: '50px', color: '#FFD700', marginBottom: '10px' }}>=</div>
          <div style={{ fontSize: '60px' }}>🍊🍊🍊🍊</div>
          <h2 style={{ fontSize: '32px', color: '#FFD700', marginTop: '10px' }}>4 - 0 = 4! Taking 0 changes nothing! 😄</h2>
        </div>
      )
    },
    {
      title: 'You are ready!',
      content: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '100px', marginBottom: '20px' }}>🏆</div>
          <h2 style={{ fontSize: '35px', color: '#FFD700' }}>Amazing! You learned Subtraction!</h2>
          <p style={{ fontSize: '22px', color: '#d8b4fe', marginTop: '10px' }}>Now lets play a fun game! 🎮</p>
        </div>
      )
    },
  ]

  const mascotTexts = [
    'Hi! I am Numero! Tap me! 😄',
    'Count what is left! 🍎',
    'Take away the stars! 🌟',
    'Zero takes nothing away! 🤗',
    'You are a Math Star! ⭐',
  ]

  useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    mountRef.current.appendChild(renderer.domElement)

    const objects = []

    // Floating balloons (spheres) that pop/disappear feel
    for (let i = 0; i < 18; i++) {
      const geometry = new THREE.SphereGeometry(Math.random() * 0.7 + 0.3, 32, 32)
      const colors = [0x4ECDC4, 0xFF6B6B, 0xFFD700, 0x96CEB4, 0xDDA0DD]
      const material = new THREE.MeshStandardMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        roughness: 0.4
      })
      const balloon = new THREE.Mesh(geometry, material)
      balloon.position.set(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10 - 5
      )
      balloon.userData = { originalY: balloon.position.y, phase: Math.random() * Math.PI * 2 }
      scene.add(balloon)
      objects.push(balloon)

      // Balloon string (thin cylinder)
      const stringGeo = new THREE.CylinderGeometry(0.02, 0.02, 1.5, 8)
      const stringMat = new THREE.MeshStandardMaterial({ color: 0xffffff })
      const string = new THREE.Mesh(stringGeo, stringMat)
      string.position.set(balloon.position.x, balloon.position.y - 1, balloon.position.z)
      scene.add(string)
    }

    // Minus signs (flat boxes)
    for (let i = 0; i < 6; i++) {
      const geometry = new THREE.BoxGeometry(1.5, 0.3, 0.1)
      const material = new THREE.MeshStandardMaterial({ color: 0xFF6B6B })
      const minus = new THREE.Mesh(geometry, material)
      minus.position.set(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10 - 5
      )
      minus.userData = { speedR: Math.random() * 0.02, originalY: minus.position.y, phase: Math.random() * Math.PI * 2 }
      scene.add(minus)
      objects.push(minus)
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
        if (obj.userData.originalY !== undefined) {
          obj.position.y = obj.userData.originalY + Math.sin(time + (obj.userData.phase || i)) * 1.2
        }
        obj.rotation.y += 0.008
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
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #0f0c29, #302b63, #24243e)',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, padding: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <button onClick={() => navigate('/student', { state: { name } })}
            style={{ backgroundColor: 'transparent', color: '#FFD700', fontSize: '18px', border: '2px solid #FFD700', padding: '10px 20px', borderRadius: '50px', cursor: 'pointer' }}>
            ⬅️ Back
          </button>
          <h2 style={{ color: '#FFD700', fontSize: '22px' }}>➖ Subtraction — Slide {slide + 1} of {slides.length}</h2>
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
            <button onClick={() => navigate('/games/subtraction', { state: { name } })} style={{ backgroundColor: '#4ECDC4', color: 'white', fontSize: '20px', fontWeight: 'bold', padding: '15px 40px', borderRadius: '50px', border: 'none', cursor: 'pointer', boxShadow: '0 0 20px rgba(78,205,196,0.5)' }}>
              🎮 Play Game!
            </button>
          )}
        </div>
      </div>

      <style>{`@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }`}</style>
    </div>
  )
}

export default SubtractionLesson