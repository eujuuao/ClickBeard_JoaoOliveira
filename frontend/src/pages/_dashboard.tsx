import React, { useEffect, useState } from 'react'
import { api } from '../services/api'

type Appointment = { id: number; barber: string; specialty: string; time: string }

export default function dashboard() {
  const [apps, setApps] = useState<Appointment[]>([])
  useEffect(()=> {
    api.get('/appointments').then(r=>setApps(r.data))
  },[])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Your Appointments</h1>
      <ul className="space-y-2">
        {apps.map(a=>(
          <li key={a.id} className="p-4 bg-white rounded shadow flex justify-between">
            <div>
              <p><strong>{a.specialty}</strong> with {a.barber}</p>
              <p className="text-sm text-gray-500">{new Date(a.time).toLocaleString()}</p>
            </div>
            <button className="text-red-500">Cancel</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
