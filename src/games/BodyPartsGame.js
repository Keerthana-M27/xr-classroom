import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function BodyPartsGame() {
  const navigate = useNavigate()
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [question, setQuestion] = useState(null)
  const [options, setOptions] = useState([])
  const [mascotText, setMascotText] = useState('What does this body part do? 🧍')
  const [feedback, setFeedback] = useState(null)
  const [gameOver, setGameOver] = useState(false)
  const [round, setRound] = useState(1)

  const allQuestions = [
    { emoji: '🧠', question: 'What does the BRAIN do?', answer: '💭 Controls our body', options: ['💭 Controls our body', '❤️ Pumps blood', '🫁 Helps breathe', '🦴 Holds us up'] },
    { emoji: '❤️', question: 'What does the HEART do?', answer: '❤️ Pumps blood', options: ['❤️ Pumps blood', '💭 Controls thinking', '🫁 Helps breathe', '👁️ Helps see'] },
    { emoji: '🫁', question: 'What do the LUNGS do?', answer: '🌬️ Help us breathe', options: ['🌬️ Help us breathe', '❤️ Pump blood', '💭 Help us think', '🦴 Hold us up'] },
    { emoji: '🦴', question: 'How many bones does a human have?', answer: '2️⃣0️⃣6️⃣ 206 bones', options: ['2️⃣0️⃣6️⃣ 206 bones', '1️⃣0️⃣0️⃣ 100 bones', '3️⃣0️⃣0️⃣ 300 bones', '5️⃣0️⃣ 50 bones'] },
    { emoji: '👁️', question: 'What do our EYES do?', answer: '👁️ Help us see', options: ['👁️ Help us see', '👂 Help us hear', '👃 Help us smell', '👅 Help us taste'] },
    { emoji: '👂', question: 'What do our EARS do?', answer: '👂 Help us hear', options: ['👂 Help us hear', '👁️ Help us see', '👃 Help us smell', '🧠 Help us think'] },
    { emoji: '👃', question: 'What does our NOSE do?', answer: '👃 Helps us smell', options: ['👃 Helps us smell', '👁️ Helps us see', '👅 Helps us taste', '👂 Helps us hear'] },
    { emoji: '👅', question: 'What does our TONGUE do?', answer: '👅 Helps us taste', options: ['👅 Helps us taste', '👁️ Helps us see', '👂 Helps us hear', '👃 Helps us smell'] },
    { emoji: '💪', question: 'What do our MUSCLES do?', answer: '💪 Help us move', options: ['💪 Help us move', '🧠 Help us think', '❤️ Pump blood', '🫁 Help breathe'] },
    { emoji: '🦷', question: 'What do our TEETH do?', answer: '🦷 Help us chew food', options: ['🦷 Help us chew food', '👁️ Help us see', '👂 Help us hear', '🧠 Help us think'] },
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
      setMascotText('Body genius! You know it all! 💪')
      setTimeout(() => {
        if (round >= 10) setGameOver(true)
        else setRound(round + 1)
      }, 1500)
    } else {
      setLives(lives - 1)
      setFeedback('wrong')
      setMascotText('Keep learning about your body! 🌟')
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
        background: 'linear-gradient(to bottom, #2D1B69, #11998E)',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ fontSize: '100px', marginBottom: '20px' }}>
          {score >= 70 ? '🏆' : '🧍'}
        </div>
        <h1 style={{ color: '#FFD700', fontSize: '40px', marginBottom: '10px' }}>Game Over!</h1>
        <p style={{ color: '#d8b4fe', fontSize: '24px', marginBottom: '10px' }}>
          Your Score: {score} / 100 🌟
        </p>
        <p style={{ color: '#4ECDC4', fontSize: '20px', marginBottom: '40px' }}>
          🎉 You completed ALL 28 games! You are a CHAMPION! 🏆
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
      background: 'linear-gradient(to bottom, #2D1B69, #11998E)',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      padding: '30px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <button
          onClick={() => navigate(-1)}
          style={{ backgroundColor: 'transparent', color: '#FFD700', fontSize: '18px', border: '2px solid #FFD700', padding: '10px 20px', borderRadius: '50px', cursor: 'pointer' }}
        >
          ⬅️ Back
        </button>
        <h2 style={{ color: '#FFD700', fontSize: '22px' }}>🧍 Body Parts Game</h2>
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
          <div style={{ fontSize: '80px', animation: 'bounce 1s infinite' }}>🧍</div>
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
              <h2 style={{ fontSize: '24px', color: '#FFD700', marginBottom: '30px' }}>
                {question.question}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
                {options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(opt)}
                    style={{
                      backgroundColor: feedback
                        ? opt === question.answer ? '#22c55e' : 'rgba(255,255,255,0.1)'
                        : ['#2D1B69', '#11998E', '#1a237e', '#00695c'][i],
                      color: 'white',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      padding: '22px 15px',
                      borderRadius: '15px',
                      border: '2px solid rgba(255,255,255,0.3)',
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

export default BodyPartsGame