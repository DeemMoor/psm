import React from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'

function ProductMark() {
  return (
    <svg className="product-mark" viewBox="0 0 520 520" role="img" aria-label="Графитовые лопатки">
      <defs>
        <linearGradient id="blade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#555b58" />
          <stop offset=".48" stopColor="#292e2d" />
          <stop offset="1" stopColor="#111414" />
        </linearGradient>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="10" />
          <feOffset dy="15" />
          <feComponentTransfer><feFuncA type="linear" slope=".45" /></feComponentTransfer>
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <circle cx="260" cy="260" r="205" fill="none" stroke="#343a37" strokeWidth="1" strokeDasharray="3 10" />
      <circle cx="260" cy="260" r="165" fill="none" stroke="#313735" strokeWidth="1" />
      <g filter="url(#shadow)" transform="translate(260 260)">
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <g key={angle} transform={`rotate(${angle})`}>
            <path d="M-26 -42 C-39 -89 -34 -147 -19 -191 Q0 -207 19 -191 C34 -147 39 -89 26 -42 Z" fill="url(#blade)" stroke="#666d68" strokeWidth="1.5" />
            <path d="M0 -51 L0 -192" stroke="#858b84" strokeOpacity=".35" strokeWidth="1" />
          </g>
        ))}
        <circle r="53" fill="#171a19" stroke="#707770" strokeWidth="2" />
        <circle r="33" fill="#242927" stroke="#414844" strokeWidth="1" />
        <circle r="8" fill="#9aa08e" />
      </g>
      <circle cx="260" cy="260" r="4" fill="#c1c6ae" />
    </svg>
  )
}

function App() {
  // Замените номер и подпись после получения контактного телефона.
  const phone = '+7 (000) 000-00-00'
  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Главная">
          <span className="brand-icon">G</span>
          <span>ГРАФИТ<span className="brand-dot">.</span></span>
        </a>
        <span className="topbar-note">Промышленные материалы</span>
        <a className="header-phone" href={`tel:${phone.replace(/[^+\d]/g, '')}`}>
          <span className="phone-dot" />{phone}
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span /> ПОСТАВКИ ДЛЯ ПРОИЗВОДСТВА</div>
          <h1>Продажа<br /><span>графитовых</span><br />лопаток</h1>
          <p className="intro">Графитовые лопатки для промышленного оборудования. Узнайте о наличии и условиях поставки по телефону.</p>
          <a className="call-button" href={`tel:${phone.replace(/[^+\d]/g, '')}`}>
            <span className="button-icon">↗</span>
            <span>Позвонить нам<small>{phone}</small></span>
          </a>
          <div className="hero-index"><span>01</span><i /> ГРАФИТ · НАДЁЖНОСТЬ · ПОСТАВКА</div>
        </div>
        <div className="hero-art"><div className="art-glow" /><ProductMark /><div className="art-label"><span>G / 01</span><span>GRAPHITE<br />VANES</span></div></div>
      </section>

      <footer className="footer"><span>ГРАФИТОВЫЕ ЛОПАТКИ</span><span>Свяжитесь с нами по телефону</span><a href={`tel:${phone.replace(/[^+\d]/g, '')}`}>{phone}</a></footer>
    </main>
  )
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>)
