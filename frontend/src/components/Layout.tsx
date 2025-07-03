// import React, { ReactNode } from 'react'
// import { Link, useLocation } from 'react-router-dom'
// import { Scissors } from 'lucide-react'

// export default function Layout({ children }: { children: ReactNode }) {
//   const loc = useLocation().pathname
//   // Se estivermos em /login ou /signup, pula header/footer
//   if (['/login','/signup'].includes(loc)) return <div className="min-h-screen bg-gray-50">{children}</div>

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-100">
//       <header className="bg-white shadow">
//         <nav className="container mx-auto p-4 flex justify-between">
//           <Link to="/" className="flex items-center space-x-2">
//             <Scissors className="w-6 h-6 text-indigo-600"/>
//             <span className="text-xl font-bold">ClickBeard</span>
//           </Link>
//           <Link to="/dashboard" className="text-gray-700 hover:text-indigo-600">Dashboard</Link>
//         </nav>
//       </header>
//       <main className="flex-1 container mx-auto p-6">{children}</main>
//       <footer className="bg-white border-t p-4 text-center text-sm text-gray-500">
//         &copy; {new Date().getFullYear()} ClickBeard
//       </footer>
//     </div>
//   )
// }