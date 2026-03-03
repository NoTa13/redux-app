import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Импортируем все созданные экшены
import { 
  fetchOperators, 
  selectOperator, 
  addOperator, 
  deleteOperator, 
  updateOperator 
} from '../features/operators/operatorsSlice';
import styles from './Home.module.css';

const Home = () => {
  const dispatch = useDispatch();
  const { items, selectedOperator, status } = useSelector(state => state.operators);
  const theme = useSelector(state => state.ui.theme);
  
  // Локальное состояние для инпута (создание нового)
  const [newName, setNewName] = useState('');

  useEffect(() => {
    if (status === 'idle') dispatch(fetchOperators());
  }, [status, dispatch]);

  // Функция CREATE
  const handleCreate = () => {
    if (!newName.trim()) return;
    const newOp = { 
      id: Date.now(), // Временный ID
      name: newName, 
      codeName: 'RECRUIT-' + Math.floor(Math.random() * 100), 
      department: 'Endfield Frontier', 
      status: 'Active' 
    };
    dispatch(addOperator(newOp));
    setNewName('');
  };

  return (
    <main className={`${styles.container} ${theme === 'dark' ? styles.dark : styles.light}`}>
      <h2 className={styles.title}>УПРАВЛЕНИЕ ОПЕРАТОРАМИ ENDFIELD</h2>

      {/* ФОРМА СОЗДАНИЯ (CREATE) */}
      <div className={styles.adminPanel}>
        <input 
          value={newName} 
          onChange={(e) => setNewName(e.target.value)} 
          placeholder="Введите имя нового сотрудника..." 
          className={styles.input}
        />
        <button onClick={handleCreate} className={styles.addBtn}>+ ЗАРЕГИСТРИРОВАТЬ</button>
      </div>

      {status === 'loading' && <div className={styles.loader}>[ ЗАГРУЗКА ДАННЫХ... ]</div>}

      {status === 'succeeded' && (
        <div className={styles.layout}>
          {/* СПИСОК (READ & DELETE) */}
          <section className={styles.listSide}>
            {items.map(op => (
              <div 
                key={op.id} 
                className={`${styles.opCard} ${selectedOperator?.id === op.id ? styles.activeCard : ''}`}
                onClick={() => dispatch(selectOperator(op))}
              >
                <div>
                  <div className={styles.opId}>ID-{op.id}</div>
                  <div className={styles.opName}>{op.name}</div>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); dispatch(deleteOperator(op.id)); }} 
                  className={styles.delBtn}
                >
                  УДАЛИТЬ
                </button>
              </div>
            ))}
          </section>

          {/* ДЕТАЛИ (UPDATE) */}
          <section className={styles.detailSide}>
            {selectedOperator ? (
              <div className={styles.detailCard}>
                <h3>ДОСЬЕ: {selectedOperator.name}</h3>
                <p><strong>ОТДЕЛ:</strong> {selectedOperator.department}</p>
                <p><strong>ПОЗЫВНОЙ:</strong> {selectedOperator.codeName}</p>
                
                <button 
                  onClick={() => dispatch(updateOperator({
                    ...selectedOperator, 
                    name: selectedOperator.name + ' [ВЕТЕРАН]'
                  }))}
                  className={styles.updBtn}
                >
                  ПОВЫСИТЬ КВАЛИФИКАЦИЮ
                </button>
              </div>
            ) : (
              <div className={styles.emptyDetail}>ВЫБЕРИТЕ ОБЪЕКТ ДЛЯ ПРОСМОТРА</div>
            )}
          </section>
        </div>
      )}
    </main>
  );
};

export default Home;