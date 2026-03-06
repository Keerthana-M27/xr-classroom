import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import StudentDashboard from './pages/StudentDashboard'
import TeacherDashboard from './pages/TeacherDashboard'
import LessonView from './pages/LessonView'
import Quiz from './pages/Quiz'
import Badges from './pages/Badges'
import Classroom from './pages/Classroom'
import TeacherClassroom from './pages/TeacherClassroom'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/lesson" element={<LessonView />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/badges" element={<Badges />} />
        <Route path="/classroom" element={<Classroom />} />
        <Route path="/teacher-classroom" element={<TeacherClassroom />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App