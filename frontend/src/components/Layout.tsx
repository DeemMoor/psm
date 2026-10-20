import { Link, Outlet } from 'react-router-dom'
import { EMAIL, EMAIL_HREF, PHONE, PHONE_HREF } from '../contacts'

// Общий каркас всех страниц: шапка и подвал, между ними — текущая страница (Outlet).
export default function Layout() {
  return (
    <main className="page-shell">
      <header className="topbar">
        <Link className="brand" to="/" aria-label="Главная">
          <span className="brand-icon">G</span>
          <span className="brand-text"><span>ГРАФИТОВЫЕ</span> <span>ИЗДЕЛИЯ<span className="brand-dot">...</span></span></span>
        </Link>
        <span className="topbar-note">Лопатки для насосов на заказ</span>
        <a className="header-phone" href={PHONE_HREF}>
          <span className="phone-dot" />{PHONE}
        </a>
      </header>

      <Outlet />

      <footer className="footer">
        <span>ГРАФИТОВЫЕ ЛОПАТКИ</span>
        <span>Звоните или пишите в мессенджеры</span>
        <span className="footer-contacts"><a href={PHONE_HREF}>{PHONE}</a><a href={EMAIL_HREF}>{EMAIL}</a></span>
      </footer>
    </main>
  )
}
