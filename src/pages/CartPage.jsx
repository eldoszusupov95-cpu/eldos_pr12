import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import styles from './CartPage.module.css'

export default function CartPage() {
  const { cart, cartTotal, changeQty, removeFromCart } = useApp()
  const navigate = useNavigate()
  const freeDelivery = cartTotal >= 1000

  if (!cart.length) return (
    <div className={styles.empty}>
      <p>🛒</p><p>Корзина пуста</p>
      <button onClick={() => navigate('/menu')}>Открыть меню</button>
    </div>
  )

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Корзина</h2>
      {cart.map(item => (
        <div key={item.id} className={styles.item}>
          <span className={styles.itemIcon}>{item.icon}</span>
          <div className={styles.itemInfo}>
            <div className={styles.itemName}>{item.name}</div>
            <div className={styles.itemSub}>{item.price} ₽ × {item.qty}</div>
          </div>
          <div className={styles.qty}>
            <button onClick={() => changeQty(item.id, -1)}>−</button>
            <span>{item.qty}</span>
            <button onClick={() => changeQty(item.id, +1)}>+</button>
          </div>
          <span className={styles.total}>{item.price * item.qty} ₽</span>
          <button className={styles.del} onClick={() => removeFromCart(item.id)}>✕</button>
        </div>
      ))}
      <div className={styles.summary}>
        <div className={styles.row}><span>Сумма заказа</span><span>{cartTotal} ₽</span></div>
        <div className={styles.row}><span>Доставка</span><span style={{color:'#2e7d32'}}>{freeDelivery ? 'Бесплатно' : '200 ₽'}</span></div>
        {freeDelivery && <p className={styles.freeMsg}>🎉 Бесплатная доставка!</p>}
        <div className={styles.total2}><span>Итого</span><span>{freeDelivery ? cartTotal : cartTotal + 200} ₽</span></div>
        <button className={styles.checkout} onClick={() => navigate('/checkout')}>Оформить заказ →</button>
      </div>
    </div>
  )
}
