import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Background3D from '../components/Background3D'

function Landing() {
  const navigate = useNavigate()
  const [role, setRole] = useState(null)
  const [name, setName] = useState('')
  const [dob, setDob] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  const TEACHER_CODE = '1234'

  const handleStudentLogin = () => {
    if (!name || !dob) {
      setError('Please enter your name and date of birth!')
      return
    }
    navigate('/student', { state: { name, dob } })
  }

  const handleTeacherLogin = () => {
    if (code !== TEACHER_CODE) {
      setError('Wrong class code! Try again.')
      return
    }
    navigate('/teacher')
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #0f0c29, #302b63, #24243e)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      position: 'relative'
    }}>

      <Background3D />

      {/* All content */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* Logo */}
        <div style={{ fontSize: '80px', marginBottom: '10px' }}>🚀</div>
        <h1 style={{ fontSize: '45px', fontWeight: 'bold', color: '#FFD700', marginBottom: '5px' }}>
          XR Classroom!
        </h1>
        <p style={{ color: '#d8b4fe', fontSize: '18px', marginBottom: '40px' }}>
          Learn, Explore & Have Fun! 🌍✨
        </p>

        {/* Role Selection */}
        {!role && (
          <div style={{ display: 'flex', gap: '30px' }}>
            <button
              onClick={() => setRole('student')}
              style={{
                backgroundColor: '#4ECDC4',
                color: 'white',
                fontSize: '22px',
                fontWeight: 'bold',
                padding: '20px 40px',
                borderRadius: '20px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 0 20px rgba(78,205,196,0.5)'
              }}
            >
              👦 I am a Student
            </button>
            <button
              onClick={() => setRole('teacher')}
              style={{
                backgroundColor: '#FF6B6B',
                color: 'white',
                fontSize: '22px',
                fontWeight: 'bold',
                padding: '20px 40px',
                borderRadius: '20px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 0 20px rgba(255,107,107,0.5)'
              }}
            >
              👩‍🏫 I am a Teacher
            </button>
          </div>
        )}

        {/* Student Login */}
        {role === 'student' && (
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: '20px',
            padding: '40px',
            width: '100%',
            maxWidth: '400px',
            textAlign: 'center'
          }}>
            <h2 style={{ fontSize: '28px', color: '#4ECDC4', marginBottom: '20px' }}>
              👦 Student Login
            </h2>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={e => setName(e.target.value)}
              style={{
                width: '100%',
                padding: '15px',
                borderRadius: '10px',
                border: 'none',
                fontSize: '18px',
                marginBottom: '15px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
            <input
              type="date"
              value={dob}
              onChange={e => setDob(e.target.value)}
              style={{
                width: '100%',
                padding: '15px',
                borderRadius: '10px',
                border: 'none',
                fontSize: '18px',
                marginBottom: '20px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
            {error && <p style={{ color: '#FF6B6B', marginBottom: '10px' }}>{error}</p>}
            <button
              onClick={handleStudentLogin}
              style={{
                backgroundColor: '#FFD700',
                color: 'black',
                fontSize: '20px',
                fontWeight: 'bold',
                padding: '15px 40px',
                borderRadius: '50px',
                border: 'none',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              🎮 Let's Go!
            </button>
            <p
              onClick={() => { setRole(null); setError('') }}
              style={{ marginTop: '15px', color: '#d8b4fe', cursor: 'pointer', fontSize: '14px' }}
            >
              ⬅️ Go Back
            </p>
          </div>
        )}

        {/* Teacher Login */}
        {role === 'teacher' && (
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: '20px',
            padding: '40px',
            width: '100%',
            maxWidth: '400px',
            textAlign: 'center'
          }}>
            <h2 style={{ fontSize: '28px', color: '#FF6B6B', marginBottom: '20px' }}>
              👩‍🏫 Teacher Login
            </h2>
            <input
              type="password"
              placeholder="Enter class code"
              value={code}
              onChange={e => setCode(e.target.value)}
              style={{
                width: '100%',
                padding: '15px',
                borderRadius: '10px',
                border: 'none',
                fontSize: '18px',
                marginBottom: '20px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
            {error && <p style={{ color: '#FF6B6B', marginBottom: '10px' }}>{error}</p>}
            <button
              onClick={handleTeacherLogin}
              style={{
                backgroundColor: '#FFD700',
                color: 'black',
                fontSize: '20px',
                fontWeight: 'bold',
                padding: '15px 40px',
                borderRadius: '50px',
                border: 'none',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              🏫 Enter!
            </button>
            <p
              onClick={() => { setRole(null); setError('') }}
              style={{ marginTop: '15px', color: '#d8b4fe', cursor: 'pointer', fontSize: '14px' }}
            >
              ⬅️ Go Back
            </p>
          </div>
        )}

      </div>
    </div>
  )
}

export default Landing