import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Background3D from '../components/Background3D'

function StudentDashboard() {
  const navigate = useNavigate()
  const location = useLocation()
  const name = location.state?.name || 'Student'

  const [activeMenu, setActiveMenu] = useState('subjects')
  const [selectedSubject, setSelectedSubject] = useState(null)

  const subjects = [
    { name: 'Math', emoji: '🔢', color: '#FF6B6B' },
    { name: 'Science', emoji: '🔬', color: '#4ECDC4' },
    { name: 'English', emoji: '📖', color: '#45B7D1' },
    { name: 'Computers', emoji: '💻', color: '#96CEB4' },
    { name: 'Geography', emoji: '🌍', color: '#FFEAA7' },
    { name: 'Art', emoji: '🎨', color: '#DDA0DD' },
    { name: 'Health & Body', emoji: '🏃', color: '#FF9F43' },
  ]

  const allLessons = {
    Math: [
      { title: 'Addition', emoji: '➕', color: '#FF6B6B' },
      { title: 'Subtraction', emoji: '➖', color: '#4ECDC4' },
      { title: 'Multiplication', emoji: '✖️', color: '#45B7D1' },
      { title: 'Division', emoji: '➗', color: '#96CEB4' },
    ],
    Science: [
      { title: 'Solar System', emoji: '🪐', color: '#FF6B6B' },
      { title: 'Animals', emoji: '🦁', color: '#4ECDC4' },
      { title: 'Plants', emoji: '🌱', color: '#45B7D1' },
      { title: 'Human Body', emoji: '🫀', color: '#96CEB4' },
    ],
    English: [
      { title: 'Alphabets', emoji: '🔤', color: '#FF6B6B' },
      { title: 'Spellings', emoji: '✏️', color: '#4ECDC4' },
      { title: 'Grammar', emoji: '📝', color: '#45B7D1' },
      { title: 'Stories', emoji: '📖', color: '#96CEB4' },
    ],
    Computers: [
      { title: 'What is Computer', emoji: '💻', color: '#FF6B6B' },
      { title: 'Keyboard & Mouse', emoji: '⌨️', color: '#4ECDC4' },
      { title: 'Paint & Draw', emoji: '🖼️', color: '#45B7D1' },
      { title: 'Fun Games', emoji: '🎮', color: '#96CEB4' },
    ],
    Geography: [
      { title: 'Continents', emoji: '🌍', color: '#FF6B6B' },
      { title: 'Oceans', emoji: '🌊', color: '#4ECDC4' },
      { title: 'Mountains', emoji: '🏔️', color: '#45B7D1' },
      { title: 'Countries', emoji: '🗺️', color: '#96CEB4' },
    ],
    Art: [
      { title: 'Drawing', emoji: '🎨', color: '#FF6B6B' },
      { title: 'Colours', emoji: '🖌️', color: '#4ECDC4' },
      { title: 'Craft', emoji: '✂️', color: '#45B7D1' },
      { title: 'Sculpture', emoji: '🗿', color: '#96CEB4' },
    ],
    'Health & Body': [
      { title: 'Healthy Food', emoji: '🥦', color: '#FF6B6B' },
      { title: 'Exercise', emoji: '🏃', color: '#4ECDC4' },
      { title: 'Hygiene', emoji: '🧼', color: '#45B7D1' },
      { title: 'Body Parts', emoji: '🧍', color: '#96CEB4' },
    ],
  }

  const menuItems = [
    { id: 'subjects', emoji: '📚', label: 'Subjects' },
    { id: 'games', emoji: '🎮', label: 'Finished Games' },
    { id: 'missed', emoji: '❌', label: 'Missed Classes' },
  ]

  const renderContent = () => {
    switch (activeMenu) {

      case 'subjects':
        return (
          <div>
            {!selectedSubject ? (
              <>
                <h2 style={{ fontSize: '30px', color: '#FFD700', marginBottom: '10px' }}>📚 Pick a Subject!</h2>
                <p style={{ color: '#d8b4fe', marginBottom: '30px' }}>What do you want to learn today?</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                  {subjects.map((subject) => (
                    <div key={subject.name} onClick={() => setSelectedSubject(subject.name)}
                      style={{ backgroundColor: subject.color, borderRadius: '20px', padding: '25px 15px', textAlign: 'center', cursor: 'pointer', boxShadow: '0 8px 20px rgba(0,0,0,0.3)', transition: 'transform 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                      <div style={{ fontSize: '45px', marginBottom: '10px' }}>{subject.emoji}</div>
                      <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>{subject.name}</div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h2 style={{ fontSize: '30px', color: '#FFD700', marginBottom: '10px' }}>{selectedSubject} Lessons!</h2>
                <p onClick={() => setSelectedSubject(null)} style={{ color: '#d8b4fe', marginBottom: '30px', cursor: 'pointer' }}>⬅️ Back to Subjects</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                  {allLessons[selectedSubject].map((lesson) => (
                    <div key={lesson.title}
                      onClick={() => navigate('/lesson', { state: { lesson: lesson.title, subject: selectedSubject, name } })}
                      style={{ backgroundColor: lesson.color, borderRadius: '20px', padding: '25px 15px', textAlign: 'center', cursor: 'pointer', boxShadow: '0 8px 20px rgba(0,0,0,0.3)', transition: 'transform 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                      <div style={{ fontSize: '45px', marginBottom: '10px' }}>{lesson.emoji}</div>
                      <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>{lesson.title}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )

      case 'games':
        return (
          <div>
            <h2 style={{ fontSize: '30px', color: '#FFD700', marginBottom: '20px' }}>🎮 Finished Games</h2>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '20px', padding: '30px', textAlign: 'center' }}>
              <div style={{ fontSize: '60px', marginBottom: '15px' }}>🏆</div>
              <p style={{ color: '#d8b4fe', fontSize: '18px' }}>No finished games yet! Complete a quiz to see your results here! 🌟</p>
            </div>
          </div>
        )

      case 'missed':
        return (
          <div>
            <h2 style={{ fontSize: '30px', color: '#FFD700', marginBottom: '20px' }}>❌ Missed Classes</h2>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '20px', padding: '30px', textAlign: 'center' }}>
              <div style={{ fontSize: '60px', marginBottom: '15px' }}>😊</div>
              <p style={{ color: '#d8b4fe', fontSize: '18px' }}>You have not missed any classes! Great job! 🌟</p>
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
            <span style={{ fontSize: '30px' }}>👤</span>
            <div>
              <p style={{ margin: 0, fontWeight: 'bold', fontSize: '16px' }}>{name}</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#d8b4fe' }}>Student</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ display: 'flex', flex: 1 }}>

          {/* Left Sidebar */}
          <div style={{ width: '220px', backgroundColor: 'rgba(0,0,0,0.3)', padding: '30px 15px', borderRight: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: '10px' }}>

            {menuItems.map((item) => (
              <div key={item.id} onClick={() => { setActiveMenu(item.id); setSelectedSubject(null) }}
                style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '15px', borderRadius: '15px', cursor: 'pointer', backgroundColor: activeMenu === item.id ? 'rgba(255,215,0,0.2)' : 'transparent', border: activeMenu === item.id ? '2px solid #FFD700' : '2px solid transparent', transition: 'all 0.2s' }}>
                <span style={{ fontSize: '24px' }}>{item.emoji}</span>
                <span style={{ fontSize: '16px', fontWeight: activeMenu === item.id ? 'bold' : 'normal', color: activeMenu === item.id ? '#FFD700' : 'white' }}>
                  {item.label}
                </span>
              </div>
            ))}

            {/* Enter Classroom Button */}
            <div onClick={() => navigate('/classroom', { state: { name } })}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '15px', borderRadius: '15px', cursor: 'pointer', backgroundColor: 'rgba(78,205,196,0.3)', border: '2px solid #4ECDC4', marginTop: '10px' }}>
              <span style={{ fontSize: '24px' }}>🏫</span>
              <span style={{ fontSize: '16px', color: '#4ECDC4', fontWeight: 'bold' }}>Enter Classroom</span>
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

export default StudentDashboard