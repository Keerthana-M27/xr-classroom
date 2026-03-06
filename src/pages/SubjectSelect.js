import { useNavigate } from 'react-router-dom'

function SubjectSelect() {
  const navigate = useNavigate()

  const subjects = [
    { name: 'Math', emoji: '🔢', color: '#FF6B6B' },
    { name: 'Science', emoji: '🔬', color: '#4ECDC4' },
    { name: 'English', emoji: '📖', color: '#45B7D1' },
    { name: 'History', emoji: '🏛️', color: '#96CEB4' },
    { name: 'Geography', emoji: '🌍', color: '#FFEAA7' },
    { name: 'Art', emoji: '🎨', color: '#DDA0DD' },
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #0f0c29, #302b63, #24243e)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px 20px',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>

      {/* Title */}
      <h1 style={{
        fontSize: '40px',
        fontWeight: 'bold',
        color: '#FFD700',
        marginBottom: '10px'
      }}>
        Pick a Subject! 🎯
      </h1>

      <p style={{ color: '#d8b4fe', fontSize: '18px', marginBottom: '40px' }}>
        What do you want to learn today?
      </p>

      {/* Subject Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
        maxWidth: '700px',
        width: '100%'
      }}>
        {subjects.map((subject) => (
          <div
            key={subject.name}
            onClick={() => navigate('/classroom', { state: { subject: subject.name } })}
            style={{
              backgroundColor: subject.color,
              borderRadius: '20px',
              padding: '30px 20px',
              textAlign: 'center',
              cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={{ fontSize: '50px', marginBottom: '10px' }}>
              {subject.emoji}
            </div>
            <div style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: 'white',
              textShadow: '1px 1px 3px rgba(0,0,0,0.5)'
            }}>
              {subject.name}
            </div>
          </div>
        ))}
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        style={{
          marginTop: '40px',
          backgroundColor: 'transparent',
          color: '#FFD700',
          fontSize: '18px',
          border: '2px solid #FFD700',
          padding: '12px 40px',
          borderRadius: '50px',
          cursor: 'pointer'
        }}
      >
        ⬅️ Go Back
      </button>

    </div>
  )
}

export default SubjectSelect