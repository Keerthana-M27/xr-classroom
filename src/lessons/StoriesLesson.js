import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const SCENES = [
  {
    id: 'intro',
    title: '📖 The Tortoise and the Hare',
    duration: 4000,
    narration: 'Once upon a time, in a magical sunny forest... a story of friendship and a big race!',
    sky: ['#87CEEB','#B8E4F7','#FFF9C4'],
    ground: '#2ECC40', groundDark: '#27AE60', timeOfDay: 'morning',
  },
  {
    id: 'meet', title: 'They Meet! 👋', duration: 4000,
    narration: 'One fine morning, the speedy Hare met the slow but steady Tortoise on the forest path...',
    sky: ['#87CEEB','#B8E4F7','#E0F7FA'], ground: '#2ECC40', groundDark: '#27AE60', timeOfDay: 'morning',
    showHare: true, showTortoise: true, harePos: 65, tortoisePos: 18,
    hareAction: 'stand', tortoiseAction: 'walk',
  },
  {
    id: 'challenge', title: '"Let\'s Race!" 🏁', duration: 4500,
    narration: '"Ha ha ha! You are SO slow, Tortoise!" laughed the Hare. "I challenge you to a race!"',
    sky: ['#87CEEB','#B8E4F7','#E0F7FA'], ground: '#2ECC40', groundDark: '#27AE60', timeOfDay: 'morning',
    showHare: true, showTortoise: true, harePos: 58, tortoisePos: 22,
    hareAction: 'laugh', tortoiseAction: 'stand',
    speechHare: '😂 I will WIN easily!', speechTortoise: '🙂 I accept!',
  },
  {
    id: 'racestart', title: 'The Race Begins! 🏃💨', duration: 5000,
    narration: 'GO! The Hare shot off like a rocket — zoom zoom zoom! Tortoise walked steadily...',
    sky: ['#FFE082','#FFB300','#FF8F00'], ground: '#27AE60', groundDark: '#1E8449', timeOfDay: 'afternoon',
    showHare: true, showTortoise: true, hareAction: 'run', tortoiseAction: 'walk', showFlag: true,
  },
  {
    id: 'haresleep', title: 'Hare Falls Asleep! 😴', duration: 5000,
    narration: '"I am SO far ahead! A little nap under this cozy tree won\'t hurt..." zzz zzz zzz',
    sky: ['#FF7043','#FF5722','#BF360C'], ground: '#27AE60', groundDark: '#1E8449', timeOfDay: 'evening',
    showHare: true, harePos: 52, hareAction: 'sleep', showTree: true, speechHare: '😴 zzz... zzz...',
  },
  {
    id: 'tortoisewalks', title: 'Tortoise Keeps Going! 💪', duration: 4500,
    narration: 'Slowly... slowly... the Tortoise walked past the sleeping Hare. Never giving up!',
    sky: ['#FF7043','#FF5722','#BF360C'], ground: '#27AE60', groundDark: '#1E8449', timeOfDay: 'evening',
    showHare: true, showTortoise: true, harePos: 52, hareAction: 'sleep',
    tortoiseAction: 'walk', speechTortoise: '💪 Slow and steady!', showTree: true,
  },
  {
    id: 'finish', title: '🐢 Tortoise WINS! 🏆', duration: 5500,
    narration: 'TORTOISE WINS! 🎉 The Hare woke up too late! Slow and steady wins the race!',
    sky: ['#CE93D8','#AB47BC','#7B1FA2'], ground: '#27AE60', groundDark: '#1E8449', timeOfDay: 'sunset',
    showHare: true, showTortoise: true, harePos: 25, tortoisePos: 72,
    hareAction: 'shocked', tortoiseAction: 'celebrate', showFlag: true, showTrophy: true,
    speechTortoise: '🏆 YES! I WON!', speechHare: '😱 HOW?!',
  },
  {
    id: 'lesson', title: '💡 The Big Lesson!', duration: 4000,
    narration: '"Slow and steady wins the race!" — Never give up. Hard work always beats laziness!',
    lessonSlide: true,
  },
]

function SpeechBubble({ text }) {
  return (
    <div style={{
      position: 'absolute', bottom: '110%', left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'white', color: '#222',
      padding: '8px 14px', borderRadius: '20px',
      fontSize: '13px', fontWeight: 'bold',
      whiteSpace: 'nowrap',
      boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
      border: '2px solid #FFD700', zIndex: 20,
      animation: 'bubblePop 0.4s cubic-bezier(0.175,0.885,0.32,1.275)'
    }}>
      {text}
      <div style={{
        position: 'absolute', bottom: '-12px', left: '50%',
        transform: 'translateX(-50%)',
        width: 0, height: 0,
        borderLeft: '10px solid transparent', borderRight: '10px solid transparent',
        borderTop: '12px solid #FFD700'
      }} />
      <div style={{
        position: 'absolute', bottom: '-9px', left: '50%',
        transform: 'translateX(-50%)',
        width: 0, height: 0,
        borderLeft: '8px solid transparent', borderRight: '8px solid transparent',
        borderTop: '10px solid white'
      }} />
    </div>
  )
}

function StoriesLesson({ name }) {
  const navigate = useNavigate()
  const [sceneIdx, setSceneIdx] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [progress, setProgress] = useState(0)
  const [hareX, setHareX] = useState(65)
  const [tortoiseX, setTortoiseX] = useState(15)
  const [cloudX, setCloudX] = useState([8, 35, 62, 85])
  const [tick, setTick] = useState(0)
  const timerRef = useRef(null)
  const progressRef = useRef(null)
  const animRef = useRef(null)

  const scene = SCENES[sceneIdx]

  const playSound = (type) => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)()
      if (type === 'next') {
        const osc = ctx.createOscillator(); const gain = ctx.createGain()
        osc.connect(gain); gain.connect(ctx.destination)
        osc.frequency.setValueAtTime(440, ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.15)
        gain.gain.setValueAtTime(0.15, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3)
        osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.3)
      } else if (type === 'win') {
        [523, 659, 784, 1047].forEach((freq, i) => {
          const osc = ctx.createOscillator(); const gain = ctx.createGain()
          osc.connect(gain); gain.connect(ctx.destination)
          osc.frequency.value = freq
          gain.gain.setValueAtTime(0.2, ctx.currentTime + i * 0.12)
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.35)
          osc.start(ctx.currentTime + i * 0.12); osc.stop(ctx.currentTime + i * 0.12 + 0.4)
        })
      }
    } catch (e) {}
  }

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 50)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setCloudX(p => p.map(x => x > 112 ? -18 : x + 0.04)), 50)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    clearInterval(animRef.current)
    const s = SCENES[sceneIdx]
    setHareX(s.harePos !== undefined ? s.harePos : 65)
    setTortoiseX(s.tortoisePos !== undefined ? s.tortoisePos : 12)
    if (s.hareAction === 'run') {
      setHareX(3)
      animRef.current = setInterval(() => setHareX(p => p >= 85 ? 3 : p + 0.35), 50)
    } else if (s.tortoiseAction === 'walk' && s.id !== 'meet') {
      animRef.current = setInterval(() => setTortoiseX(p => p >= 80 ? 3 : p + 0.1), 50)
    }
    return () => clearInterval(animRef.current)
  }, [sceneIdx])

  const goToScene = (idx) => {
    clearTimeout(timerRef.current); clearInterval(progressRef.current)
    setSceneIdx(idx); setProgress(0); playSound('next')
    if (idx === SCENES.length - 1) { setShowConfetti(true); playSound('win'); setTimeout(() => setShowConfetti(false), 5000) }
  }

  const startAutoPlay = () => {
    setIsPlaying(true)
    const run = (idx) => {
      if (idx >= SCENES.length) { setIsPlaying(false); return }
      goToScene(idx)
      if (idx === SCENES.length - 1) { setIsPlaying(false); return }
      let elapsed = 0; const dur = SCENES[idx].duration
      clearInterval(progressRef.current)
      progressRef.current = setInterval(() => { elapsed += 50; setProgress((elapsed / dur) * 100); if (elapsed >= dur) clearInterval(progressRef.current) }, 50)
      timerRef.current = setTimeout(() => run(idx + 1), dur)
    }
    run(sceneIdx)
  }

  const pauseAutoPlay = () => { setIsPlaying(false); clearTimeout(timerRef.current); clearInterval(progressRef.current) }

  useEffect(() => () => {
    clearTimeout(timerRef.current); clearInterval(progressRef.current); clearInterval(animRef.current)
  }, [])

  const t = tick * 0.1
  const getHareTransform = () => {
    if (scene.hareAction === 'run') return `translateY(${Math.abs(Math.sin(t * 6)) * -18}px)`
    if (scene.hareAction === 'sleep') return `translateY(${Math.sin(t * 0.4) * 3}px) rotate(${Math.sin(t * 0.3) * 4}deg)`
    if (scene.hareAction === 'laugh') return `translateY(${Math.sin(t * 5) * 6}px) rotate(${Math.sin(t * 5) * 8}deg)`
    if (scene.hareAction === 'shocked') return `translateY(${Math.sin(t * 8) * 5}px) scale(${1 + Math.abs(Math.sin(t * 8)) * 0.12})`
    return `translateY(${Math.sin(t) * 6}px)`
  }
  const getTortoiseTransform = () => {
    if (scene.tortoiseAction === 'walk') return `translateY(${Math.sin(t * 2.5) * 5}px) rotate(${Math.sin(t * 2.5) * 4}deg)`
    if (scene.tortoiseAction === 'celebrate') return `translateY(${Math.abs(Math.sin(t * 5)) * -20}px) rotate(${Math.sin(t * 5) * 20}deg) scale(${1 + Math.abs(Math.sin(t * 5)) * 0.25})`
    return `translateY(${Math.sin(t * 0.8) * 4}px)`
  }
  const getHareEmoji = () => ({ sleep: '😴', shocked: '😱', laugh: '😂' }[scene.hareAction] || '🐇')
  const getSkyGradient = () => scene.sky ? `linear-gradient(180deg, ${scene.sky[0]} 0%, ${scene.sky[1]} 50%, ${scene.sky[2] || scene.sky[1]} 100%)` : 'linear-gradient(180deg,#1a1a2e,#16213e)'

  const confetti = Array(60).fill(0).map((_, i) => ({
    id: i, left: Math.random() * 100, delay: Math.random() * 2.5,
    emoji: ['🎉','⭐','🐢','✨','🎊','🏆','🌟','🎈'][Math.floor(Math.random() * 8)],
    size: Math.random() * 10 + 16
  }))

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0015, #1a0533, #0d1b3e)',
      color: 'white', fontFamily: 'Arial, sans-serif',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden', position: 'relative'
    }}>

      {showConfetti && confetti.map(c => (
        <div key={c.id} style={{
          position: 'fixed', left: `${c.left}%`, top: '-40px',
          fontSize: `${c.size}px`, zIndex: 999, pointerEvents: 'none',
          animation: 'confettiFall 3.5s ease-in forwards',
          animationDelay: `${c.delay}s`
        }}>{c.emoji}</div>
      ))}

      {/* TOP BAR */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 20px', background: 'rgba(0,0,0,0.6)',
        borderBottom: '1px solid rgba(255,215,0,0.2)'
      }}>
        <button onClick={() => { pauseAutoPlay(); navigate('/student', { state: { name } }) }}
          style={{ background: 'transparent', color: '#FFD700', fontSize: '14px', border: '2px solid #FFD700', padding: '6px 16px', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold' }}>
          ⬅️ Back
        </button>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#FFD700', fontSize: '17px', fontWeight: 'bold' }}>📖 Stories Lesson</div>
          <div style={{ color: '#d8b4fe', fontSize: '12px' }}>Scene {sceneIdx + 1} of {SCENES.length}</div>
        </div>
        <button onClick={() => navigate('/games/stories', { state: { name } })}
          style={{ background: 'linear-gradient(135deg,#4ECDC4,#44A08D)', color: 'white', fontSize: '13px', fontWeight: 'bold', border: 'none', padding: '7px 16px', borderRadius: '50px', cursor: 'pointer' }}>
          🎮 Game
        </button>
      </div>

      {/* DOTS */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '7px', padding: '10px 0 4px' }}>
        {SCENES.map((_, i) => (
          <button key={i} onClick={() => { pauseAutoPlay(); goToScene(i) }}
            style={{
              width: i === sceneIdx ? '32px' : '11px', height: '11px',
              borderRadius: '11px', border: 'none', cursor: 'pointer', padding: 0,
              background: i === sceneIdx ? 'linear-gradient(90deg,#FFD700,#FF8C00)' : i < sceneIdx ? '#4ECDC4' : 'rgba(255,255,255,0.2)',
              transition: 'all 0.4s',
              boxShadow: i === sceneIdx ? '0 0 12px rgba(255,215,0,1)' : 'none'
            }} />
        ))}
      </div>

      {isPlaying && (
        <div style={{ height: '3px', background: 'rgba(255,255,255,0.1)', margin: '2px 20px' }}>
          <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg,#FFD700,#FF6B6B,#FF1493)', borderRadius: '3px', transition: 'width 0.05s linear' }} />
        </div>
      )}

      <div style={{ textAlign: 'center', padding: '6px 20px 4px' }}>
        <h1 style={{ fontSize: '22px', color: '#FFD700', margin: 0, textShadow: '0 0 30px rgba(255,215,0,0.7)' }}>{scene.title}</h1>
      </div>

      {/* SCENE BOX */}
      <div style={{
        margin: '6px 14px', borderRadius: '24px',
        border: '3px solid rgba(255,215,0,0.5)',
        boxShadow: '0 0 50px rgba(255,215,0,0.2)',
        height: '340px', position: 'relative', flexShrink: 0, overflow: 'hidden'
      }}>
        {scene.lessonSlide ? (
          <div style={{
            width: '100%', height: '100%',
            background: 'linear-gradient(135deg,#0a0015,#1a0533,#0d1b3e)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '20px',
            position: 'relative', overflow: 'hidden'
          }}>
            {Array(15).fill(0).map((_, i) => (
              <div key={i} style={{
                position: 'absolute',
                left: `${(i * 17 + 5) % 95}%`, top: `${(i * 23 + 8) % 85}%`,
                fontSize: `${10 + (i % 3) * 5}px`, opacity: 0.5,
                animation: `starTwinkle ${1 + (i % 3) * 0.5}s ease-in-out infinite alternate`
              }}>⭐</div>
            ))}
            <div style={{ fontSize: '70px', position: 'relative', zIndex: 1 }}>💡</div>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
              {[
                { emoji: '🐢', text: 'Be patient', sub: 'Good things take time', color: '#4ECDC4' },
                { emoji: '💪', text: 'Never give up', sub: 'Keep going always!', color: '#FFD700' },
                { emoji: '🏆', text: 'Hard work wins', sub: 'Effort beats talent!', color: '#FF6B6B' },
              ].map((item, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.08)', borderRadius: '20px', padding: '18px 22px',
                  textAlign: 'center', border: `2px solid ${item.color}`,
                  boxShadow: `0 0 20px ${item.color}40`, minWidth: '110px'
                }}>
                  <div style={{ fontSize: '45px' }}>{item.emoji}</div>
                  <p style={{ color: item.color, fontWeight: 'bold', fontSize: '15px', margin: '8px 0 2px' }}>{item.text}</p>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px', margin: 0 }}>{item.sub}</p>
                </div>
              ))}
            </div>
            <p style={{ color: '#FFD700', fontSize: '20px', fontWeight: 'bold', margin: 0, textShadow: '0 0 20px rgba(255,215,0,0.8)', position: 'relative', zIndex: 1 }}>
              ✨ "Slow and steady wins the race!" ✨
            </p>
          </div>
        ) : (
          <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>

            {/* SKY */}
            <div style={{ position: 'absolute', inset: 0, background: getSkyGradient() }} />

            {/* SUN */}
            <div style={{
              position: 'absolute', top: '10%', right: '7%', fontSize: '50px', zIndex: 2,
              filter: 'drop-shadow(0 0 20px rgba(255,235,59,1))',
              animation: 'sunPulse 4s ease-in-out infinite'
            }}>{scene.timeOfDay === 'sunset' ? '🌅' : '☀️'}</div>

            {/* CLOUDS */}
            {cloudX.map((x, i) => (
              <div key={i} style={{
                position: 'absolute', top: `${[7,16,4,12][i]}%`, left: `${x}%`,
                fontSize: `${[40,30,36,28][i]}px`, opacity: [0.9,0.7,0.85,0.6][i],
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))', zIndex: 2, pointerEvents: 'none'
              }}>☁️</div>
            ))}

            {/* MOUNTAINS */}
            <div style={{
              position: 'absolute', bottom: '28%', left: 0, right: 0, height: '120px', zIndex: 3,
              background: 'linear-gradient(180deg, transparent 0%, rgba(60,120,80,0.5) 100%)',
              clipPath: 'polygon(0% 100%, 5% 40%, 12% 70%, 20% 20%, 28% 60%, 38% 30%, 48% 65%, 55% 25%, 65% 55%, 72% 35%, 80% 60%, 88% 30%, 95% 55%, 100% 40%, 100% 100%)'
            }} />

            {/* GROUND */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%', zIndex: 4,
              background: `linear-gradient(180deg, ${scene.ground} 0%, ${scene.groundDark} 100%)`,
              borderTop: `4px solid ${scene.ground}`
            }} />

            {/* GRASS TEXTURE */}
            <div style={{
              position: 'absolute', bottom: '29%', left: 0, right: 0, height: '18px', zIndex: 5,
              background: 'repeating-linear-gradient(90deg,#3cb55a 0px,#3cb55a 12px,#2ECC40 12px,#2ECC40 24px)'
            }} />

            {/* RACE PATH */}
            <div style={{
              position: 'absolute', bottom: '35%', left: '5%', right: '5%', height: '8px', zIndex: 5,
              background: 'rgba(210,180,140,0.4)', borderRadius: '4px'
            }} />
            <div style={{
              position: 'absolute', bottom: '36%', left: '5%', right: '5%', height: '5px', zIndex: 5,
              background: 'repeating-linear-gradient(90deg,rgba(255,255,255,0.7) 0px,rgba(255,255,255,0.7) 22px,transparent 22px,transparent 44px)',
              borderRadius: '3px'
            }} />

            {/* TREES */}
            <div style={{ position: 'absolute', bottom: '28%', left: '0%', fontSize: '75px', zIndex: 6, filter: 'drop-shadow(4px 6px 8px rgba(0,0,0,0.4))' }}>🌳</div>
            <div style={{ position: 'absolute', bottom: '28%', right: '0%', fontSize: '65px', zIndex: 6, filter: 'drop-shadow(4px 6px 8px rgba(0,0,0,0.4))' }}>🌲</div>
            {scene.showTree && (
              <div style={{ position: 'absolute', bottom: '28%', left: '46%', fontSize: '75px', zIndex: 6, filter: 'drop-shadow(4px 6px 8px rgba(0,0,0,0.4))' }}>🌳</div>
            )}

            {/* FLOWERS */}
            {['10%','25%','42%','59%','76%'].map((left, i) => (
              <div key={i} style={{
                position: 'absolute', bottom: '28%', left, fontSize: '20px', zIndex: 6,
                animation: `flowerSway ${1.8 + i * 0.35}s ease-in-out infinite alternate`
              }}>{['🌸','🌼','🌺','🌸','🌼'][i]}</div>
            ))}

            {/* BUSHES */}
            {['18%','38%','55%','72%','88%'].map((left, i) => (
              <div key={i} style={{ position: 'absolute', bottom: '27.5%', left, fontSize: '24px', zIndex: 5, opacity: 0.8 }}>🌿</div>
            ))}

            {/* FLAG */}
            {(scene.showFlag || scene.showTrophy) && (
              <div style={{
                position: 'absolute', bottom: '28%', right: '6%', fontSize: '45px', zIndex: 7,
                animation: 'flagWave 0.5s ease-in-out infinite alternate',
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))'
              }}>🏁</div>
            )}

            {/* TROPHY */}
            {scene.showTrophy && (
              <div style={{
                position: 'absolute', bottom: '60%', right: '9%', fontSize: '50px', zIndex: 7,
                animation: 'trophyFloat 1.2s ease-in-out infinite',
                filter: 'drop-shadow(0 0 15px rgba(255,215,0,0.8))'
              }}>🏆</div>
            )}

            {/* INTRO */}
            {scene.id === 'intro' && (
              <>
                <div style={{
                  position: 'absolute', top: '28%', left: '50%', transform: 'translateX(-50%)',
                  fontSize: '24px', fontWeight: 'bold', color: 'white',
                  textShadow: '0 2px 10px rgba(0,0,0,1), 0 0 30px rgba(255,215,0,0.8)',
                  whiteSpace: 'nowrap', zIndex: 10, animation: 'titleGlow 2s ease-in-out infinite alternate'
                }}>✨ Once Upon a Time... ✨</div>
                <div style={{ position: 'absolute', bottom: '30%', left: '32%', fontSize: '44px', zIndex: 7, animation: 'butterflyFloat 3s ease-in-out infinite' }}>🦋</div>
                <div style={{ position: 'absolute', bottom: '32%', left: '58%', fontSize: '38px', zIndex: 7, animation: 'butterflyFloat 2.5s ease-in-out infinite reverse' }}>🦋</div>
                <div style={{ position: 'absolute', bottom: '28%', left: '40%', fontSize: '72px', zIndex: 7, animation: 'tortoiseBobA 2s ease-in-out infinite', filter: 'drop-shadow(3px 5px 8px rgba(0,0,0,0.5))' }}>🐢</div>
                <div style={{ position: 'absolute', bottom: '28%', left: '55%', fontSize: '72px', zIndex: 7, animation: 'hareBobA 1.5s ease-in-out infinite', filter: 'drop-shadow(3px 5px 8px rgba(0,0,0,0.5))' }}>🐇</div>
              </>
            )}

            {/* SPARKLES evening */}
            {(scene.id === 'haresleep' || scene.id === 'tortoisewalks') &&
              ['12%','28%','46%','64%','82%'].map((left, i) => (
                <div key={i} style={{
                  position: 'absolute', top: `${10 + (i % 3) * 12}%`, left, fontSize: '16px', zIndex: 3,
                  animation: `starTwinkle ${0.8 + i * 0.4}s ease-in-out infinite alternate`
                }}>✨</div>
              ))
            }

            {/* SPEED LINES */}
            {scene.hareAction === 'run' && (
              <div style={{ position: 'absolute', bottom: '40%', left: `${hareX - 6}%`, zIndex: 6 }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{
                    position: 'absolute', right: '100%', top: `${i * 14}px`,
                    width: `${35 + i * 12}px`, height: '3px',
                    background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.7))',
                    borderRadius: '2px', animation: `speedLine ${0.3 + i * 0.1}s ease-out infinite`
                  }} />
                ))}
              </div>
            )}

            {/* HARE */}
            {scene.showHare && (
              <div style={{
                position: 'absolute', bottom: '28%', left: `${hareX}%`, zIndex: 8,
                transition: scene.hareAction === 'run' ? 'none' : 'left 1s ease-in-out'
              }}>
                {scene.speechHare && <SpeechBubble text={scene.speechHare} />}
                <div style={{
                  fontSize: '70px', transform: getHareTransform(),
                  display: 'inline-block',
                  filter: 'drop-shadow(3px 6px 10px rgba(0,0,0,0.5))',
                  userSelect: 'none', transition: 'transform 0.05s linear'
                }}>{getHareEmoji()}</div>
              </div>
            )}

            {/* TORTOISE */}
            {scene.showTortoise && (
              <div style={{
                position: 'absolute', bottom: '28%', left: `${tortoiseX}%`, zIndex: 8,
                transition: scene.tortoiseAction === 'walk' ? 'none' : 'left 1s ease-in-out'
              }}>
                {scene.speechTortoise && <SpeechBubble text={scene.speechTortoise} />}
                <div style={{
                  fontSize: '70px', transform: getTortoiseTransform(),
                  display: 'inline-block',
                  filter: 'drop-shadow(3px 6px 10px rgba(0,0,0,0.5))',
                  userSelect: 'none', transition: 'transform 0.05s linear'
                }}>🐢</div>
              </div>
            )}

          </div>
        )}
      </div>

      {/* NARRATION */}
      <div style={{
        margin: '6px 14px',
        background: 'linear-gradient(135deg,rgba(0,0,0,0.7),rgba(30,10,60,0.8))',
        borderRadius: '16px', padding: '12px 20px',
        border: '1px solid rgba(255,215,0,0.25)'
      }}>
        <p style={{ color: 'white', fontSize: '15px', margin: 0, textAlign: 'center', fontStyle: 'italic', lineHeight: 1.5 }}>
          🎙️ {scene.narration}
        </p>
      </div>

      {/* CONTROLS */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', padding: '10px 20px 14px' }}>
        <button
          onClick={() => { pauseAutoPlay(); goToScene(Math.max(0, sceneIdx - 1)) }}
          disabled={sceneIdx === 0}
          style={{
            background: sceneIdx === 0 ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.12)',
            color: sceneIdx === 0 ? 'rgba(255,255,255,0.2)' : 'white',
            fontSize: '15px', fontWeight: 'bold', padding: '11px 22px',
            borderRadius: '50px', border: '2px solid rgba(255,255,255,0.15)',
            cursor: sceneIdx === 0 ? 'not-allowed' : 'pointer'
          }}>⬅️ Prev</button>

        <button
          onClick={() => isPlaying ? pauseAutoPlay() : startAutoPlay()}
          style={{
            background: isPlaying ? 'linear-gradient(135deg,#FF6B6B,#FF1744)' : 'linear-gradient(135deg,#FFD700,#FF8C00)',
            color: isPlaying ? 'white' : '#1a0533',
            fontSize: '16px', fontWeight: 'bold', padding: '11px 30px',
            borderRadius: '50px', border: 'none', cursor: 'pointer', minWidth: '160px',
            boxShadow: isPlaying ? '0 0 25px rgba(255,107,107,0.6)' : '0 0 30px rgba(255,215,0,0.7)',
            animation: 'pulse 2s infinite'
          }}>
          {isPlaying ? '⏸️ Pause' : sceneIdx === 0 ? '▶️ Play Story!' : '▶️ Continue'}
        </button>

        {sceneIdx < SCENES.length - 1 ? (
          <button
            onClick={() => { pauseAutoPlay(); goToScene(Math.min(SCENES.length - 1, sceneIdx + 1)) }}
            style={{
              background: 'rgba(255,255,255,0.12)', color: 'white',
              fontSize: '15px', fontWeight: 'bold', padding: '11px 22px',
              borderRadius: '50px', border: '2px solid rgba(255,255,255,0.15)', cursor: 'pointer'
            }}>Next ➡️</button>
        ) : (
          <button
            onClick={() => navigate('/games/stories', { state: { name } })}
            style={{
              background: 'linear-gradient(135deg,#4ECDC4,#1abc9c)',
              color: 'white', fontSize: '15px', fontWeight: 'bold',
              padding: '11px 22px', borderRadius: '50px', border: 'none', cursor: 'pointer',
              boxShadow: '0 0 25px rgba(78,205,196,0.7)', animation: 'pulse 1.5s infinite'
            }}>🎮 Play Game!</button>
        )}
      </div>

      <style>{`
        @keyframes sunPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.1)} }
        @keyframes flowerSway { from{transform:rotate(-14deg) translateY(0)} to{transform:rotate(14deg) translateY(-3px)} }
        @keyframes flagWave { from{transform:rotate(-10deg)} to{transform:rotate(10deg) scale(1.05)} }
        @keyframes trophyFloat { 0%,100%{transform:translateY(0) rotate(-8deg)} 50%{transform:translateY(-14px) rotate(8deg)} }
        @keyframes starTwinkle { from{opacity:0.2;transform:scale(0.7)} to{opacity:1;transform:scale(1.4)} }
        @keyframes butterflyFloat { 0%,100%{transform:translateY(0) rotate(-8deg)} 50%{transform:translateY(-25px) rotate(8deg)} }
        @keyframes hareBobA { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes tortoiseBobA { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes titleGlow { from{text-shadow:0 2px 10px rgba(0,0,0,1),0 0 20px rgba(255,215,0,0.5)} to{text-shadow:0 2px 10px rgba(0,0,0,1),0 0 40px rgba(255,215,0,1)} }
        @keyframes bubblePop { 0%{transform:translateX(-50%) scale(0);opacity:0} 70%{transform:translateX(-50%) scale(1.08)} 100%{transform:translateX(-50%) scale(1);opacity:1} }
        @keyframes speedLine { 0%{opacity:1;transform:translateX(0)} 100%{opacity:0;transform:translateX(-20px)} }
        @keyframes confettiFall { 0%{transform:translateY(0) rotate(0deg);opacity:1} 100%{transform:translateY(115vh) rotate(900deg);opacity:0} }
        @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.06)} }
      `}</style>
    </div>
  )
}

export default StoriesLesson