import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { io } from 'socket.io-client'

const socket = io('http://localhost:5000')

function Classroom() {
  const navigate = useNavigate()
  const location = useLocation()
  const name = location.state?.name || 'Student'

  const [joined, setJoined] = useState(false)
  const [classCode, setClassCode] = useState('1234')
  const [student, setStudent] = useState(null)
  const [classroom, setClassroom] = useState(null)
  const [students, setStudents] = useState([])
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [error, setError] = useState('')
  const [handRaised, setHandRaised] = useState(false)

  const canvasRef = useRef(null)
  const chatEndRef = useRef(null)

  const avatars = ['👦', '👧', '🧒', '👶', '🧑']
  const [avatar] = useState(avatars[Math.floor(Math.random() * avatars.length)])

  useEffect(() => {
    socket.on('classroom-update', (data) => {
      setClassroom(data.classroom)
      setStudents(data.students)
      setMessages(data.messages)
      if (student) {
        const me = data.students.find(s => s.id === student.id)
        if (me) setHandRaised(me.hand_raised === 1)
      }
    })
    return () => socket.off('classroom-update')
  }, [student])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Whiteboard listener
  useEffect(() => {
    if (!joined) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#1a1a2e'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    socket.on('whiteboard-draw', (data) => {
      ctx.beginPath()
      ctx.moveTo(data.x1, data.y1)
      ctx.lineTo(data.x2, data.y2)
      ctx.strokeStyle = data.color
      ctx.lineWidth = data.size
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.stroke()
    })

    socket.on('whiteboard-text', (data) => {
      ctx.font = `${data.size}px Arial`
      ctx.fillStyle = data.color
      ctx.fillText(data.text, data.x, data.y)
    })

    socket.on('whiteboard-clear', () => {
      ctx.fillStyle = '#1a1a2e'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    })

    return () => {
      socket.off('whiteboard-draw')
      socket.off('whiteboard-text')
      socket.off('whiteboard-clear')
    }
  }, [joined])

  const joinClassroom = async () => {
    try {
      setError('')
      const res = await axios.post('http://localhost:5000/api/student/join', {
        class_code: classCode,
        student_name: name,
        avatar
      })
      setStudent(res.data.student)
      setClassroom(res.data.classroom)
      setStudents(res.data.students)
      setMessages(res.data.messages)
      setJoined(true)
      socket.emit('join-room', classCode)
    } catch (err) {
      setError(err.response?.data?.error || 'Cannot join! Ask teacher to start class first!')
    }
  }

  const raiseHand = async () => {
    try {
      await axios.post('http://localhost:5000/api/student/hand', {
        student_id: student.id,
        class_code: classCode
      })
    } catch (err) {
      console.error(err)
    }
  }

  const sendMessage = async () => {
    if (!newMessage.trim()) return
    try {
      await axios.post('http://localhost:5000/api/message', {
        class_code: classCode,
        sender: name,
        message: newMessage
      })
      setNewMessage('')
    } catch (err) {
      console.error(err)
    }
  }

  const leaveClassroom = async () => {
    try {
      await axios.post('http://localhost:5000/api/student/leave', {
        student_id: student.id,
        class_code: classCode
      })
    } catch (err) {
      console.error(err)
    }
    navigate('/student', { state: { name } })
  }

  if (!joined) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #0f0c29, #302b63, #24243e)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial, sans-serif' }}>
        <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '30px', padding: '50px', textAlign: 'center', backdropFilter: 'blur(10px)', width: '400px' }}>
          <div style={{ fontSize: '80px', marginBottom: '20px' }}>🏫</div>
          <h2 style={{ color: '#FFD700', fontSize: '28px', marginBottom: '10px' }}>Enter Classroom!</h2>
          <p style={{ color: '#d8b4fe', marginBottom: '30px' }}>Hi {name}! Enter class code to join!</p>
          <input
            value={classCode}
            onChange={e => setClassCode(e.target.value)}
            placeholder="Enter class code..."
            style={{ width: '100%', padding: '15px', borderRadius: '15px', border: '2px solid #FFD700', backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', fontSize: '20px', textAlign: 'center', marginBottom: '15px', boxSizing: 'border-box' }}
          />
          {error && <p style={{ color: '#FF6B6B', marginBottom: '15px' }}>{error}</p>}
          <button onClick={joinClassroom} style={{ width: '100%', backgroundColor: '#FFD700', color: 'black', fontSize: '20px', fontWeight: 'bold', padding: '15px', borderRadius: '50px', border: 'none', cursor: 'pointer', marginBottom: '15px' }}>
            🚀 Join Classroom!
          </button>
          <button onClick={() => navigate('/student', { state: { name } })} style={{ width: '100%', backgroundColor: 'transparent', color: '#FFD700', fontSize: '16px', padding: '10px', borderRadius: '50px', border: '2px solid #FFD700', cursor: 'pointer' }}>
            ⬅️ Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0f0c29', color: 'white', fontFamily: 'Arial, sans-serif', display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', backgroundColor: 'rgba(0,0,0,0.5)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div>
          <h2 style={{ color: '#FFD700', fontSize: '20px', margin: 0 }}>🏫 XR Classroom</h2>
          <p style={{ color: '#d8b4fe', fontSize: '12px', margin: 0 }}>Class Code: {classCode}</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div style={{ backgroundColor: classroom?.teacher_name ? 'rgba(78,205,196,0.3)' : 'rgba(255,107,107,0.3)', borderRadius: '20px', padding: '8px 15px', fontSize: '14px' }}>
            {classroom?.teacher_name ? `👩‍🏫 ${classroom.teacher_name} is teaching!` : '⏳ Waiting for teacher...'}
          </div>
          <button onClick={leaveClassroom} style={{ backgroundColor: '#FF6B6B', color: 'white', border: 'none', borderRadius: '20px', padding: '8px 15px', cursor: 'pointer', fontSize: '14px' }}>
            🚪 Leave
          </button>
        </div>
      </div>

      {/* Current Lesson Bar */}
      <div style={{ backgroundColor: 'rgba(255,215,0,0.15)', padding: '8px', textAlign: 'center', borderBottom: '1px solid rgba(255,215,0,0.3)' }}>
        <span style={{ color: '#d8b4fe', fontSize: '12px' }}>📖 CURRENT LESSON: </span>
        <span style={{ color: '#FFD700', fontWeight: 'bold', fontSize: '16px' }}>{classroom?.current_lesson || 'Welcome to XR Classroom!'}</span>
      </div>

      {/* Main Layout */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* LEFT — Students + Raise Hand */}
        <div style={{ width: '200px', backgroundColor: 'rgba(0,0,0,0.4)', borderRight: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', padding: '10px', gap: '10px', overflowY: 'auto' }}>

          <h4 style={{ color: '#FFD700', margin: 0, fontSize: '14px' }}>👥 Students ({students.length})</h4>
          {students.map(s => (
            <div key={s.id} style={{ backgroundColor: s.student_name === name ? 'rgba(255,215,0,0.2)' : 'rgba(255,255,255,0.1)', borderRadius: '12px', padding: '8px', textAlign: 'center', border: s.student_name === name ? '2px solid #FFD700' : '2px solid transparent' }}>
              <div style={{ fontSize: '25px' }}>{s.avatar}</div>
              <div style={{ fontSize: '12px', marginTop: '3px', color: s.student_name === name ? '#FFD700' : 'white' }}>{s.student_name}</div>
              {s.hand_raised === 1 && <div style={{ fontSize: '16px' }}>🙋</div>}
            </div>
          ))}
          {students.length === 0 && <p style={{ color: '#d8b4fe', fontSize: '12px', textAlign: 'center' }}>No students yet...</p>}

          {/* Raise Hand */}
          <button onClick={raiseHand} style={{ marginTop: 'auto', backgroundColor: handRaised ? '#FF6B6B' : '#4ECDC4', color: 'white', fontSize: '14px', fontWeight: 'bold', padding: '12px', borderRadius: '15px', border: 'none', cursor: 'pointer' }}>
            {handRaised ? '✋ Lower Hand' : '🙋 Raise Hand'}
          </button>
        </div>

        {/* MIDDLE — Whiteboard */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#1a1a2e' }}>
          <div style={{ padding: '8px 15px', backgroundColor: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(255,215,0,0.3)', textAlign: 'center' }}>
            <span style={{ color: '#FFD700', fontSize: '14px' }}>🖊️ Teacher's Whiteboard — Watch your teacher teach live!</span>
          </div>
          <canvas
            ref={canvasRef}
            width={900}
            height={600}
            style={{ flex: 1, width: '100%', height: '100%', backgroundColor: '#1a1a2e' }}
          />
        </div>

        {/* RIGHT — Chat */}
        <div style={{ width: '260px', display: 'flex', flexDirection: 'column', backgroundColor: 'rgba(0,0,0,0.4)', borderLeft: '1px solid rgba(255,255,255,0.1)', padding: '10px' }}>
          <h4 style={{ color: '#FFD700', margin: '0 0 10px 0', fontSize: '14px' }}>💬 Class Chat</h4>
          <div style={{ flex: 1, overflowY: 'auto', marginBottom: '10px', maxHeight: '500px' }}>
            {messages.map((m, i) => (
              <div key={i} style={{ marginBottom: '10px', textAlign: m.sender === name ? 'right' : 'left' }}>
                <div style={{ fontSize: '10px', color: '#d8b4fe', marginBottom: '2px' }}>{m.sender}</div>
                <div style={{ backgroundColor: m.sender === name ? 'rgba(255,215,0,0.3)' : 'rgba(255,255,255,0.2)', borderRadius: '10px', padding: '6px 10px', display: 'inline-block', fontSize: '13px', maxWidth: '180px', wordBreak: 'break-word' }}>
                  {m.message}
                </div>
              </div>
            ))}
            {messages.length === 0 && <p style={{ color: '#d8b4fe', textAlign: 'center', fontSize: '13px' }}>No messages yet...</p>}
            <div ref={chatEndRef} />
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && sendMessage()}
              placeholder="Type message..."
              style={{ flex: 1, padding: '8px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.3)', backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', fontSize: '13px' }}
            />
            <button onClick={sendMessage} style={{ backgroundColor: '#FFD700', color: 'black', border: 'none', borderRadius: '10px', padding: '8px 12px', cursor: 'pointer', fontSize: '16px' }}>
              ➤
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Classroom