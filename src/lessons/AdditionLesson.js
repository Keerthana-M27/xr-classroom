import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import * as THREE from 'three'

function AdditionLesson({ name }) {
  const navigate = useNavigate()
  const [slide, setSlide] = useState(0)
  const [mascotText, setMascotText] = useState('Hi! I am Numero! Tap me! 🔢')
  const [mascotBounce, setMascotBounce] = useState(false)
  const [dragItems, setDragItems] = useState(['🍎','🍎','🍎','🍎','🍎'])
  const [dropZone, setDropZone] = useState([])
  const [dragResult, setDragResult] = useState(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [emojiBurst, setEmojiBurst] = useState([])
  const [showFunFact, setShowFunFact] = useState(false)
  const [stars, setStars] = useState(0)
  const [slideScore, setSlideScore] = useState(0)
  const [showSlideScore, setShowSlideScore] = useState(false)
  const [glowSlide, setGlowSlide] = useState(false)
  const [startTime] = useState(Date.now())
  const mountRef = useRef(null)

  const funFacts = [
    '➕ The + symbol was first used in 1489!',
    '🍎 Farmers count apples by adding groups!',
    '🎯 Drag all 5 apples to win!',
    '⭐ Stars in the sky are counted by adding!',
    '0️⃣ Zero was invented in India!',
    '🏆 You are a Math Champion!',
  ]

  const playSound = (type) => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)()
      if (type === 'click') {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.frequency.setValueAtTime(520, ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(780, ctx.currentTime + 0.1)
        gain.gain.setValueAtTime(0.3, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3)
        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + 0.3)
      } else if (type === 'correct') {
        [520, 660, 780, 880].forEach((freq, i) => {
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.connect(gain)
          gain.connect(ctx.destination)
          osc.frequency.value = freq
          gain.gain.setValueAtTime(0.3, ctx.currentTime + i * 0.1)
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 0.3)
          osc.start(ctx.currentTime + i * 0.1)
          osc.stop(ctx.currentTime + i * 0.1 + 0.3)
        })
      } else if (type === 'slide') {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.frequency.setValueAtTime(440, ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.2)
        gain.gain.setValueAtTime(0.2, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3)
        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + 0.3)
      } else if (type === 'pop') {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.frequency.setValueAtTime(800, ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.1)
        gain.gain.setValueAtTime(0.4, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2)
        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + 0.2)
      }
    } catch (e) {}
  }

  const mascotTexts = [
    'Hi! I am Numero! Tap me! 🔢',
    '2 plus 3 equals 5! 🍎',
    'Drag the apples to add! 🍎',
    '4 plus 2 equals 6! ⭐',
    'Zero changes nothing! 0️⃣',
    'You are a Math Star! 🏆',
  ]

  const slides = [
    {
      content: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '80px', marginBottom: '20px', animation: 'flyInLeft 0.6s ease-out' }}>➕</div>
          <h2 style={{ fontSize: '28px', color: '#FFD700', animation: 'flyInRight 0.6s ease-out' }}>
            Addition means putting things together!
          </h2>
          <p style={{ fontSize: '20px', color: '#d8b4fe', marginTop: '10px', animation: 'flyInUp 0.8s ease-out' }}>
            When we add we get a bigger number! 🌟
          </p>
          <div style={{ fontSize: '45px', marginTop: '20px', animation: 'flyInUp 1s ease-out' }}>
            🍎 + 🍎 = 🍎🍎
          </div>
        </div>
      )
    },
    {
      content: (
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '26px', color: '#FFD700', marginBottom: '20px', animation: 'flyInLeft 0.5s ease-out' }}>
            2 + 3 = 5 🍎
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {['🍎','🍎'].map((a, i) => (
              <div key={i} style={{ fontSize: '45px', animation: `flyInLeft ${0.3 + i * 0.15}s ease-out` }}>{a}</div>
            ))}
            <div style={{ fontSize: '35px', color: '#FFD700', animation: 'flyInUp 0.6s ease-out' }}>➕</div>
            {['🍎','🍎','🍎'].map((a, i) => (
              <div key={i} style={{ fontSize: '45px', animation: `flyInRight ${0.3 + i * 0.15}s ease-out` }}>{a}</div>
            ))}
            <div style={{ fontSize: '35px', color: '#FFD700', animation: 'flyInUp 0.8s ease-out' }}>= 5️⃣</div>
          </div>
          <p style={{ fontSize: '18px', color: '#d8b4fe', marginTop: '15px', animation: 'flyInUp 1s ease-out' }}>
            2 apples + 3 apples = 5 apples!
          </p>
        </div>
      )
    },
    { dragDrop: true },
    {
      content: (
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '26px', color: '#FFD700', marginBottom: '15px', animation: 'flyInLeft 0.5s ease-out' }}>
            Adding with STARS! ⭐
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {['⭐','⭐','⭐','⭐'].map((s, i) => (
              <div key={i} style={{ fontSize: '40px', animation: `flyInLeft ${0.2 + i * 0.1}s ease-out` }}>{s}</div>
            ))}
            <div style={{ fontSize: '30px', color: '#FFD700' }}>➕</div>
            {['⭐','⭐'].map((s, i) => (
              <div key={i} style={{ fontSize: '40px', animation: `flyInRight ${0.2 + i * 0.1}s ease-out` }}>{s}</div>
            ))}
          </div>
          <h2 style={{ fontSize: '32px', color: '#FFD700', marginTop: '15px', animation: 'flyInUp 0.8s ease-out' }}>
            4 + 2 = 6 ⭐
          </h2>
        </div>
      )
    },
    {
      content: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '65px', marginBottom: '15px', animation: 'flyInLeft 0.5s ease-out' }}>0️⃣</div>
          <h2 style={{ fontSize: '26px', color: '#FFD700', animation: 'flyInRight 0.5s ease-out' }}>Adding ZERO!</h2>
          <div style={{ fontSize: '38px', marginTop: '15px', animation: 'flyInUp 0.7s ease-out' }}>
            🍎🍎🍎 + 0️⃣ = 🍎🍎🍎
          </div>
          <p style={{ fontSize: '20px', color: '#d8b4fe', marginTop: '10px', animation: 'flyInUp 0.9s ease-out' }}>
            Adding zero never changes the number! 🌟
          </p>
          <div style={{ fontSize: '32px', marginTop: '10px', animation: 'flyInUp 1.1s ease-out' }}>3 + 0 = 3</div>
        </div>
      )
    },
    {
      content: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '90px', marginBottom: '10px', animation: 'flyInUp 0.5s ease-out' }}>🏆</div>
          <h2 style={{ fontSize: '28px', color: '#FFD700', animation: 'flyInLeft 0.6s ease-out' }}>
            Amazing! You learned Addition!
          </h2>
          {/* Star rating */}
          <div style={{ fontSize: '45px', marginTop: '10px', animation: 'flyInUp 0.7s ease-out' }}>
            {Array(stars).fill('⭐').join('')}{Array(3 - stars).fill('🌑').join('')}
          </div>
          <p style={{ fontSize: '18px', color: '#4ECDC4', marginTop: '5px', animation: 'flyInUp 0.8s ease-out' }}>
            {stars === 3 ? 'Perfect Score! 🎊' : stars === 2 ? 'Great Job! 🎉' : 'Good Try! 💪'}
          </p>
          <p style={{ fontSize: '18px', color: '#d8b4fe', marginTop: '8px', animation: 'flyInRight 0.9s ease-out' }}>
            You scored {slideScore} lesson points! Now lets play! 🎮
          </p>
          <div style={{ fontSize: '35px', marginTop: '10px', animation: 'flyInUp 1s ease-out' }}>
            🎉🎊🎉🎊🎉
          </div>
        </div>
      )
    },
  ]

  useEffect(() => {
    if (slide === 2) {
      setDragItems(['🍎','🍎','🍎','🍎','🍎'])
      setDropZone([])
      setDragResult(null)
    }
    // Add score for each slide visited
    setSlideScore(prev => prev + 5)
    setShowSlideScore(true)
    setTimeout(() => setShowSlideScore(false), 1200)

    // Calculate stars on last slide
    if (slide === slides.length - 1) {
      const elapsed = (Date.now() - startTime) / 1000
      if (elapsed < 60) setStars(3)
      else if (elapsed < 120) setStars(2)
      else setStars(1)
    }

    // Glow effect
    setGlowSlide(true)
    setTimeout(() => setGlowSlide(false), 600)

    // Show fun fact
    setShowFunFact(true)
    setTimeout(() => setShowFunFact(false), 2500)

    playSound('slide')
  }, [slide])

  useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    if (mountRef.current) mountRef.current.appendChild(renderer.domElement)

    const objects = []
    const colors = [0xFF6B6B, 0xFF8E8E, 0x228B22, 0xFFD700, 0xFF4500]

    for (let i = 0; i < 20; i++) {
      const geometry = new THREE.SphereGeometry(Math.random() * 0.8 + 0.3, 32, 32)
      const material = new THREE.MeshStandardMaterial({ color: colors[Math.floor(Math.random() * colors.length)], roughness: 0.5 })
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set((Math.random() - 0.5) * 40, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 10 - 5)
      mesh.userData = { originalY: mesh.position.y }
      scene.add(mesh)
      objects.push(mesh)
    }

    for (let i = 0; i < 10; i++) {
      const geometry = new THREE.TorusGeometry(0.5, 0.2, 16, 100)
      const material = new THREE.MeshStandardMaterial({ color: 0xFFD700, roughness: 0.3 })
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set((Math.random() - 0.5) * 40, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 10 - 5)
      mesh.userData = { originalY: mesh.position.y }
      scene.add(mesh)
      objects.push(mesh)
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)
    const pointLight = new THREE.PointLight(0xffffff, 1)
    pointLight.position.set(10, 10, 10)
    scene.add(pointLight)
    camera.position.z = 30

    let time = 0
    let animId
    const animate = () => {
      animId = requestAnimationFrame(animate)
      time += 0.01
      objects.forEach((obj, i) => {
        obj.position.y = obj.userData.originalY + Math.sin(time + i) * 1.2
        obj.rotation.x += 0.01
        obj.rotation.y += 0.01
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
      cancelAnimationFrame(animId)
      if (mountRef.current && renderer.domElement) mountRef.current.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  const handleMascotClick = () => {
    setMascotBounce(true)
    setMascotText(mascotTexts[slide])
    playSound('pop')

    // Emoji burst effect
    const burst = Array(10).fill(0).map((_, i) => ({
      id: Date.now() + i,
      emoji: ['⭐','🍎','✨','💥','🎉'][Math.floor(Math.random() * 5)],
      x: Math.random() * 120 - 60,
      y: Math.random() * -120 - 20,
      rotate: Math.random() * 360
    }))
    setEmojiBurst(burst)
    setTimeout(() => setEmojiBurst([]), 800)
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

  const handleDrag = (e, idx) => {
    e.dataTransfer.setData('idx', idx)
    playSound('click')
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const idx = parseInt(e.dataTransfer.getData('idx'))
    if (isNaN(idx)) return
    const item = dragItems[idx]
    const newDrop = [...dropZone, item]
    const newDrag = dragItems.filter((_, i) => i !== idx)
    setDropZone(newDrop)
    setDragItems(newDrag)
    playSound('click')
    if (newDrop.length === 5) {
      setDragResult('correct')
      setShowConfetti(true)
      playSound('correct')
      setMascotText('Perfect! 5 apples! You did it! 🎉')
      setSlideScore(prev => prev + 20)
      setTimeout(() => setShowConfetti(false), 3000)
    }
  }

  const handleDragOver = (e) => e.preventDefault()

  const resetDrag = () => {
    setDragItems(['🍎','🍎','🍎','🍎','🍎'])
    setDropZone([])
    setDragResult(null)
    playSound('click')
  }

  const confettiItems = Array(40).fill(0).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 1.5,
    emoji: ['🎉','⭐','🍎','✨','🎊','💥','🌟'][Math.floor(Math.random() * 7)]
  }))

  const progressPercent = ((slide + 1) / slides.length) * 100

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #1a0533, #2d1b4e, #1a0533)',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }} />

      {/* Confetti */}
      {showConfetti && confettiItems.map(c => (
        <div key={c.id} style={{
          position: 'fixed', left: `${c.left}%`, top: '-20px',
          fontSize: '25px', zIndex: 999,
          animation: `confettiFall 2s ease-in forwards`,
          animationDelay: `${c.delay}s`, pointerEvents: 'none'
        }}>{c.emoji}</div>
      ))}

      {/* Slide score popup */}
      {showSlideScore && slide > 0 && (
        <div style={{
          position: 'fixed', top: '80px', right: '30px',
          backgroundColor: '#FFD700', color: 'black',
          fontSize: '22px', fontWeight: 'bold',
          padding: '10px 20px', borderRadius: '50px',
          zIndex: 999, animation: 'scorePopup 1.2s ease-out forwards',
          boxShadow: '0 0 20px rgba(255,215,0,0.8)'
        }}>
          +5 ⭐
        </div>
      )}

      {/* Fun fact banner */}
      {showFunFact && (
        <div style={{
          position: 'fixed', bottom: '100px', left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(78,205,196,0.95)',
          color: 'white', fontSize: '16px', fontWeight: 'bold',
          padding: '12px 25px', borderRadius: '50px',
          zIndex: 999, animation: 'factSlideUp 2.5s ease-out forwards',
          boxShadow: '0 0 20px rgba(78,205,196,0.6)',
          whiteSpace: 'nowrap'
        }}>
          💡 {funFacts[slide]}
        </div>
      )}

      <div style={{ position: 'relative', zIndex: 1, padding: '15px 20px' }}>

        {/* Progress bar */}
        <div style={{
          width: '100%', height: '8px',
          backgroundColor: 'rgba(255,255,255,0.2)',
          borderRadius: '10px', marginBottom: '12px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${progressPercent}%`, height: '100%',
            background: 'linear-gradient(to right, #FFD700, #FF6B6B)',
            borderRadius: '10px',
            transition: 'width 0.5s ease',
            boxShadow: '0 0 10px rgba(255,215,0,0.6)'
          }} />
        </div>

        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <button
            onClick={() => { playSound('click'); navigate('/student', { state: { name } }) }}
            style={{ backgroundColor: 'transparent', color: '#FFD700', fontSize: '15px', border: '2px solid #FFD700', padding: '7px 15px', borderRadius: '50px', cursor: 'pointer' }}
          >
            ⬅️ Back
          </button>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ color: '#FFD700', fontSize: '18px', margin: 0 }}>➕ Addition</h2>
            <p style={{ color: '#d8b4fe', fontSize: '13px', margin: 0 }}>Slide {slide + 1} of {slides.length}</p>
          </div>
          <div style={{
            backgroundColor: 'rgba(255,215,0,0.2)',
            border: '2px solid #FFD700',
            borderRadius: '50px',
            padding: '5px 15px',
            fontSize: '16px',
            color: '#FFD700',
            fontWeight: 'bold'
          }}>
            ⭐ {slideScore}
          </div>
        </div>

        {/* Dot indicators */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '12px' }}>
          {slides.map((_, i) => (
            <div key={i} style={{
              width: i === slide ? '28px' : '10px',
              height: '10px',
              borderRadius: '10px',
              backgroundColor: i === slide ? '#FFD700' : i < slide ? '#4ECDC4' : 'rgba(255,255,255,0.3)',
              transition: 'all 0.4s',
              boxShadow: i === slide ? '0 0 8px rgba(255,215,0,0.8)' : 'none'
            }} />
          ))}
        </div>

        {/* Main area */}
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>

          {/* Mascot */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '140px', position: 'relative' }}>

            {/* Emoji burst */}
            {emojiBurst.map(b => (
              <div key={b.id} style={{
                position: 'absolute',
                fontSize: '22px',
                pointerEvents: 'none',
                animation: 'burst 0.8s ease-out forwards',
                transform: `translate(${b.x}px, ${b.y}px) rotate(${b.rotate}deg)`,
                zIndex: 10
              }}>{b.emoji}</div>
            ))}

            <div style={{
              backgroundColor: 'white', color: 'black', padding: '10px 14px',
              borderRadius: '15px', fontSize: '12px', fontWeight: 'bold',
              textAlign: 'center', marginBottom: '10px', maxWidth: '130px',
              position: 'relative', boxShadow: '0 4px 15px rgba(255,215,0,0.4)',
              border: '2px solid rgba(255,215,0,0.5)',
              animation: 'flyInLeft 0.5s ease-out'
            }}>
              {mascotText}
              <div style={{
                position: 'absolute', bottom: '-10px', left: '50%',
                transform: 'translateX(-50%)', width: 0, height: 0,
                borderLeft: '10px solid transparent', borderRight: '10px solid transparent',
                borderTop: '10px solid white'
              }} />
            </div>
            <div
              onClick={handleMascotClick}
              style={{
                fontSize: '72px', cursor: 'pointer',
                transform: mascotBounce ? 'scale(1.5) rotate(15deg)' : 'scale(1)',
                transition: 'transform 0.2s',
                userSelect: 'none',
                filter: 'drop-shadow(0 0 20px rgba(255,215,0,0.8))',
                animation: 'mascotFloat 2s ease-in-out infinite'
              }}
            >
              🔢
            </div>
            <p style={{ color: '#d8b4fe', fontSize: '11px', marginTop: '4px' }}>Tap me! 👆</p>
          </div>

          {/* Slide content */}
          <div style={{
            flex: 1,
            backgroundColor: 'rgba(255,255,255,0.08)',
            borderRadius: '25px',
            padding: '28px',
            textAlign: 'center',
            backdropFilter: 'blur(20px)',
            boxShadow: glowSlide
              ? '0 0 40px rgba(255,215,0,0.5), 0 8px 30px rgba(0,0,0,0.4)'
              : '0 8px 30px rgba(0,0,0,0.4)',
            minHeight: '300px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: glowSlide ? '1px solid rgba(255,215,0,0.5)' : '1px solid rgba(255,255,255,0.1)',
            transition: 'box-shadow 0.5s, border 0.5s',
            animation: 'slideIn 0.4s ease-out'
          }}>
            {slides[slide].dragDrop ? (
              <div style={{ width: '100%' }}>
                <h2 style={{ fontSize: '20px', color: '#FFD700', marginBottom: '5px', animation: 'flyInLeft 0.4s ease-out' }}>
                  🎯 Drag and Drop Challenge!
                </h2>
                <p style={{ color: '#d8b4fe', fontSize: '15px', marginBottom: '15px', animation: 'flyInRight 0.5s ease-out' }}>
                  Drag all 5 🍎 into the basket to show 2 + 3 = 5!
                </p>

                {/* Score bar for drag */}
                <div style={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '10px', height: '8px',
                  marginBottom: '15px', overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${(dropZone.length / 5) * 100}%`,
                    height: '100%',
                    background: 'linear-gradient(to right, #FFD700, #22c55e)',
                    borderRadius: '10px',
                    transition: 'width 0.4s ease'
                  }} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '15px', flexWrap: 'wrap' }}>
                  {dragItems.map((item, i) => (
                    <div
                      key={i}
                      draggable
                      onDragStart={(e) => handleDrag(e, i)}
                      style={{
                        fontSize: '42px', cursor: 'grab',
                        animation: `flyInLeft ${0.2 + i * 0.1}s ease-out`,
                        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                        transition: 'transform 0.2s', userSelect: 'none'
                      }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.3) rotate(10deg)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      {item}
                    </div>
                  ))}
                  {dragItems.length === 0 && (
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '16px' }}>All dragged! 🎉</p>
                  )}
                </div>

                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  style={{
                    minHeight: '85px',
                    border: `3px dashed ${dragResult === 'correct' ? '#22c55e' : '#FFD700'}`,
                    borderRadius: '20px',
                    padding: '12px',
                    backgroundColor: dragResult === 'correct' ? 'rgba(34,197,94,0.15)' : 'rgba(255,215,0,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    flexWrap: 'wrap',
                    transition: 'all 0.3s',
                    animation: 'flyInUp 0.6s ease-out',
                    boxShadow: dragResult === 'correct' ? '0 0 20px rgba(34,197,94,0.4)' : 'none'
                  }}
                >
                  {dropZone.length === 0 && (
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '16px' }}>🧺 Drop apples here!</p>
                  )}
                  {dropZone.map((item, i) => (
                    <div key={i} style={{ fontSize: '38px', animation: 'popIn 0.3s ease-out' }}>{item}</div>
                  ))}
                </div>

                {dragResult === 'correct' && (
                  <div style={{ marginTop: '12px', fontSize: '20px', color: '#22c55e', animation: 'flyInUp 0.4s ease-out', fontWeight: 'bold' }}>
                    🎉 AMAZING! 2 + 3 = 5 apples! +20 points! ⭐
                  </div>
                )}
                {dropZone.length > 0 && dragResult !== 'correct' && (
                  <button onClick={resetDrag} style={{
                    marginTop: '10px', backgroundColor: 'rgba(255,255,255,0.15)',
                    color: 'white', fontSize: '14px', border: '2px solid rgba(255,255,255,0.3)',
                    padding: '7px 18px', borderRadius: '30px', cursor: 'pointer'
                  }}>
                    🔄 Reset
                  </button>
                )}
              </div>
            ) : (
              slides[slide].content
            )}
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '18px' }}>
          {slide > 0 && (
            <button onClick={handlePrev} style={{
              backgroundColor: 'rgba(255,255,255,0.12)',
              color: 'white', fontSize: '17px', fontWeight: 'bold',
              padding: '11px 28px', borderRadius: '50px',
              border: '2px solid rgba(255,255,255,0.3)', cursor: 'pointer',
              transition: 'all 0.2s'
            }}>
              ⬅️ Previous
            </button>
          )}
          {slide < slides.length - 1 ? (
            <button onClick={handleNext} style={{
              backgroundColor: '#FFD700', color: 'black',
              fontSize: '17px', fontWeight: 'bold',
              padding: '11px 35px', borderRadius: '50px',
              border: 'none', cursor: 'pointer',
              boxShadow: '0 0 25px rgba(255,215,0,0.7)',
              animation: 'pulse 2s infinite',
              transition: 'all 0.2s'
            }}>
              Next ➡️
            </button>
          ) : (
            <button
              onClick={() => { playSound('correct'); navigate('/games/addition', { state: { name } }) }}
              style={{
                backgroundColor: '#4ECDC4', color: 'white',
                fontSize: '17px', fontWeight: 'bold',
                padding: '11px 35px', borderRadius: '50px',
                border: 'none', cursor: 'pointer',
                boxShadow: '0 0 25px rgba(78,205,196,0.7)',
                animation: 'pulse 2s infinite'
              }}
            >
              🎮 Play Game!
            </button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes flyInLeft {
          from { opacity: 0; transform: translateX(-80px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes flyInRight {
          from { opacity: 0; transform: translateX(80px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes flyInUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: scale(0.93); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes popIn {
          0% { transform: scale(0) rotate(-20deg); }
          70% { transform: scale(1.2) rotate(5deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        @keyframes confettiFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
        @keyframes mascotFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 25px rgba(255,215,0,0.7); }
          50% { transform: scale(1.06); box-shadow: 0 0 40px rgba(255,215,0,1); }
        }
        @keyframes scorePopup {
          0% { opacity: 0; transform: translateY(20px) scale(0.8); }
          30% { opacity: 1; transform: translateY(0) scale(1.1); }
          70% { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-30px) scale(0.9); }
        }
        @keyframes factSlideUp {
          0% { opacity: 0; transform: translateX(-50%) translateY(30px); }
          20% { opacity: 1; transform: translateX(-50%) translateY(0); }
          80% { opacity: 1; transform: translateX(-50%) translateY(0); }
          100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
        }
        @keyframes burst {
          0% { opacity: 1; transform: translate(0,0) scale(1); }
          100% { opacity: 0; transform: translate(var(--tx, 60px), var(--ty, -80px)) scale(0); }
        }
      `}</style>
    </div>
  )
}

export default AdditionLesson