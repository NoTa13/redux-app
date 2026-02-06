import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
  const theme = useSelector(state => state.ui.theme)

  return (
    <main
      style={{
        padding: '40px',
        minHeight: '60vh',
        background: theme === 'light' ? '#fff' : '#222',
        color: theme === 'light' ? '#000' : '#fff',
        transition: 'all 0.3s ease',
      }}
    >
      <h2>Главная страница</h2>
      <p>Добро пожаловать на сайт REDUXI</p>
    </main>
  )
}

export default Home