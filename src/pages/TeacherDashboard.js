import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Background3D from '../components/Background3D'

function TeacherDashboard() {
  const navigate = useNavigate()
  const location = useLocation()
  const teacherName = location.state?.name || 'Teacher'
  const [activeMenu, setActiveMenu] = useState('overview')

  const menuItems = [
    { id: 'overview', emoji: '🏠', label: 'Overview' },
    { id: 'students', emoji: '👦', label: 'My Students' },
    { id: 'lessons', emoji: '📚', label: 'Lessons' },
    { id: 'attendance', emoji: '✅', label: 'Attendance' },
    { id: 'results', emoji: '🏆', label: 'Quiz Results' },
  ]

  const students = [
    { name: 'Aarav', emoji: '👦', status: 'Present', score: 90 },
    { name: 'Priya', emoji: '👧', status: 'Present', score: 85 },
    { name: 'Ravi', emoji: '👦', status: 'Absent', score: 70 },
    { name: 'Sneha', emoji: '👧', status: 'Present', score: 95 },
    { name: 'Kiran', emoji: '👦', status: 'Absent', score: 60 },
    { name: 'Meera', emoji: '👧', status: 'Present', score: 88 },
  ]

  const lessons = [
    { subject: 'Math', topic: 'Addition', emoji: '➕', color: '#FF6B6B' },
    { subject: 'Science', topic: 'Solar System', emoji: '🪐', color: '#4ECDC4' },
    { subject: 'English', topic: 'Grammar', emoji: '📝', color: '#45B7D1' },
    { subject: 'History', topic: 'Ancient Egypt', emoji: '🏺', color: '#96CEB4' },
  ]

  const renderContent = () => {
    switch (activeMenu) {

      case 'overview':
        return (
          <div>
            <h2 style={{ fontSize: '30px', color: '#FFD700', marginBottom: '10px' }}>
              👋 Welcome, {teacherName}!
            </h2>
            <p style={{ color: '#d8b4fe', marginBottom: '30px' }}>
              Here is your class overview for today!
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
              {[
                { label: 'Total Students', value: '6', emoji: '👦', color: '#FF6B6B' },
                { label: 'Present Today', value: '4', emoji: '✅', color: '#4ECDC4' },
                { label: 'Lessons Today', value: '4', emoji: '📚', color: '#FFD700' },
              ].map((stat) => (
                <div key={stat.label} style={{ backgroundColor: stat.color, borderRadius: '20px', padding: '25px', textAlign: 'center', boxShadow: '0 8px 20px rgba(0,0,0,0.3)' }}>
                  <div style={{ fontSize: '40px', marginBottom: '10px' }}>{stat.emoji}</div>
                  <div style={{ fontSize: '35px', fontWeight: 'bold', color: 'white' }}>{stat.value}</div>
                  <div style={{ fontSize: '16px', color: 'white' }}>{stat.label}</div>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '20px', padding: '25px', textAlign: 'center' }}>
              <p style={{ color: '#d8b4fe', fontSize: '18px', marginBottom: '10px' }}>🔑 Your Class Code</p>
              <h1 style={{ fontSize: '50px', color: '#FFD700', letterSpacing: '10px' }}>1234</h1>
              <p style={{ color: '#d8b4fe', fontSize: '14px' }}>Share this code with your students to join!</p>
            </div>
          </div>
        )

      case 'students':
        return (
          <div>
            <h2 style={{ fontSize: '30px', color: '#FFD700', marginBottom: '10px' }}>👦 My Students</h2>
            <p style={{ color: '#d8b4fe', marginBottom: '30px' }}>All students in your class!</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              {students.map((student) => (
                <div key={student.name} style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '20px', padding: '25px', textAlign: 'center', boxShadow: '0 8px 20px rgba(0,0,0,0.3)' }}>
                  <div style={{ fontSize: '50px', marginBottom: '10px' }}>{student.emoji}</div>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '5px' }}>{student.name}</div>
                  <div style={{ fontSize: '14px', color: student.status === 'Present' ? '#4ECDC4' : '#FF6B6B', marginBottom: '5px' }}>
                    {student.status === 'Present' ? '✅' : '❌'} {student.status}
                  </div>
                  <div style={{ fontSize: '14px', color: '#FFD700' }}>🏆 Score: {student.score}%</div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'lessons':
        return (
          <div>
            <h2 style={{ fontSize: '30px', color: '#FFD700', marginBottom: '10px' }}>📚 Today's Lessons</h2>
            <p style={{ color: '#d8b4fe', marginBottom: '30px' }}>Lessons scheduled for today!</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
              {lessons.map((lesson) => (
                <div key={lesson.topic} style={{ backgroundColor: lesson.color, borderRadius: '20px', padding: '25px', textAlign: 'center', boxShadow: '0 8px 20px rgba(0,0,0,0.3)', cursor: 'pointer', transition: 'transform 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                  <div style={{ fontSize: '50px', marginBottom: '10px' }}>{lesson.emoji}</div>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>{lesson.topic}</div>
                  <div style={{ fontSize: '14px', color: 'white', marginTop: '5px' }}>{lesson.subject}</div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'attendance':
        return (
          <div>
            <h2 style={{ fontSize: '30px', color: '#FFD700', marginBottom: '10px' }}>✅ Attendance</h2>
            <p style={{ color: '#d8b4fe', marginBottom: '30px' }}>Today's attendance!</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {students.map((student) => (
                <div key={student.name} style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '15px', padding: '20px 25px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <span style={{ fontSize: '35px' }}>{student.emoji}</span>
                    <span style={{ fontSize: '20px', fontWeight: 'bold' }}>{student.name}</span>
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', color: student.status === 'Present' ? '#4ECDC4' : '#FF6B6B', backgroundColor: student.status === 'Present' ? 'rgba(78,205,196,0.2)' : 'rgba(255,107,107,0.2)', padding: '8px 20px', borderRadius: '50px' }}>
                    {student.status === 'Present' ? '✅ Present' : '❌ Absent'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'results':
        return (
          <div>
            <h2 style={{ fontSize: '30px', color: '#FFD700', marginBottom: '10px' }}>🏆 Quiz Results</h2>
            <p style={{ color: '#d8b4fe', marginBottom: '30px' }}>How your students performed!</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {students.sort((a, b) => b.score - a.score).map((student, index) => (
                <div key={student.name} style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '15px', padding: '20px 25px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <span style={{ fontSize: '25px' }}>{index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🏅'}</span>
                    <span style={{ fontSize: '35px' }}>{student.emoji}</span>
                    <span style={{ fontSize: '20px', fontWeight: 'bold' }}>{student.name}</span>
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: student.score >= 85 ? '#4ECDC4' : student.score >= 70 ? '#FFD700' : '#FF6B6B' }}>
                    {student.score}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #0f0c29, #302b63, #24243e)', color: 'white', fontFamily: 'Arial, sans-serif', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <Background3D />
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', flex: 1 }}>

        {/* Top Navbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 30px', backgroundColor: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <h1 style={{ fontSize: '24px', color: '#FFD700', margin: 0 }}>🚀 XR Classroom</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: 'rgba(255,255,255,0.1)', padding: '10px 20px', borderRadius: '50px' }}>
            <span style={{ fontSize: '30px' }}>👩‍🏫</span>
            <div>
              <p style={{ margin: 0, fontWeight: 'bold', fontSize: '16px' }}>{teacherName}</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#d8b4fe' }}>Class Code: 1234</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ display: 'flex', flex: 1 }}>

          {/* Left Sidebar */}
          <div style={{ width: '220px', backgroundColor: 'rgba(0,0,0,0.3)', padding: '30px 15px', borderRight: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: '10px' }}>

            {menuItems.map((item) => (
              <div key={item.id} onClick={() => setActiveMenu(item.id)}
                style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '15px', borderRadius: '15px', cursor: 'pointer', backgroundColor: activeMenu === item.id ? 'rgba(255,107,107,0.2)' : 'transparent', border: activeMenu === item.id ? '2px solid #FF6B6B' : '2px solid transparent', transition: 'all 0.2s' }}>
                <span style={{ fontSize: '24px' }}>{item.emoji}</span>
                <span style={{ fontSize: '16px', fontWeight: activeMenu === item.id ? 'bold' : 'normal', color: activeMenu === item.id ? '#FF6B6B' : 'white' }}>
                  {item.label}
                </span>
              </div>
            ))}

            {/* Start Classroom Button */}
            <div onClick={() => navigate('/teacher-classroom', { state: { name: teacherName } })}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '15px', borderRadius: '15px', cursor: 'pointer', backgroundColor: 'rgba(255,215,0,0.3)', border: '2px solid #FFD700', marginTop: '10px' }}>
              <span style={{ fontSize: '24px' }}>🏫</span>
              <span style={{ fontSize: '16px', color: '#FFD700', fontWeight: 'bold' }}>Start Classroom</span>
            </div>

            {/* Logout */}
            <div onClick={() => navigate('/')}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '15px', borderRadius: '15px', cursor: 'pointer', marginTop: 'auto', color: '#FF6B6B' }}>
              <span style={{ fontSize: '24px' }}>🚪</span>
              <span style={{ fontSize: '16px' }}>Logout</span>
            </div>

          </div>

          {/* Right Content */}
          <div style={{ flex: 1, padding: '40px' }}>
            {renderContent()}
          </div>

        </div>
      </div>
    </div>
  )
}

export default TeacherDashboard