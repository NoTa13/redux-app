import React from 'react'
import { useSelector } from 'react-redux'
import styles from './Home.module.css'

const Home = () => {
  const theme = useSelector(state => state.ui.theme)

  return (
    <main className={`${styles.container} ${theme === 'dark' ? styles.dark : styles.light}`}>
      <div className={styles.overlay}>
        <h2 className={styles.title}>ИНИЦИАЦИЯ ПРОТОКОЛА: ENDFIELD</h2>
        <div className={styles.statusBox}>
          <p>Объект: Планета Талос-II</p>
          <p>Статус связи: <span className={styles.blink}>УСТАНОВЛЕНО</span></p>
        </div>
        <p className={styles.description}>
          Добро пожаловать, Протокол-менеджер. Ваша задача — развернуть 
          автоматизированные производственные линии и подготовить территорию 
          к прибытию основных сил Endfield Industries.
        </p>
      </div>
    </main>
  )
}

export default Home