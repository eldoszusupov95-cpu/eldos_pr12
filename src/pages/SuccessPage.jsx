import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import styles from './SuccessPage.module.css'

export default function SuccessPage() {
  const { orders } = useApp()
  const navigate = useNavigate()
  const latest = orders[0]
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.icon}>🎉</div>
        <h2>Заказ принят!</h2>
        {latest && <><p>{latest.items.map(x => x.name).join(', ')}</p><p className={styles.total}>{latest.total} ₽</p></>}
        <div className={styles.btns}>
          <button className={styles.btn1} onClick={() => navigate('/orders')}>Мои заказы</button>
          <button className={styles.btn2} onClick={() => navigate('/menu')}>Заказать ещё</button>
        </div>
      </div>
    </div>
  )
}
