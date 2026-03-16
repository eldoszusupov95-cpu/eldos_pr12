import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { MENU_ITEMS, CATEGORIES, TAG_COLORS } from '../data/menu'
import styles from './MenuPage.module.css'

function TagBadge({ tag }) {
  const c = TAG_COLORS[tag] || { bg: '#eee', color: '#555' }
  return <span style={{ background: c.bg, color: c.color, fontSize: '0.72rem', fontWeight: 600, padding: '2px 8px', borderRadius: 20, marginRight: 4 }}>{tag}</span>
}

function DishCard({ item }) {
  const { cart, addToCart, changeQty } = useApp()
  const inCart = cart.find(x => x.id === item.id)
  return (
    <div className={styles.card}>
      <div className={styles.imgBox}>
        <span className={styles.emoji}>{item.icon}</span>
      </div>
      <div className={styles.body}>
        <div className={styles.tags}>{item.tags.map(t => <TagBadge key={t} tag={t} />)}</div>
        <h3 className={styles.name}>{item.name}</h3>
        <p className={styles.desc}>{item.desc}</p>
        <div className={styles.footer}>
          <span className={styles.price}>{item.price} <small>₽</small></span>
          {inCart ? (
            <div className={styles.qty}>
              <button onClick={() => changeQty(item.id, -1)}>−</button>
              <span>{inCart.qty}</span>
              <button onClick={() => changeQty(item.id, +1)}>+</button>
            </div>
          ) : (
            <button className={styles.addBtn} onClick={() => addToCart(item)}>+ В корзину</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function MenuPage() {
  const [active, setActive] = useState('Все')
  const items = active === 'Все' ? MENU_ITEMS : MENU_ITEMS.filter(x => x.cat === active)
  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Наше меню</h2>
      <p className={styles.sub}>Выбирайте блюда и добавляйте в корзину</p>
      <div className={styles.cats}>
        {CATEGORIES.map(c => (
          <button key={c} className={`${styles.cat} ${active === c ? styles.catActive : ''}`} onClick={() => setActive(c)}>{c}</button>
        ))}
      </div>
      <div className={styles.grid}>
        {items.map(item => <DishCard key={item.id} item={item} />)}
      </div>
    </div>
  )
}
