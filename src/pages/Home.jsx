import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOperators, selectOperator, addOperator, deleteOperator, updateOperator } from '../features/operators/operatorsSlice';
import styles from './Home.module.css';

const Home = () => {
  const dispatch = useDispatch();
  const { items, selectedOperator, status } = useSelector(state => state.operators);
  const [newName, setNewName] = useState('');

  useEffect(() => { if (status === 'idle') dispatch(fetchOperators()); }, [status, dispatch]);

  const handleCreate = () => {
    if (!newName) return;
    const newOp = { id: Date.now(), name: newName, codeName: 'NEW-RECRUIT', department: 'Frontier', status: 'Active' };
    dispatch(addOperator(newOp));
    setNewName('');
  };

  return (
    <main className={styles.container}>
      <div className={styles.adminPanel}>
        <input 
          value={newName} 
          onChange={(e) => setNewName(e.target.value)} 
          placeholder="Имя нового оператора..." 
          className={styles.input}
        />
        <button onClick={handleCreate} className={styles.addBtn}>+ ЗАРЕГИСТРИРОВАТЬ</button>
      </div>

      <div className={styles.layout}>
        <div className={styles.listSide}>
          {items.map(op => (
            <div key={op.id} className={styles.opCard} onClick={() => dispatch(selectOperator(op))}>
              <span>{op.name}</span>
              <button onClick={(e) => { e.stopPropagation(); dispatch(deleteOperator(op.id)); }} className={styles.delBtn}>УДАЛИТЬ</button>
            </div>
          ))}
        </div>

        <div className={styles.detailSide}>
          {selectedOperator ? (
            <div className={styles.detailCard}>
              <h3>ИНФО: {selectedOperator.name}</h3>
              <button 
                onClick={() => dispatch(updateOperator({...selectedOperator, name: selectedOperator.name + ' [PROMOTED]'}))}
                className={styles.updBtn}
              >
                ПОВЫСИТЬ РАНГ
              </button>
            </div>
          ) : <p>ВЫБЕРИТЕ ОБЪЕКТ</p>}
        </div>
      </div>
    </main>
  );
};

export default Home;
