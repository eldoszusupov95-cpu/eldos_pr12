import { Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import MenuPage from './pages/MenuPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import OrdersPage from './pages/OrdersPage'
import SuccessPage from './pages/SuccessPage'

function Guard({ children }) {
  const { user } = useApp()
  return user ? children : <Navigate to="/login" replace />
}

function AppRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"          element={<HomePage />} />
        <Route path="/menu"      element={<MenuPage />} />
        <Route path="/register"  element={<RegisterPage />} />
        <Route path="/login"     element={<LoginPage />} />
        <Route path="/cart"      element={<Guard><CartPage /></Guard>} />
        <Route path="/checkout"  element={<Guard><CheckoutPage /></Guard>} />
        <Route path="/orders"    element={<Guard><OrdersPage /></Guard>} />
        <Route path="/success"   element={<Guard><SuccessPage /></Guard>} />
        <Route path="*"          element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default function App() {
  return <AppProvider><AppRoutes /></AppProvider>
}
