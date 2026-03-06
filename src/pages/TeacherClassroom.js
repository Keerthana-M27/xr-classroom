import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { io } from 'socket.io-client'

const socket = io('http://localhost:5000')

function TeacherClassroom() {
  const navigate = useNavigate()
  const location = useLocation()
  const teacherName = location.state?.name || 'Teacher'

  const [joined, setJoined] = useState(false)
  const [classCode] = useState('1234')
  const [classroom, setClassroom] = useState(null)
  const [students, setStudents] = useState([])
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [newLesson, setNewLesson] = useState('')
  const [tool, setTool] = useState('pen')
  const [color, setColor] = useState('#FFD700')
  const [brushSize, setBrushSize] = useState(4)
  const [isDrawing, setIsDrawing] = useState(false)
  const [textInput, setTextInput] = useState('')
  const [showTextBox, setShowTextBox] = useState(false)
  const [textPos, setTextPos] = useState({ x: 0, y: 0 })
  const [cameraOn, setCameraOn] = useState(false)

  const canvasRef = useRef(null)
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const lastPos = useRef(null)
  const chatEndRef = useRef(null)

  const lessons = [
    'Addition','Subtraction','Multiplication','Division',
    'Solar System','Animals','Plants','Human Body',
    'Alphabets','Spellings','Grammar','Stories',
    'What is Computer','Keyboard & Mouse','Paint & Draw','Fun Games',
    'Continents','Oceans','Mountains','Countries',
    'Drawing','Colours','Craft','Sculpture',
    'Healthy Food','Exercise','Hygiene','Body Parts'
  ]

  const colors = ['#FFD700','#FF6B6B','#4ECDC4','#45B7D1','#96CEB4','#DDA0DD','#FF9F43','#FFFFFF','#000000','#2ECC71']

  useEffect(() => {
    socket.on('classroom-update', (data) => {
      setClassroom(data.classroom)
      setStudents(data.students)
      setMessages(data.messages)
    })
    return () => socket.off('classroom-update')
  }, [])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      videoRef.current.srcObject = stream
      streamRef.current = stream
      setCameraOn(true)
    } catch (err) {
      alert('Cannot access camera! Please allow camera permission.')
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop())
      streamRef.current = null
      setCameraOn(false)
    }
  }

  // Drawing
  const getPos = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    return { x: clientX - rect.left, y: clientY - rect.top }
  }

  const startDraw = (e) => {
    if (tool === 'text') {
      const pos = getPos(e)
      setTextPos(pos)
      setShowTextBox(true)
      return
    }
    setIsDrawing(true)
    lastPos.current = getPos(e)
  }

  const draw = (e) => {
    if (!isDrawing || tool === 'text') return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const pos = getPos(e)

    ctx.beginPath()
    ctx.moveTo(lastPos.current.x, lastPos.current.y)
    ctx.lineTo(pos.x, pos.y)
    ctx.strokeStyle = tool === 'eraser' ? '#1a1a2e' : color
    ctx.lineWidth = tool === 'eraser' ? brushSize * 4 : brushSize
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.stroke()

    // Send to students
    socket.emit('whiteboard-draw', {
      class_code: classCode,
      data: {
        x1: lastPos.current.x, y1: lastPos.current.y,
        x2: pos.x, y2: pos.y,
        color: tool === 'eraser' ? '#1a1a2e' : color,
        size: tool === 'eraser' ? brushSize * 4 : brushSize
      }
    })

    lastPos.current = pos
  }

  const stopDraw = () => setIsDrawing(false)

  const addText = () => {
    if (!textInput.trim()) { setShowTextBox(false); return }
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.font = `${brushSize * 5 + 10}px Arial`
    ctx.fillStyle = color
    ctx.fillText(textInput, textPos.x, textPos.y)

    socket.emit('whiteboard-text', {
      class_code: classCode,
      data: { text: textInput, x: textPos.x, y: textPos.y, color, size: brushSize * 5 + 10 }
    })

    setTextInput('')
    setShowTextBox(false)
  }

  const clearBoard = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#1a1a2e'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    socket.emit('whiteboard-clear', classCode)
  }

  const joinClassroom = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/teacher/join', {
        class_code: classCode,
        teacher_name: teacherName
      })
      setClassroom(res.data.classroom)
      setStudents(res.data.students)
      setMessages(res.data.messages)
      setJoined(true)
      socket.emit('join-room', classCode)
    } catch (err) {
      console.error(err)
    }
  }

  const changeLesson = async (lesson) => {
    try {
      await axios.post('http://localhost:5000/api/teacher/lesson', {
        class_code: classCode, lesson
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
        sender: `👩‍🏫 ${teacherName}`,
        message: newMessage
      })
      setNewMessage('')
    } catch (err) {
      console.error(err)
    }
  }

  if (!joined) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #0f0c29, #302b63, #24243e)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial, sans-serif' }}>
        <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '30px', padding: '50px', textAlign: 'center', backdropFilter: 'blur(10px)', width: '400px' }}>
          <div style={{ fontSize: '80px', marginBottom: '20px' }}>👩‍🏫</div>
          <h2 style={{ color: '#FFD700', fontSize: '28px', marginBottom: '10px' }}>Start Your Classroom!</h2>
          <p style={{ color: '#d8b4fe', marginBottom: '10px' }}>Welcome, {teacherName}!</p>
          <div style={{ backgroundColor: 'rgba(255,215,0,0.2)', borderRadius: '15px', padding: '15px', marginBottom: '25px' }}>
            <p style={{ color: '#d8b4fe', fontSize: '14px', margin: '0 0 5px 0' }}>Your Class Code</p>
            <h2 style={{ color: '#FFD700', fontSize: '40px', margin: 0, letterSpacing: '8px' }}>{classCode}</h2>
            <p style={{ color: '#d8b4fe', fontSize: '12px', margin: '5px 0 0 0' }}>Share with students!</p>
          </div>
          <button onClick={joinClassroom} style={{ width: '100%', backgroundColor: '#FFD700', color: 'black', fontSize: '20px', fontWeight: 'bold', padding: '15px', borderRadius: '50px', border: 'none', cursor: 'pointer', marginBottom: '15px' }}>
            🚀 Start Classroom!
          </button>
          <button onClick={() => navigate('/teacher', { state: { name: teacherName } })} style={{ width: '100%', backgroundColor: 'transparent', color: '#FFD700', fontSize: '16px', padding: '10px', borderRadius: '50px', border: '2px solid #FFD700', cursor: 'pointer' }}>
            ⬅️ Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0f0c29', color: 'white', fontFamily: 'Arial, sans-serif', display: 'flex', flexDirection: 'column' }}>

      {/* Top Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', backgroundColor: 'rgba(0,0,0,0.5)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <h2 style={{ color: '#FFD700', margin: 0, fontSize: '20px' }}>👩‍🏫 XR Classroom — Code: <span style={{ letterSpacing: '4px' }}>{classCode}</span></h2>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div style={{ backgroundColor: 'rgba(78,205,196,0.3)', borderRadius: '20px', padding: '6px 15px', fontSize: '14px' }}>👥 {students.length} Students</div>
          <button onClick={() => navigate('/teacher', { state: { name: teacherName } })} style={{ backgroundColor: '#FF6B6B', color: 'white', border: 'none', borderRadius: '20px', padding: '8px 15px', cursor: 'pointer' }}>🚪 End Class</button>
        </div>
      </div>

      {/* Current Lesson Bar */}
      <div style={{ backgroundColor: 'rgba(255,215,0,0.15)', padding: '8px', textAlign: 'center', borderBottom: '1px solid rgba(255,215,0,0.3)' }}>
        <span style={{ color: '#d8b4fe', fontSize: '12px' }}>📖 CURRENT LESSON: </span>
        <span style={{ color: '#FFD700', fontWeight: 'bold' }}>{classroom?.current_lesson || 'Welcome!'}</span>
      </div>

      {/* Main Layout */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* LEFT — Camera + Students + Chat */}
        <div style={{ width: '260px', display: 'flex', flexDirection: 'column', backgroundColor: 'rgba(0,0,0,0.4)', borderRight: '1px solid rgba(255,255,255,0.1)', overflow: 'auto' }}>

          {/* Camera */}
          <div style={{ padding: '10px' }}>
            <div style={{ backgroundColor: '#000', borderRadius: '15px', overflow: 'hidden', position: 'relative', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <video ref={videoRef} autoPlay muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', display: cameraOn ? 'block' : 'none' }} />
              {!cameraOn && (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '40px' }}>📷</div>
                  <p style={{ color: '#d8b4fe', fontSize: '12px' }}>Camera Off</p>
                </div>
              )}
            </div>
            <button onClick={cameraOn ? stopCamera : startCamera}
              style={{ width: '100%', marginTop: '8px', backgroundColor: cameraOn ? '#FF6B6B' : '#4ECDC4', color: 'white', border: 'none', borderRadius: '10px', padding: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' }}>
              {cameraOn ? '📷 Stop Camera' : '📷 Start Camera'}
            </button>
          </div>

          {/* Students */}
          <div style={{ padding: '10px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <h4 style={{ color: '#FFD700', margin: '0 0 8px 0', fontSize: '14px' }}>👥 Students ({students.length})</h4>
            {students.length === 0
              ? <p style={{ color: '#d8b4fe', fontSize: '12px', textAlign: 'center' }}>Waiting...</p>
              : students.map(s => (
                <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', padding: '6px' }}>
                  <span style={{ fontSize: '20px' }}>{s.avatar}</span>
                  <span style={{ fontSize: '13px', flex: 1 }}>{s.student_name}</span>
                  {s.hand_raised === 1 && <span style={{ fontSize: '16px' }}>🙋</span>}
                </div>
              ))
            }
          </div>

          {/* Hands Raised */}
          {students.filter(s => s.hand_raised === 1).length > 0 && (
            <div style={{ padding: '10px', borderTop: '1px solid rgba(255,107,107,0.3)', backgroundColor: 'rgba(255,107,107,0.1)' }}>
              <h4 style={{ color: '#FF6B6B', margin: '0 0 8px 0', fontSize: '14px' }}>🙋 Hands Raised!</h4>
              {students.filter(s => s.hand_raised === 1).map(s => (
                <div key={s.id} style={{ backgroundColor: 'rgba(255,107,107,0.3)', borderRadius: '8px', padding: '5px 8px', marginBottom: '4px', fontSize: '13px' }}>
                  {s.avatar} {s.student_name}
                </div>
              ))}
            </div>
          )}

          {/* Chat */}
          <div style={{ flex: 1, padding: '10px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column' }}>
            <h4 style={{ color: '#FFD700', margin: '0 0 8px 0', fontSize: '14px' }}>💬 Chat</h4>
            <div style={{ flex: 1, overflowY: 'auto', maxHeight: '200px', marginBottom: '8px' }}>
              {messages.map((m, i) => (
                <div key={i} style={{ marginBottom: '8px' }}>
                  <div style={{ fontSize: '10px', color: '#d8b4fe' }}>{m.sender}</div>
                  <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', padding: '5px 8px', fontSize: '12px', wordBreak: 'break-word' }}>{m.message}</div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <div style={{ display: 'flex', gap: '5px' }}>
              <input value={newMessage} onChange={e => setNewMessage(e.target.value)} onKeyPress={e => e.key === 'Enter' && sendMessage()}
                placeholder="Message..." style={{ flex: 1, padding: '6px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', fontSize: '12px' }} />
              <button onClick={sendMessage} style={{ backgroundColor: '#FFD700', color: 'black', border: 'none', borderRadius: '8px', padding: '6px 10px', cursor: 'pointer' }}>➤</button>
            </div>
          </div>
        </div>

        {/* MIDDLE — Whiteboard */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

          {/* Whiteboard Tools */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 15px', backgroundColor: 'rgba(0,0,0,0.4)', borderBottom: '1px solid rgba(255,255,255,0.1)', flexWrap: 'wrap' }}>
            {/* Tool buttons */}
            {[['✏️','pen'],['🔤','text'],['⬜','eraser']].map(([e,t]) => (
              <button key={t} onClick={() => setTool(t)}
                style={{ backgroundColor: tool === t ? '#FFD700' : 'rgba(255,255,255,0.1)', color: tool === t ? 'black' : 'white', border: 'none', borderRadius: '8px', padding: '6px 12px', cursor: 'pointer', fontSize: '14px' }}>
                {e}
              </button>
            ))}

            <div style={{ width: '1px', height: '25px', backgroundColor: 'rgba(255,255,255,0.2)' }} />

            {/* Colors */}
            {colors.map(c => (
              <div key={c} onClick={() => setColor(c)}
                style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: c, cursor: 'pointer', border: color === c ? '3px solid white' : '2px solid rgba(255,255,255,0.3)' }} />
            ))}

            <div style={{ width: '1px', height: '25px', backgroundColor: 'rgba(255,255,255,0.2)' }} />

            {/* Brush size */}
            <input type="range" min="1" max="15" value={brushSize} onChange={e => setBrushSize(Number(e.target.value))}
              style={{ width: '80px' }} />

            <button onClick={clearBoard}
              style={{ backgroundColor: '#FF6B6B', color: 'white', border: 'none', borderRadius: '8px', padding: '6px 12px', cursor: 'pointer', fontSize: '13px', marginLeft: 'auto' }}>
              🗑️ Clear
            </button>
          </div>

          {/* Canvas */}
          <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
            <canvas ref={canvasRef} width={900} height={600}
              style={{ backgroundColor: '#1a1a2e', cursor: tool === 'eraser' ? 'cell' : tool === 'text' ? 'text' : 'crosshair', width: '100%', height: '100%' }}
              onMouseDown={startDraw} onMouseMove={draw} onMouseUp={stopDraw} onMouseLeave={stopDraw}
              onTouchStart={startDraw} onTouchMove={draw} onTouchEnd={stopDraw}
            />

            {/* Text input box */}
            {showTextBox && (
              <div style={{ position: 'absolute', top: textPos.y, left: textPos.x, zIndex: 10 }}>
                <input autoFocus value={textInput} onChange={e => setTextInput(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && addText()}
                  placeholder="Type here..."
                  style={{ backgroundColor: 'rgba(0,0,0,0.8)', color, border: `2px solid ${color}`, borderRadius: '5px', padding: '5px', fontSize: `${brushSize * 3 + 10}px`, minWidth: '150px', outline: 'none' }} />
                <button onClick={addText} style={{ marginLeft: '5px', backgroundColor: '#FFD700', color: 'black', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' }}>✅</button>
                <button onClick={() => setShowTextBox(false)} style={{ marginLeft: '3px', backgroundColor: '#FF6B6B', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' }}>✕</button>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT — Lesson Picker */}
        <div style={{ width: '220px', backgroundColor: 'rgba(0,0,0,0.4)', borderLeft: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
          <div style={{ padding: '10px' }}>
            <h4 style={{ color: '#FFD700', margin: '0 0 10px 0', fontSize: '14px' }}>📚 Pick Lesson</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {lessons.map(lesson => (
                <button key={lesson} onClick={() => changeLesson(lesson)}
                  style={{ backgroundColor: classroom?.current_lesson === lesson ? '#FFD700' : 'rgba(255,255,255,0.1)', color: classroom?.current_lesson === lesson ? 'black' : 'white', border: 'none', borderRadius: '8px', padding: '8px', cursor: 'pointer', fontSize: '12px', textAlign: 'left', fontWeight: classroom?.current_lesson === lesson ? 'bold' : 'normal' }}>
                  {lesson}
                </button>
              ))}
            </div>
            <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <input value={newLesson} onChange={e => setNewLesson(e.target.value)}
                placeholder="Custom lesson..."
                style={{ padding: '6px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', fontSize: '12px' }} />
              <button onClick={() => { changeLesson(newLesson); setNewLesson('') }}
                style={{ backgroundColor: '#4ECDC4', color: 'white', border: 'none', borderRadius: '8px', padding: '6px', cursor: 'pointer', fontSize: '12px' }}>
                ✅ Set Lesson
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeacherClassroom