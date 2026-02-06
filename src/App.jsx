import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import { useSelector } from 'react-redux'

function App() {
  const theme = useSelector(state => state.ui.theme)

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: theme === 'light' ? '#fff' : '#222',
        color: theme === 'light' ? '#000' : '#fff',
        transition: 'all 0.3s ease',
      }}
    >
      <Header />
      <Home />
      <Footer />
    </div>
  )
}

export default App