import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchOperators, selectOperator } from '../features/operators/operatorsSlice'
import styles from './Home.module.css'

const Home = () => {
  const dispatch = useDispatch()
  
  const { items, selectedOperator, status } = useSelector(state => state.operators)
  const theme = useSelector(state => state.ui.theme)

  useEffect(() => {
    dispatch(fetchOperators())
  }, [dispatch])

  return (
    <main className={`${styles.container} ${theme === 'dark' ? styles.dark : styles.light}`}>
      <h2 className={styles.title}>ТЕРМИНАЛ: СПИСОК ОПЕРАТОРОВ</h2>

      {status === 'loading' && <div className={styles.loader}>[ ПОДКЛЮЧЕНИЕ К СЕРВЕРУ... ]</div>}

      {status === 'succeeded' && (
        <div className={styles.layout}>
          {/* ЛЕВАЯ ЧАСТЬ: СПИСОК */}
          <section className={styles.listSide}>
            {items.map(op => (
              <div 
                key={op.id} 
                className={styles.opCard} 
                onClick={() => dispatch(selectOperator(op))}
              >
                <span className={styles.opId}>ID-{op.id}</span>
                <span className={styles.opName}>{op.name}</span>
              </div>
            ))}
          </section>

          {/* ПРАВАЯ ЧАСТЬ: ДЕТАЛИ */}
          <section className={styles.detailSide}>
            {selectedOperator ? (
              <div className={styles.detailCard}>
                <h3>ЛИЧНОЕ ДЕЛО: {selectedOperator.name}</h3>
                <p><strong>КОДОВОЕ ИМЯ:</strong> {selectedOperator.codeName}</p>
                <p><strong>ОТДЕЛ:</strong> {selectedOperator.department}</p>
                <p><strong>EMAIL:</strong> {selectedOperator.email}</p>
                <div className={styles.statusBadge}>STATUS: ACTIVE</div>
              </div>
            ) : (
              <div className={styles.emptyDetail}>ОЖИДАНИЕ ВЫБОРА ОБЪЕКТА...</div>
            )}
          </section>
        </div>
      )}
    </main>
  )
}

export default Home 