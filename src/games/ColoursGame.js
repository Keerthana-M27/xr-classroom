import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function ColoursGame() {
  const navigate = useNavigate()
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [question, setQuestion] = useState(null)
  const [options, setOptions] = useState([])
  const [mascotText, setMascotText] = useState('Mix the colours! 🎨')
  const [feedback, setFeedback] = useState(null)
  const [gameOver, setGameOver] = useState(false)
  const [round, setRound] = useState(1)

  const allQuestions = [
    { emoji: '🔴🔵', question: 'Red + Blue = ?', answer: '💜 Purple', options: ['💜 Purple', '🟠 Orange', '🟢 Green', '🩷 Pink'] },
    { emoji: '🔴🟡', question: 'Red + Yellow = ?', answer: '🟠 Orange', options: ['🟠 Orange', '💜 Purple', '🟢 Green', '🩷 Pink'] },
    { emoji: '🔵🟡', question: 'Blue + Yellow = ?', answer: '🟢 Green', options: ['🟢 Green', '🟠 Orange', '💜 Purple', '🩷 Pink'] },
    { emoji: '🌈', question: 'What are the PRIMARY colours?', answer: '🔴 Red 🔵 Blue 🟡 Yellow', options: ['🔴 Red 🔵 Blue 🟡 Yellow', '🟢 Green 🟠 Orange 💜 Purple', '⬛ Black ⬜ White 🩷 Pink', '🟤 Brown 🩶 Grey 🔵 Blue'] },
    { emoji: '🌈', question: 'How many colours are in a rainbow?', answer: '7️⃣ Seven', options: ['7️⃣ Seven', '5️⃣ Five', '6️⃣ Six', '8️⃣ Eight'] },
    { emoji: '☀️', question: 'What colour is the Sun?', answer: '🟡 Yellow', options: ['🟡 Yellow', '🔴 Red', '🔵 Blue', '🟢 Green'] },
    { emoji: '🌊', question: 'What colour is the Ocean?', answer: '🔵 Blue', options: ['🔵 Blue', '🟢 Green', '🔴 Red', '🟡 Yellow'] },
    { emoji: '🌳', question: 'What colour are most leaves?', answer: '🟢 Green', options: ['🟢 Green', '🔴 Red', '🔵 Blue', '🟡 Yellow'] },
    { emoji: '🔴🔴', question: 'What colour do you get by mixing Red + White?', answer: '🩷 Pink', options: ['🩷 Pink', '🟠 Orange', '💜 Purple', '🟢 Green'] },
    { emoji: '⬛⬜', question: 'What colour do you get by mixing Black + White?', answer: '🩶 Grey', options: ['🩶 Grey', '🟤 Brown', '🔵 Blue', '🟢 Green'] },
  ]

  const generateQuestion = () => {
    const q = allQuestions[round - 1]
    setQuestion(q)
    setOptions([...q.options].sort(() => Math.random() - 0.5))
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
      setMascotText('Colourful genius! Amazing! 🌈')
      setTimeout(() => {
        if (round >= 10) setGameOver(true)
        else setRound(round + 1)
      }, 1500)
    } else {
      setLives(lives - 1)
      setFeedback('wrong')
      setMascotText('Keep mixing colours! 🎨')
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
        background: 'linear-gradient(to bottom, #FF6B6B, #FFD700, #4ECDC4)',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ fontSize: '100px', marginBottom: '20px' }}>
          {score >= 70 ? '🏆' : '🎨'}
        </div>
        <h1 style={{ color: 'white', fontSize: '40px', marginBottom: '10px' }}>Game Over!</h1>
        <p style={{ color: 'white', fontSize: '24px', marginBottom: '40px' }}>
          Your Score: {score} / 100 🌟
        </p>
        <div style={{ display: 'flex', gap: '20px' }}>
          <button
            onClick={() => { setScore(0); setLives(3); setRound(1); setGameOver(false) }}
            style={{
              backgroundColor: 'white', color: '#FF6B6B', fontSize: '20px',
              fontWeight: 'bold', padding: '15px 30px', borderRadius: '50px',
              border: 'none', cursor: 'pointer'
            }}
          >
            🔄 Play Again!
          </button>
          <button
            onClick={() => navigate(-1)}
            style={{
              backgroundColor: 'transparent', color: 'white', fontSize: '20px',
              border: '2px solid white', padding: '15px 30px',
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
      background: 'linear-gradient(to bottom, #FF6B6B, #FFD700, #4ECDC4)',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      padding: '30px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <button
          onClick={() => navigate(-1)}
          style={{ backgroundColor: 'transparent', color: 'white', fontSize: '18px', border: '2px solid white', padding: '10px 20px', borderRadius: '50px', cursor: 'pointer' }}
        >
          ⬅️ Back
        </button>
        <h2 style={{ color: 'white', fontSize: '22px' }}>🎨 Colours Game</h2>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <span style={{ fontSize: '20px' }}>⭐ {score}</span>
          <span style={{ fontSize: '20px' }}>
            {Array(lives).fill('❤️').join('')}
            {Array(3 - lives).fill('🖤').join('')}
          </span>
        </div>
      </div>

      <p style={{ textAlign: 'center', color: 'white', marginBottom: '10px' }}>Round {round} of 10</p>

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
          <div style={{ fontSize: '80px', animation: 'bounce 1s infinite' }}>🎨</div>
        </div>

        {/* Game area */}
        <div style={{
          flex: 1, backgroundColor: 'rgba(255,255,255,0.25)',
          borderRadius: '30px', padding: '40px', textAlign: 'center',
          backdropFilter: 'blur(10px)', boxShadow: '0 8px 30px rgba(0,0,0,0.2)'
        }}>
          {question && (
            <>
              <div style={{ fontSize: '70px', marginBottom: '20px' }}>
                {question.emoji}
              </div>
              <h2 style={{ fontSize: '26px', color: 'white', marginBottom: '30px' }}>
                {question.question}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
                {options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(opt)}
                    style={{
                      backgroundColor: feedback
                        ? opt === question.answer ? '#22c55e' : 'rgba(255,255,255,0.2)'
                        : ['#FF6B6B', '#4ECDC4', '#FFD700', '#96CEB4'][i],
                      color: 'white',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      padding: '22px 15px',
                      borderRadius: '15px',
                      border: '2px solid rgba(255,255,255,0.5)',
                      cursor: 'pointer',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                      transition: 'all 0.2s'
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {feedback && (
                <div style={{
                  marginTop: '20px', fontSize: '26px',
                  color: feedback === 'correct' ? '#22c55e' : '#ef4444'
                }}>
                  {feedback === 'correct' ? '🎉 Correct! +10 points!' : `❌ Answer was ${question.answer}!`}
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

export default ColoursGame