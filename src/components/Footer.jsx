import React from 'react'
import { useSelector } from 'react-redux'

const Footer = () => {
  const theme = useSelector(state => state.ui.theme)

  return (
    <footer
      style={{
        padding: '20px',
        background: theme === 'light' ? '#eee' : '#333',
        color: theme === 'light' ? '#000' : '#fff',
        textAlign: 'center',
        marginTop: 'auto',
        transition: 'all 0.3s ease',
      }}
    >
      <p>© 2026 Мой сайт</p>
    </footer>
  )
}

export default Footer