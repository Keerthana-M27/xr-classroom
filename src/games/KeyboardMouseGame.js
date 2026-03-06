import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function KeyboardMouseGame() {
  const navigate = useNavigate()
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [question, setQuestion] = useState(null)
  const [options, setOptions] = useState([])
  const [mascotText, setMascotText] = useState('Keyboard or Mouse? ⌨️')
  const [feedback, setFeedback] = useState(null)
  const [gameOver, setGameOver] = useState(false)
  const [round, setRound] = useState(1)

  const allQuestions = [
    { emoji: '⌨️', question: 'Which key do we press to go to next line?', answer: '↩️ Enter key', options: ['↩️ Enter key', '⬆️ Up arrow', '🔙 Backspace', '📑 Tab key'] },
    { emoji: '🖱️', question: 'What does LEFT CLICK do?', answer: '✅ Selects things', options: ['✅ Selects things', '📋 Copies things', '❌ Deletes things', '📂 Opens folders'] },
    { emoji: '⌨️', question: 'Which key deletes letters?', answer: '🔙 Backspace', options: ['🔙 Backspace', '↩️ Enter', '📑 Tab', '⬆️ Shift'] },
    { emoji: '🖱️', question: 'What does DOUBLE CLICK do?', answer: '📂 Opens files', options: ['📂 Opens files', '✅ Selects only', '❌ Deletes files', '📋 Copies files'] },
    { emoji: '⌨️', question: 'Which key makes letters CAPITAL?', answer: '⬆️ Shift key', options: ['⬆️ Shift key', '↩️ Enter key', '🔙 Backspace', '📑 Tab key'] },
    { emoji: '🖱️', question: 'What does the SCROLL WHEEL do?', answer: '📜 Scrolls up and down', options: ['📜 Scrolls up and down', '✅ Clicks things', '📂 Opens files', '❌ Deletes things'] },
    { emoji: '⌨️', question: 'Which key gives space between words?', answer: '⬜ Space bar', options: ['⬜ Space bar', '↩️ Enter key', '📑 Tab key', '🔙 Backspace'] },
    { emoji: '🖱️', question: 'What does RIGHT CLICK show?', answer: '📋 A menu of options', options: ['📋 A menu of options', '✅ Selects things', '📂 Opens files', '❌ Deletes things'] },
    { emoji: '⌨️', question: 'Which keys have A B C D E on them?', answer: '⌨️ Keyboard keys', options: ['⌨️ Keyboard keys', '🖱️ Mouse buttons', '🖥️ Monitor screen', '🔊 Speakers'] },
    { emoji: '⌨️', question: 'Which key is used to escape or cancel?', answer: '🚪 Escape key', options: ['🚪 Escape key', '↩️ Enter key', '⬆️ Shift key', '📑 Tab key'] },
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
      setMascotText('You know your keyboard so well! ⌨️')
      setTimeout(() => {
        if (round >= 10) setGameOver(true)
        else setRound(round + 1)
      }, 1500)
    } else {
      setLives(lives - 1)
      setFeedback('wrong')
      setMascotText('Keep practicing on the keyboard! 💪')
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
          {score >= 70 ? '🏆' : '⌨️'}
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <button
          onClick={() => navigate(-1)}
          style={{ backgroundColor: 'transparent', color: '#FFD700', fontSize: '18px', border: '2px solid #FFD700', padding: '10px 20px', borderRadius: '50px', cursor: 'pointer' }}
        >
          ⬅️ Back
        </button>
        <h2 style={{ color: '#FFD700', fontSize: '22px' }}>⌨️ Keyboard & Mouse Game</h2>
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
          <div style={{ fontSize: '80px', animation: 'bounce 1s infinite' }}>💻</div>
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
                        : ['#FF6B6B', '#4ECDC4', '#FFD700', '#96CEB4'][i],
                      color: 'white',
                      fontSize: '17px',
                      fontWeight: 'bold',
                      padding: '22px 15px',
                      borderRadius: '15px',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
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

export default KeyboardMouseGame