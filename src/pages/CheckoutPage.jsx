import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import styles from './CheckoutPage.module.css'

export default function CheckoutPage() {
  const { cart, cartTotal, placeOrder } = useApp()
  const navigate = useNavigate()
  const [type, setType] = useState('delivery')
  const [addr, setAddr] = useState('')
  const [comment, setComment] = useState('')
  const freeDelivery = cartTotal >= 1000

  function confirm() {
    placeOrder({ type, address: type === 'delivery' ? addr : 'Самовывоз', comment })
    navigate('/success')
  }

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Оформление заказа</h2>
      <p className={styles.sub}>Заполните данные для доставки или выберите самовывоз</p>
      <div className={styles.block}>
        <h3>Тип получения</h3>
        <div className={styles.typeBtns}>
          <button className={type==='delivery' ? styles.typeActive : styles.typeBtn} onClick={() => setType('delivery')}>🚀 Доставка</button>
          <button className={type==='pickup' ? styles.typeActive : styles.typeBtn} onClick={() => setType('pickup')}>🏃 Самовывоз</button>
        </div>
      </div>
      {type === 'delivery' ? (
        <div className={styles.block}>
          <h3>Адрес доставки</h3>
          <div className={styles.field}><label>УЛИЦА, ДОМ, КВАРТИРА</label><input placeholder="ул. Пушкина, д.1, кв.5" value={addr} onChange={e => setAddr(e.target.value)} /></div>
          <div className={styles.field}><label>КОММЕНТАРИЙ</label><textarea placeholder="Код домофона, этаж..." value={comment} onChange={e => setComment(e.target.value)} /></div>
        </div>
      ) : (
        <div className={styles.block}>
          <h3>Самовывоз</h3>
          <p>📍 Москва, ул. Арбат, 12</p>
          <p>⏱ Готовность: 20–30 минут</p>
          <p>Ждём вас!</p>
        </div>
      )}
      <div className={styles.block}>
        <h3>Ваш заказ</h3>
        {cart.map(x => (
          <div key={x.id} className={styles.orderRow}>
            <span>{x.icon} {x.name} ×{x.qty}</span>
            <span>{x.price * x.qty} ₽</span>
          </div>
        ))}
        <div className={styles.orderRow}><span>Доставка</span><span style={{color:'#2e7d32'}}>{freeDelivery || type==='pickup' ? 'Бесплатно' : '200 ₽'}</span></div>
        <div className={styles.orderTotal}><span>Итого</span><span>{freeDelivery || type==='pickup' ? cartTotal : cartTotal + 200} ₽</span></div>
      </div>
      <button className={styles.confirm} onClick={confirm}>✓ Подтвердить заказ</button>
    </div>
  )
}
