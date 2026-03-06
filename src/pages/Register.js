import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '', email: '', password: '', confirmPassword: '',
    role: 'student', class_grade: '4th', roll_number: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleRegister = async () => {
    setError('')
    if (!form.name || !form.email || !form.password) {
      setError('Please fill all fields!'); return
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match!'); return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters!'); return
    }
    try {
      setLoading(true)
      const res = await axios.post('http://localhost:5000/api/register', form)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      if (res.data.user.role === 'teacher') {
        navigate('/teacher', { state: { name: res.data.user.name } })
      } else {
        navigate('/student', { state: { name: res.data.user.name } })
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #0f0c29, #302b63, #24243e)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '30px', padding: '40px', width: '420px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>

        <div style={{ textAlign: 'center', marginBottom: '25px' }}>
          <div style={{ fontSize: '60px' }}>🚀</div>
          <h2 style={{ color: '#FFD700', fontSize: '26px', margin: '10px 0 5px' }}>Create Account</h2>
          <p style={{ color: '#d8b4fe', fontSize: '14px', margin: 0 }}>Join XR Classroom today!</p>
        </div>

        {/* Role Selection */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <div onClick={() => setForm({ ...form, role: 'student' })}
            style={{ flex: 1, padding: '12px', borderRadius: '12px', textAlign: 'center', cursor: 'pointer', backgroundColor: form.role === 'student' ? 'rgba(78,205,196,0.3)' : 'rgba(255,255,255,0.05)', border: form.role === 'student' ? '2px solid #4ECDC4' : '2px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: '24px' }}>👦</div>
            <div style={{ color: form.role === 'student' ? '#4ECDC4' : 'white', fontSize: '14px', fontWeight: 'bold' }}>Student</div>
          </div>
          <div onClick={() => setForm({ ...form, role: 'teacher' })}
            style={{ flex: 1, padding: '12px', borderRadius: '12px', textAlign: 'center', cursor: 'pointer', backgroundColor: form.role === 'teacher' ? 'rgba(255,107,107,0.3)' : 'rgba(255,255,255,0.05)', border: form.role === 'teacher' ? '2px solid #FF6B6B' : '2px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: '24px' }}>👩‍🏫</div>
            <div style={{ color: form.role === 'teacher' ? '#FF6B6B' : 'white', fontSize: '14px', fontWeight: 'bold' }}>Teacher</div>
          </div>
        </div>

        {[
          { name: 'name', placeholder: '👤 Full Name', type: 'text' },
          { name: 'email', placeholder: '📧 Email Address', type: 'email' },
          { name: 'password', placeholder: '🔒 Password (min 6 chars)', type: 'password' },
          { name: 'confirmPassword', placeholder: '🔒 Confirm Password', type: 'password' },
        ].map(field => (
          <input key={field.name} name={field.name} type={field.type}
            placeholder={field.placeholder} value={form[field.name]}
            onChange={handleChange}
            style={{ width: '100%', padding: '13px 15px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.08)', color: 'white', fontSize: '14px', marginBottom: '12px', boxSizing: 'border-box', outline: 'none' }}
          />
        ))}

        {form.role === 'student' && (
          <div style={{ display: 'flex', gap: '10px' }}>
            <select name="class_grade" value={form.class_grade} onChange={handleChange}
              style={{ flex: 1, padding: '13px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)', backgroundColor: 'rgba(30,30,60,0.9)', color: 'white', fontSize: '14px', marginBottom: '12px' }}>
              <option value="4th">4th Grade</option>
              <option value="5th">5th Grade</option>
            </select>
            <input name="roll_number" placeholder="Roll No." value={form.roll_number}
              onChange={handleChange}
              style={{ flex: 1, padding: '13px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.08)', color: 'white', fontSize: '14px', marginBottom: '12px', boxSizing: 'border-box' }}
            />
          </div>
        )}

        {error && (
          <div style={{ backgroundColor: 'rgba(255,107,107,0.2)', borderRadius: '10px', padding: '10px', marginBottom: '15px', color: '#FF6B6B', fontSize: '13px', textAlign: 'center', border: '1px solid rgba(255,107,107,0.3)' }}>
            ❌ {error}
          </div>
        )}

        <button onClick={handleRegister} disabled={loading}
          style={{ width: '100%', backgroundColor: '#FFD700', color: 'black', fontSize: '17px', fontWeight: 'bold', padding: '14px', borderRadius: '50px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', marginBottom: '12px', opacity: loading ? 0.7 : 1 }}>
          {loading ? '⏳ Creating Account...' : '🚀 Register Now!'}
        </button>

        <p style={{ color: '#d8b4fe', textAlign: 'center', fontSize: '14px', margin: 0 }}>
          Already have an account?{' '}
          <span onClick={() => navigate('/login')} style={{ color: '#FFD700', cursor: 'pointer', fontWeight: 'bold' }}>
            Login here!
          </span>
        </p>
      </div>
    </div>
  )
}

export default Register