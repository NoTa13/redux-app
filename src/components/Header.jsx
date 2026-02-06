import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../features/ui/uiSlice'
import styles from './Header.module.css'

const Header = () => {
  const dispatch = useDispatch()
  const theme = useSelector(state => state.ui.theme)

  return (
    <header className={`${styles.header} ${theme === 'dark' ? styles.dark : styles.light}`}>
      <div className={styles.logo}>
        <span className={styles.bracket}>[</span> 
        ENDFIELD OPS 
        <span className={styles.bracket}>]</span>
      </div>
      
      <nav className={styles.nav}>
        {/* Будущие разделы проекта */}
        <a href="#base" className={styles.navLink}>Строительство Базы</a>
        <a href="#operators" className={styles.navLink}>Операторы</a>
        <a href="#map" className={styles.navLink}>Карта Талос-II</a>
        <a href="#protocol" className={styles.navLink}>Протоколы</a>
        
        <button className={styles.themeBtn} onClick={() => dispatch(toggleTheme())}>
          {theme === 'light' ? '⚡ АКТИВИРОВАТЬ НОЧЬ' : '☀️ ДНЕВНОЙ ЦИКЛ'}
        </button>
      </nav>
    </header>
  )
}

export default Header