import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import styles from './AuthPage.module.css'

export default function RegisterPage() {
  const { register } = useApp()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name:'', email:'', phone:'', password:'', password2:'' })
  const [err, setErr] = useState('')
  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }))

  function submit() {
    if (!form.name || !form.email || !form.phone || !form.password) { setErr('Заполните все поля'); return }
    if (form.password !== form.password2) { setErr('Пароли не совпадают'); return }
    register(form.name, form.email, form.phone, form.password)
    navigate('/menu')
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.icon}>🍕</div>
        <h2>Создать аккаунт</h2>
        <p className={styles.sub}>Регистрируйтесь и заказывайте</p>
        {err && <p className={styles.err}>{err}</p>}
        {[['name','Ваше имя','text','Иван Петров'],['email','Email','email','your@email.com'],['phone','Телефон','tel','+7 999 123 45 67'],['password','Пароль','password','......'],['password2','Повторите пароль','password','......']].map(([k,lbl,t,ph]) => (
          <div key={k} className={styles.field}>
            <label>{lbl.toUpperCase()}</label>
            <input type={t} placeholder={ph} value={form[k]} onChange={set(k)} />
          </div>
        ))}
        <button className={styles.btn} onClick={submit}>Зарегистрироваться</button>
        <p className={styles.switch}>Уже есть аккаунт? <Link to="/login">Войти</Link></p>
      </div>
    </div>
  )
}
