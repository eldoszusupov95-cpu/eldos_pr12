import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import styles from './HomePage.module.css'

const STATS = [
  { icon: '⏱️', val: '30–45 минут', sub: 'Среднее время доставки' },
  { icon: '🍽️', val: '60+ блюд',    sub: 'В нашем меню' },
  { icon: '⭐', val: '4.9 рейтинг', sub: 'Более 2000 отзывов' },
  { icon: '🥗', val: 'Свежо и вкусно', sub: 'Готовим каждый день' },
]

export default function HomePage() {
  const { user } = useApp()
  const navigate = useNavigate()
  return (
    <div>
      <section className={styles.hero}>
        <p className={styles.tag}>ИТАЛЬЯНСКАЯ КУХНЯ · МОСКВА</p>
        <h1 className={styles.title}>
          Вкус <span className={styles.gold}>Италии</span><br />у вас дома
        </h1>
        <p className={styles.sub}>Свежие ингредиенты, традиционные рецепты и страсть к<br />кулинарии — в каждом блюде.</p>
        <div className={styles.btns}>
          <button className={styles.btnPrimary} onClick={() => navigate('/menu')}>Открыть меню</button>
          <button className={styles.btnSecondary} onClick={() => navigate(user ? '/orders' : '/login')}>Мои заказы</button>
        </div>
      </section>
      <section className={styles.stats}>
        {STATS.map((s, i) => (
          <div key={i} className={styles.statItem}>
            <div className={styles.statIcon}>{s.icon}</div>
            <div className={styles.statVal}>{s.val}</div>
            <div className={styles.statSub}>{s.sub}</div>
          </div>
        ))}
      </section>
    </div>
  )
}
