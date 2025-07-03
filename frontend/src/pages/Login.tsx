import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { api } from '../services/api'
import Layout from '../components/layout'

export default function Login() {
  const [email, setEmail] = useState(''), [pw, setPw] = useState('')
  const nav = useNavigate()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await api.post('/auth/login',{email,password:pw})
      // guarde token e role no localStorage…
      nav('/dashboard')
    } catch {
      alert('Credenciais inválidas')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
        <label className="block mb-2">Email
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
            className="w-full border p-2 rounded" required/>
        </label>
        <label className="block mb-4">Password
          <input type="password" value={pw} onChange={e=>setPw(e.target.value)}
            className="w-full border p-2 rounded" required/>
        </label>
        <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded">
          Sign In
        </button>
        <p className="mt-4 text-center text-sm">
          Don’t have an account? <Link to="/signup" className="text-indigo-600">Sign Up</Link>
        </p>
      </form>
    </div>
  )
}