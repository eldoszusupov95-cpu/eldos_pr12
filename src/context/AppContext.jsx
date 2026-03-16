import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../data/menu'

const Ctx = createContext(null)

function load(k, def) {
  try { const r = localStorage.getItem(k); return r ? JSON.parse(r) : def } catch { return def }
}

export function AppProvider({ children }) {
  const [user, setUser]         = useState(() => load('br_user', null))
  const [users, setUsers]       = useState(() => load('br_users', {}))
  const [cart, setCart]         = useState([])
  const [orders, setOrders]     = useState(() => load('br_orders', []))
  const [apiUsers, setApiUsers] = useState([])

  useEffect(() => { localStorage.setItem('br_user', JSON.stringify(user)) }, [user])
  useEffect(() => { localStorage.setItem('br_users', JSON.stringify(users)) }, [users])
  useEffect(() => { localStorage.setItem('br_orders', JSON.stringify(orders)) }, [orders])

  useEffect(() => {
    axios.get(API_URL).then(r => setApiUsers(r.data)).catch(() => {})
  }, [])

  function register(name, email, phone, password) {
    const u = { name, email, phone, password, id: Date.now() }
    setUsers(p => ({ ...p, [email]: u }))
    setUser(u)
    axios.post(API_URL, { name, email, phone }).catch(() => {})
    return u
  }

  function login(email, password) {
    const u = users[email]
    if (!u) return { ok: false, err: 'Пользователь не найден' }
    if (u.password !== password) return { ok: false, err: 'Неверный пароль' }
    setUser(u); return { ok: true }
  }

  function logout() { setUser(null); setCart([]) }

  function addToCart(item) {
    setCart(p => {
      const ex = p.find(x => x.id === item.id)
      if (ex) return p.map(x => x.id === item.id ? { ...x, qty: x.qty + 1 } : x)
      return [...p, { ...item, qty: 1 }]
    })
  }

  function changeQty(id, delta) {
    setCart(p => p.map(x => x.id === id ? { ...x, qty: x.qty + delta } : x).filter(x => x.qty > 0))
  }

  function removeFromCart(id) { setCart(p => p.filter(x => x.id !== id)) }

  function placeOrder(delivery) {
    const total = cart.reduce((s, x) => s + x.price * x.qty, 0)
    const order = { id: Date.now(), items: cart, total, delivery, status: 'active', date: new Date().toLocaleDateString('ru-RU') }
    setOrders(p => [order, ...p])
    axios.post(API_URL, { orderTotal: total, delivery: delivery.type, user: user?.name }).catch(() => {})
    setCart([])
    return order
  }

  const cartCount = cart.reduce((s, x) => s + x.qty, 0)
  const cartTotal = cart.reduce((s, x) => s + x.price * x.qty, 0)

  return (
    <Ctx.Provider value={{ user, cart, orders, cartCount, cartTotal, apiUsers, register, login, logout, addToCart, changeQty, removeFromCart, placeOrder }}>
      {children}
    </Ctx.Provider>
  )
}

export const useApp = () => useContext(Ctx)
