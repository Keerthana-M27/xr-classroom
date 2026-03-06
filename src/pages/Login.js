import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setError('')
    if (!email || !password) { setError('Please enter email and password!'); return }
    try {
      setLoading(true)
      const res = await axios.post('http://localhost:5000/api/login', { email, password })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      if (res.data.user.role === 'teacher') {
        navigate('/teacher', { state: { name: res.data.user.name } })
      } else {
        navigate('/student', { state: { name: res.data.user.name } })
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #0f0c29, #302b63, #24243e)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '30px', padding: '40px', width: '400px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>

        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ fontSize: '60px' }}>🏫</div>
          <h2 style={{ color: '#FFD700', fontSize: '26px', margin: '10px 0 5px' }}>Welcome Back!</h2>
          <p style={{ color: '#d8b4fe', fontSize: '14px', margin: 0 }}>Login to XR Classroom</p>
        </div>

        <input type="email" placeholder="📧 Email Address" value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ width: '100%', padding: '13px 15px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.08)', color: 'white', fontSize: '14px', marginBottom: '12px', boxSizing: 'border-box', outline: 'none' }}
        />

        <input type="password" placeholder="🔒 Password" value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && handleLogin()}
          style={{ width: '100%', padding: '13px 15px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.08)', color: 'white', fontSize: '14px', marginBottom: '15px', boxSizing: 'border-box', outline: 'none' }}
        />

        {error && (
          <div style={{ backgroundColor: 'rgba(255,107,107,0.2)', borderRadius: '10px', padding: '10px', marginBottom: '15px', color: '#FF6B6B', fontSize: '13px', textAlign: 'center', border: '1px solid rgba(255,107,107,0.3)' }}>
            ❌ {error}
          </div>
        )}

        <button onClick={handleLogin} disabled={loading}
          style={{ width: '100%', backgroundColor: '#FFD700', color: 'black', fontSize: '17px', fontWeight: 'bold', padding: '14px', borderRadius: '50px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', marginBottom: '12px', opacity: loading ? 0.7 : 1 }}>
          {loading ? '⏳ Logging in...' : '🚀 Login!'}
        </button>

        <p style={{ color: '#d8b4fe', textAlign: 'center', fontSize: '14px', margin: '0 0 10px' }}>
          New here?{' '}
          <span onClick={() => navigate('/register')} style={{ color: '#FFD700', cursor: 'pointer', fontWeight: 'bold' }}>
            Register here!
          </span>
        </p>

        <p style={{ color: '#d8b4fe', textAlign: 'center', fontSize: '14px', margin: 0 }}>
          <span onClick={() => navigate('/')} style={{ color: '#4ECDC4', cursor: 'pointer' }}>
            ⬅️ Back to Home
          </span>
        </p>
      </div>
    </div>
  )
}

export default Login