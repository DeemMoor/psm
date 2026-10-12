import ProductMark from '../components/ProductMark'
import { PHONE, PHONE_HREF } from '../contacts'

export default function HomePage() {
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <div className="eyebrow"><span /> ПОСТАВКИ ДЛЯ ПРОИЗВОДСТВА</div>
        <h1>Продажа<br /><span>графитовых</span><br />лопаток</h1>
        <p className="intro">Графитовые лопатки для промышленного оборудования. Узнайте о наличии и условиях поставки по телефону.</p>
        <a className="call-button" href={PHONE_HREF}>
          <span className="button-icon">↗</span>
          <span>Позвонить нам<small>{PHONE}</small></span>
        </a>
        <div className="hero-index"><span>01</span><i /> ГРАФИТ · НАДЁЖНОСТЬ · ПОСТАВКА</div>
      </div>
      <div className="hero-art"><div className="art-glow" /><ProductMark /><div className="art-label"><span>G / 01</span><span>GRAPHITE<br />VANES</span></div></div>
    </section>
  )
}
