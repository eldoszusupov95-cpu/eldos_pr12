import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import styles from './OrdersPage.module.css'

export default function OrdersPage() {
  const { orders } = useApp()
  const navigate = useNavigate()
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div><h2>Мои заказы</h2><p>История ваших заказов</p></div>
        <button className={styles.newBtn} onClick={() => navigate('/menu')}>+ Заказать</button>
      </div>
      {!orders.length ? (
        <div className={styles.empty}><p>📋</p><p>Заказов пока нет</p></div>
      ) : orders.map(o => (
        <div key={o.id} className={styles.item}>
          <div className={styles.itemTop}>
            <span className={styles.badge}>Активен</span>
            <span className={styles.date}>{o.date}</span>
          </div>
          <div className={styles.items}>{o.items.map(x => `${x.icon} ${x.name} ×${x.qty}`).join(', ')}</div>
          <div className={styles.itemBot}>
            <span>{o.delivery?.type === 'pickup' ? '🏃 Самовывоз' : `🚀 ${o.delivery?.address}`}</span>
            <span className={styles.total}>{o.total} ₽</span>
          </div>
        </div>
      ))}
    </div>
  )
}
