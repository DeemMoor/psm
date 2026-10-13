import { Link, Outlet } from 'react-router-dom'
import { PHONE, PHONE_HREF } from '../contacts'

// Общий каркас всех страниц: шапка и подвал, между ними — текущая страница (Outlet).
export default function Layout() {
  return (
    <main className="page-shell">
      <header className="topbar">
        <Link className="brand" to="/" aria-label="Главная">
          <span className="brand-icon">G</span>
          <span>ГРАФИТ<span className="brand-dot">.</span></span>
        </Link>
        <span className="topbar-note">Лопатки для насосов на заказ</span>
        <a className="header-phone" href={PHONE_HREF}>
          <span className="phone-dot" />{PHONE}
        </a>
      </header>

      <Outlet />

      <footer className="footer"><span>ГРАФИТОВЫЕ ЛОПАТКИ</span><span>Свяжитесь с нами по телефону</span><a href={PHONE_HREF}>{PHONE}</a></footer>
    </main>
  )
}
