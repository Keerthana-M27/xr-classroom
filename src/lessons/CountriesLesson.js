import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import * as THREE from 'three'

function CountriesLesson({ name }) {
  const navigate = useNavigate()
  const [slide, setSlide] = useState(0)
  const [mascotText, setMascotText] = useState('Hi! I am Globey! Tap me! 😄')
  const [mascotBounce, setMascotBounce] = useState(false)
  const mountRef = useRef(null)

  const slides = [
    {
      content: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '80px', marginBottom: '20px' }}>🗺️</div>
          <h2 style={{ fontSize: '30px', color: '#FFD700' }}>The world is divided into Countries!</h2>
          <p style={{ fontSize: '22px', color: '#d8b4fe', marginTop: '10px' }}>People live in different countries all over the world! 🌍</p>
        </div>
      )
    },
    {
      content: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '80px', marginBottom: '10px' }}>🌍</div>
          <h2 style={{ fontSize: '28px', color: '#FFD700' }}>There are 195 countries in the world!</h2>
          <div style={{ fontSize: '40px', marginTop: '10px' }}>🇮🇳 🇺🇸 🇬🇧 🇯🇵 🇧🇷</div>
          <p style={{ fontSize: '20px', color: '#d8b4fe', marginTop: '10px' }}>Each country is unique and special! 🌟</p>
        </div>
      )
    },
    {
      content: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '80px', marginBottom: '10px' }}>🇮🇳</div>
          <h2 style={{ fontSize: '28px', color: '#FFD700' }}>India is our country!</h2>
          <div style={{ fontSize: '40px', marginTop: '10px' }}>🏏 🎊 🍛 🕌</div>
          <p style={{ fontSize: '20px', color: '#d8b4fe', marginTop: '10px' }}>India is the 7th largest country in the world! 🌟</p>
        </div>
      )
    },
    {
      content: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '80px', marginBottom: '10px' }}>🏆</div>
          <h2 style={{ fontSize: '28px', color: '#FFD700' }}>Russia is the BIGGEST country!</h2>
          <div style={{ fontSize: '40px', marginTop: '10px' }}>🇷🇺</div>
          <p style={{ fontSize: '20px', color: '#d8b4fe', marginTop: '10px' }}>Russia is so big it covers 11 time zones! 😲</p>
        </div>
      )
    },
    {
      content: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '80px', marginBottom: '10px' }}>🎌</div>
          <h2 style={{ fontSize: '28px', color: '#FFD700' }}>Every country has a Flag!</h2>
          <div style={{ fontSize: '50px', marginTop: '10px' }}>🇮🇳 🇺🇸 🇫🇷 🇧🇷 🇨🇳</div>
          <p style={{ fontSize: '20px', color: '#d8b4fe', marginTop: '10px' }}>Flags show the identity of each country! 🌟</p>
        </div>
      )
    },
    {
      content: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '100px', marginBottom: '20px' }}>🏆</div>
          <h2 style={{ fontSize: '35px', color: '#FFD700' }}>Amazing! You learned Countries!</h2>
          <p style={{ fontSize: '22px', color: '#d8b4fe', marginTop: '10px' }}>Now lets play a fun game! 🎮</p>
        </div>
      )
    },
  ]

  const mascotTexts = [
    'Hi! I am Globey! Tap me! 😄',
    '195 countries! Wow! 🌍',
    'India is our home! 🇮🇳',
    'Russia is huge! 🏆',
    'Every flag is unique! 🎌',
    'You know Countries now! 🌟',
  ]

  useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    mountRef.current.appendChild(renderer.domElement)

    const objects = []

    // Big rotating globe
    const globeGeometry = new THREE.SphereGeometry(4, 32, 32)
    const globeMaterial = new THREE.MeshStandardMaterial({ color: 0x0984E3, roughness: 0.8 })
    const globe = new THREE.Mesh(globeGeometry, globeMaterial)
    globe.position.set(8, 0, -15)
    scene.add(globe)
    objects.push(globe)

    // Green patches on globe (continents)
    for (let i = 0; i < 8; i++) {
      const patchGeometry = new THREE.SphereGeometry(Math.random() * 0.8 + 0.3, 16, 16)
      const patchMaterial = new THREE.MeshStandardMaterial({ color: 0x2ECC71, roughness: 0.9 })
      const patch = new THREE.Mesh(patchGeometry, patchMaterial)
      const angle = Math.random() * Math.PI * 2
      const elevation = (Math.random() - 0.5) * Math.PI
      patch.position.set(
        8 + 4 * Math.cos(elevation) * Math.cos(angle),
        4 * Math.sin(elevation),
        -15 + 4 * Math.cos(elevation) * Math.sin(angle)
      )
      scene.add(patch)
    }

    // Floating flag colored cubes
    const flagColors = [0xFF9933, 0xFFFFFF, 0x138808, 0xFF0000, 0x0000FF, 0xFFD700]
    for (let i = 0; i < 15; i++) {
      const geometry = new THREE.BoxGeometry(1.5, 1, 0.1)
      const material = new THREE.MeshStandardMaterial({
        color: flagColors[Math.floor(Math.random() * flagColors.length)],
        roughness: 0.5
      })
      const flag = new THREE.Mesh(geometry, material)
      flag.position.set(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10 - 5
      )
      flag.userData = { originalY: flag.position.y, speedR: Math.random() * 0.02 }
      scene.add(flag)
      objects.push(flag)
    }

    // Stars
    const starsGeometry = new THREE.BufferGeometry()
    const positions = []
    for (let i = 0; i < 300; i++) {
      positions.push(
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 200
      )
    }
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.3 })
    const stars = new THREE.Points(starsGeometry, starsMaterial)
    scene.add(stars)

    // Lighting
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
      globe.rotation.y += 0.005
      objects.forEach((obj, i) => {
        if (obj.userData.originalY !== undefined) {
          obj.position.y = obj.userData.originalY + Math.sin(time + i) * 0.5
        }
        if (obj.userData.speedR) obj.rotation.y += obj.userData.speedR
        obj.rotation.x += 0.003
      })
      stars.rotation.y += 0.0003
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
            🗺️ Countries — Slide {slide + 1} of {slides.length}
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
              onClick={() => navigate('/games/countries', { state: { name } })}
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

export default CountriesLesson