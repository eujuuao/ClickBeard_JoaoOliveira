import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/_login'
import Signup from '../pages/_signup'
import Dashboard from '../pages/_dashboard'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}