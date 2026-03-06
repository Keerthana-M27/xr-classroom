import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function SolarSystemGame() {
  const navigate = useNavigate()
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [question, setQuestion] = useState(null)
  const [options, setOptions] = useState([])
  const [mascotText, setMascotText] = useState('Which planet is this? 🪐')
  const [feedback, setFeedback] = useState(null)
  const [gameOver, setGameOver] = useState(false)
  const [round, setRound] = useState(1)

  const planets = [
    { name: 'Mercury', emoji: '⚫', fact: 'Smallest planet! Closest to the Sun!' },
    { name: 'Venus', emoji: '🟡', fact: 'Hottest planet! Covered in clouds!' },
    { name: 'Earth', emoji: '🌍', fact: 'Our home! Only planet with life!' },
    { name: 'Mars', emoji: '🔴', fact: 'The Red Planet! Has the biggest volcano!' },
    { name: 'Jupiter', emoji: '🟠', fact: 'Biggest planet! Has a giant storm!' },
    { name: 'Saturn', emoji: '🪐', fact: 'Has beautiful rings made of ice!' },
    { name: 'Uranus', emoji: '🔵', fact: 'Spins on its side! Very cold!' },
    { name: 'Neptune', emoji: '💙', fact: 'Farthest planet! Has super fast winds!' },
  ]

  const questions = [
    { question: 'Which is the BIGGEST planet?', answer: 'Jupiter', emoji: '🟠' },
    { question: 'Which planet do we live on?', answer: 'Earth', emoji: '🌍' },
    { question: 'Which is called the RED planet?', answer: 'Mars', emoji: '🔴' },
    { question: 'Which planet has beautiful rings?', answer: 'Saturn', emoji: '🪐' },
    { question: 'Which is the SMALLEST planet?', answer: 'Mercury', emoji: '⚫' },
    { question: 'Which is the HOTTEST planet?', answer: 'Venus', emoji: '🟡' },
    { question: 'Which planet spins on its side?', answer: 'Uranus', emoji: '🔵' },
    { question: 'Which is the FARTHEST planet?', answer: 'Neptune', emoji: '💙' },
    { question: 'Which planet has the biggest storm?', answer: 'Jupiter', emoji: '🟠' },
    { question: 'Which planet has ice rings?', answer: 'Saturn', emoji: '🪐' },
  ]

  const generateQuestion = () => {
    const q = questions[round - 1]
    const answer = q.answer
    const wrongPlanets = planets
      .filter(p => p.name !== answer)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(p => p.name)
    const opts = [answer, ...wrongPlanets].sort(() => Math.random() - 0.5)
    setQuestion(q)
    setOptions(opts)
    setFeedback(null)
  }

  useEffect(() => {
    generateQuestion()
  }, [round])

  const handleAnswer = (option) => {
    if (feedback) return
    if (option === question.answer) {
      setScore(score + 10)
      setFeedback('correct')
      setMascotText('Stellar answer! You are a space explorer! 🚀')
      setTimeout(() => {
        if (round >= 10) setGameOver(true)
        else setRound(round + 1)
      }, 1500)
    } else {
      setLives(lives - 1)
      setFeedback('wrong')
      setMascotText('Oops! Keep exploring space! 🌟')
      if (lives - 1 <= 0) {
        setTimeout(() => setGameOver(true), 1500)
      } else {
        setTimeout(() => {
          if (round >= 10) setGameOver(true)
          else setRound(round + 1)
        }, 1500)
      }
    }
  }

  if (gameOver) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #0f0c29, #302b63, #24243e)',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ fontSize: '100px', marginBottom: '20px' }}>
          {score >= 70 ? '🏆' : '🚀'}
        </div>
        <h1 style={{ color: '#FFD700', fontSize: '40px', marginBottom: '10px' }}>Game Over!</h1>
        <p style={{ color: '#d8b4fe', fontSize: '24px', marginBottom: '40px' }}>
          Your Score: {score} / 100 🌟
        </p>
        <div style={{ display: 'flex', gap: '20px' }}>
          <button
            onClick={() => { setScore(0); setLives(3); setRound(1); setGameOver(false) }}
            style={{
              backgroundColor: '#FFD700', color: 'black', fontSize: '20px',
              fontWeight: 'bold', padding: '15px 30px', borderRadius: '50px',
              border: 'none', cursor: 'pointer'
            }}
          >
            🔄 Play Again!
          </button>
          <button
            onClick={() => navigate(-1)}
            style={{
              backgroundColor: 'transparent', color: '#FFD700', fontSize: '20px',
              border: '2px solid #FFD700', padding: '15px 30px',
              borderRadius: '50px', cursor: 'pointer'
            }}
          >
            ⬅️ Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #0f0c29, #302b63, #24243e)',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      padding: '30px'
    }}>

      {/* Top bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <button
          onClick={() => navigate(-1)}
          style={{ backgroundColor: 'transparent', color: '#FFD700', fontSize: '18px', border: '2px solid #FFD700', padding: '10px 20px', borderRadius: '50px', cursor: 'pointer' }}
        >
          ⬅️ Back
        </button>
        <h2 style={{ color: '#FFD700', fontSize: '22px' }}>🪐 Solar System Game</h2>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <span style={{ fontSize: '20px' }}>⭐ {score}</span>
          <span style={{ fontSize: '20px' }}>
            {Array(lives).fill('❤️').join('')}
            {Array(3 - lives).fill('🖤').join('')}
          </span>
        </div>
      </div>

      <p style={{ textAlign: 'center', color: '#d8b4fe', marginBottom: '10px' }}>Round {round} of 10</p>

      <div style={{ display: 'flex', gap: '30px', alignItems: 'center', maxWidth: '900px', margin: '0 auto' }}>

        {/* Mascot */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '150px' }}>
          <div style={{
            backgroundColor: 'white', color: 'black', padding: '12px 16px',
            borderRadius: '15px', fontSize: '14px', fontWeight: 'bold',
            textAlign: 'center', marginBottom: '10px', maxWidth: '140px',
            position: 'relative', boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
          }}>
            {mascotText}
            <div style={{
              position: 'absolute', bottom: '-10px', left: '50%',
              transform: 'translateX(-50%)', width: 0, height: 0,
              borderLeft: '10px solid transparent', borderRight: '10px solid transparent',
              borderTop: '10px solid white'
            }} />
          </div>
          <div style={{ fontSize: '80px', animation: 'bounce 1s infinite' }}>🔭</div>
        </div>

        {/* Game area */}
        <div style={{
          flex: 1, backgroundColor: 'rgba(255,255,255,0.1)',
          borderRadius: '30px', padding: '40px', textAlign: 'center',
          backdropFilter: 'blur(10px)', boxShadow: '0 8px 30px rgba(0,0,0,0.3)'
        }}>
          {question && (
            <>
              <div style={{ fontSize: '80px', marginBottom: '20px' }}>
                {question.emoji}
              </div>

              <h2 style={{ fontSize: '26px', color: '#FFD700', marginBottom: '30px' }}>
                {question.question}
              </h2>

              {/* Planet options */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
                {options.map((opt, i) => {
                  const planet = planets.find(p => p.name === opt)
                  return (
                    <button
                      key={i}
                      onClick={() => handleAnswer(opt)}
                      style={{
                        backgroundColor: feedback
                          ? opt === question.answer ? '#22c55e' : 'rgba(255,255,255,0.1)'
                          : 'rgba(255,255,255,0.15)',
                        color: 'white',
                        fontSize: '22px',
                        fontWeight: 'bold',
                        padding: '20px',
                        borderRadius: '15px',
                        border: '2px solid rgba(255,255,255,0.3)',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {planet?.emoji} {opt}
                    </button>
                  )
                })}
              </div>

              {feedback && (
                <div style={{
                  marginTop: '20px', fontSize: '24px',
                  color: feedback === 'correct' ? '#22c55e' : '#ef4444'
                }}>
                  {feedback === 'correct'
                    ? `🎉 Correct! ${planets.find(p => p.name === question.answer)?.fact}`
                    : `❌ It was ${question.answer}!`}
                </div>
              )}
            </>
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

export default SolarSystemGame