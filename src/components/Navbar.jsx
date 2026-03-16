import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { user, logout, cartCount } = useApp()
  const navigate = useNavigate()
  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.logo}>
        <span className={styles.logoB}>Bella</span>
        <span className={styles.logoR}> Ristorante</span>
      </Link>
      <div className={styles.links}>
        <Link to="/">Главная</Link>
        <Link to="/menu">Меню</Link>
        {user && <Link to="/orders">Мои заказы</Link>}
      </div>
      <div className={styles.actions}>
        {user ? (
          <>
            {cartCount > 0 && (
              <button className={styles.cartBtn} onClick={() => navigate('/cart')}>
                🛒 Корзина <span className={styles.badge}>{cartCount}</span>
              </button>
            )}
            <span className={styles.user}>👤 {user.name}</span>
            <button className={styles.logoutBtn} onClick={() => { logout(); navigate('/') }}>Выйти</button>
          </>
        ) : (
          <>
            <Link to="/login" className={styles.loginBtn}>Войти</Link>
            <Link to="/register" className={styles.regBtn}>Регистрация</Link>
          </>
        )}
      </div>
    </nav>
  )
}
