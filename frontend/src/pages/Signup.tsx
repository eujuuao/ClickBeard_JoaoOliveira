import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { api } from '../services/api'

export default function Signup() {
  const [name, setName] = useState(''), [email, setEmail] = useState(''), [pw, setPw] = useState('')
  const nav = useNavigate()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.post('/auth/signup',{name,email,password:pw})
      nav('/login')
    } catch {
      alert('Erro no cadastro')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        <label className="block mb-2">Full Name
          <input type="text" value={name} onChange={e=>setName(e.target.value)}
            className="w-full border p-2 rounded" required/>
        </label>
        <label className="block mb-2">Email
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
            className="w-full border p-2 rounded" required/>
        </label>
        <label className="block mb-4">Password
          <input type="password" value={pw} onChange={e=>setPw(e.target.value)}
            className="w-full border p-2 rounded" required/>
        </label>
        <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded">
          Create Account
        </button>
        <p className="mt-4 text-center text-sm">
          Already have one? <Link to="/login" className="text-indigo-600">Sign In</Link>
        </p>
      </form>
    </div>
  )
}
