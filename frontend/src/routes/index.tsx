import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/login'
import Signup from '../pages/Signup'
import Dashboard from '../pages/Dashboard'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="*" element={<Navigate to="/login" replace/>}/>
      </Routes>
    </BrowserRouter>
  )
}