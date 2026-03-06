import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function SpellingsGame() {
  const navigate = useNavigate()
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [question, setQuestion] = useState(null)
  const [options, setOptions] = useState([])
  const [mascotText, setMascotText] = useState('Pick the correct spelling! ✏️')
  const [feedback, setFeedback] = useState(null)
  const [gameOver, setGameOver] = useState(false)
  const [round, setRound] = useState(1)

  const allQuestions = [
    { emoji: '🐱', word: 'Cat', question: 'How do you spell CAT?', answer: 'CAT', options: ['CAT', 'KAT', 'CET', 'KET'] },
    { emoji: '🐶', word: 'Dog', question: 'How do you spell DOG?', answer: 'DOG', options: ['DOG', 'DOK', 'DUG', 'DOJ'] },
    { emoji: '☀️', word: 'Sun', question: 'How do you spell SUN?', answer: 'SUN', options: ['SUN', 'SON', 'SAN', 'SEN'] },
    { emoji: '🌙', word: 'Moon', question: 'How do you spell MOON?', answer: 'MOON', options: ['MOON', 'MOUN', 'MONE', 'MUON'] },
    { emoji: '🐟', word: 'Fish', question: 'How do you spell FISH?', answer: 'FISH', options: ['FISH', 'FESH', 'FISH', 'FISS'] },
    { emoji: '🌳', word: 'Tree', question: 'How do you spell TREE?', answer: 'TREE', options: ['TREE', 'TRIE', 'TREI', 'TREA'] },
    { emoji: '📚', word: 'Book', question: 'How do you spell BOOK?', answer: 'BOOK', options: ['BOOK', 'BOAK', 'BOUK', 'BOCK'] },
    { emoji: '🏠', word: 'Home', question: 'How do you spell HOME?', answer: 'HOME', options: ['HOME', 'HUME', 'HOEM', 'HOAM'] },
    { emoji: '🎂', word: 'Cake', question: 'How do you spell CAKE?', answer: 'CAKE', options: ['CAKE', 'CAEK', 'KAKE', 'CAKK'] },
    { emoji: '🦋', word: 'Bird', question: 'How do you spell BIRD?', answer: 'BIRD', options: ['BIRD', 'BRID', 'BYRD', 'BERD'] },
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
      setMascotText('Perfect spelling! You are so clever! 🌟')
      setTimeout(() => {
        if (round >= 10) setGameOver(true)
        else setRound(round + 1)
      }, 1500)
    } else {
      setLives(lives - 1)
      setFeedback('wrong')
      setMascotText('Keep practicing! You can do it! ✏️')
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
        background: 'linear-gradient(to bottom, #1a1a2e, #16213e, #0f3460)',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ fontSize: '100px', marginBottom: '20px' }}>
          {score >= 70 ? '🏆' : '✏️'}
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
      background: 'linear-gradient(to bottom, #1a1a2e, #16213e, #0f3460)',
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
        <h2 style={{ color: '#FFD700', fontSize: '22px' }}>✏️ Spellings Game</h2>
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
          <div style={{ fontSize: '80px', animation: 'bounce 1s infinite' }}>📖</div>
        </div>

        {/* Game area */}
        <div style={{
          flex: 1, backgroundColor: 'rgba(255,255,255,0.1)',
          borderRadius: '30px', padding: '40px', textAlign: 'center',
          backdropFilter: 'blur(10px)', boxShadow: '0 8px 30px rgba(0,0,0,0.3)'
        }}>
          {question && (
            <>
              {/* Word emoji */}
              <div style={{ fontSize: '80px', marginBottom: '10px' }}>
                {question.emoji}
              </div>

              <h2 style={{ fontSize: '28px', color: '#FFD700', marginBottom: '10px' }}>
                {question.question}
              </h2>

              <p style={{ color: '#d8b4fe', fontSize: '18px', marginBottom: '25px' }}>
                Pick the correct spelling! 👆
              </p>

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
                      fontSize: '28px',
                      fontWeight: 'bold',
                      padding: '25px',
                      borderRadius: '15px',
                      border: 'none',
                      cursor: 'pointer',
                      letterSpacing: '3px',
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

export default SpellingsGame