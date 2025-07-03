import React from 'react'
import Layout from './components/LandingPage'  
import { AppRoutes } from './routes'

export default function App() {
  return (
    <Layout>
      <AppRoutes />
    </Layout>
  )
}