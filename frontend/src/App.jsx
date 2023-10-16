import './App.css'
// index.js or another appropriate file
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import Studentsignup from './components/Form/Signup/Student'
import Studentlogin from './components/Form/Login/Student'
import Teacherlogin from './components/Form/Login/Teacher'
import LandingPage from './components/Pages/LandingPage/LandingPage';
import TeacherDashboard from './components/Pages/Dashboard/Teacher';
import StudentDashboard from './components/Pages/Dashboard/Student';
import AdminDashboard from './components/Pages/Dashboard/Admin';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/student/login" element={<Studentlogin />} />
        <Route path="/student/signup" element={<Studentsignup />} />
        <Route path="/teacher/login" element={<Teacherlogin />} />
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  )
}

export default App
