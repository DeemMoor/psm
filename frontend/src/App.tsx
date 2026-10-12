import ProductMark from './components/ProductMark'

export default function App() {
  const phone = '+7 (918) 504-96-17'
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
