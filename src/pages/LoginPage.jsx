import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import styles from './AuthPage.module.css'

export default function LoginPage() {
  const { login } = useApp()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email:'', password:'' })
  const [err, setErr] = useState('')
  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }))

  function submit() {
    if (!form.email || !form.password) { setErr('Заполните все поля'); return }
    const r = login(form.email, form.password)
    if (r.ok) navigate('/menu')
    else setErr(r.err)
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.icon}>🍕</div>
        <h2>Войти</h2>
        <p className={styles.sub}>Войдите в свой аккаунт</p>
        {err && <p className={styles.err}>{err}</p>}
        <div className={styles.field}>
          <label>EMAIL</label>
          <input type="email" placeholder="your@email.com" value={form.email} onChange={set('email')} />
        </div>
        <div className={styles.field}>
          <label>ПАРОЛЬ</label>
          <input type="password" placeholder="••••••" value={form.password} onChange={set('password')} />
        </div>
        <button className={styles.btn} onClick={submit}>Войти</button>
        <p className={styles.switch}>Нет аккаунта? <Link to="/register">Зарегистрироваться</Link></p>
      </div>
    </div>
  )
}
