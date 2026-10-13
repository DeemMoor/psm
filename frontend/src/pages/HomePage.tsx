import Gallery from '../components/Gallery'
import { PHONE, PHONE_HREF } from '../contacts'
import { GALLERY, PHOTOS } from '../photos'

// Тексты лендинга. Вынесены в массивы, чтобы правка контента не требовала лезть в разметку.
const TERMS = [
  { name: 'Срочно', time: 'за 1 сутки', text: 'Когда лопатка нужна максимально быстро. Стоимость выше.' },
  { name: 'Стандартно', time: 'около 2 недель', text: 'Оптимальная цена для плановой замены.' },
]

const BRANDS = [
  'Becker', 'Ryobi', 'Romaior', 'Rietschle CLFT', 'НВПР', 'ППА', 'УВД',
  'Доминант', 'ТРК «НАРА»', 'ТРК «Adast»', 'Планета', 'Колбус',
]

const STEPS = [
  'Фото старой лопатки с линейкой — вид сбоку и с торца',
  'Марка и модель насоса или фото шильдика',
  'Нужные размеры или чертёж',
]

export default function HomePage() {
  return (
    <>
      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span /> ИЗГОТОВЛЕНИЕ НА ЗАКАЗ · ДОСТАВКА СДЭК</div>
          <h1>Графитовые<br /><span>лопатки</span><br />для насосов</h1>
          <p className="intro">
            Изготавливаем лопатки для роторно-пластинчатых насосов и компрессоров «сухого» трения —
            точно под ваше оборудование: по размерам, чертежу, образцу или фото. Срочно — за 1 сутки.
          </p>
          <a className="call-button" href={PHONE_HREF}>
            <span className="button-icon">↗</span>
            <span>Рассчитать стоимость<small>{PHONE}</small></span>
          </a>
          <div className="hero-index"><span>01</span><i /> ИЗОСТАТИЧЕСКИЙ ГРАФИТ · CZ5 · CGD</div>
        </div>
        <div className="hero-art">
          <div className="art-glow" />
          {/* Главное фото грузим сразу (не lazy) — оно на первом экране. */}
          <img className="hero-photo" src={PHOTOS.fan.src} alt={PHOTOS.fan.alt} width={PHOTOS.fan.width} height={PHOTOS.fan.height} fetchPriority="high" />
          <div className="art-label"><span>G / 01</span><span>GRAPHITE<br />VANES</span></div>
        </div>
      </section>

      <section className="block">
        <h2 className="block-title"><span>02</span> Сроки на выбор</h2>
        <div className="cards">
          {TERMS.map((term) => (
            <div className="card" key={term.name}>
              <div className="card-label">{term.name}</div>
              <div className="card-value">{term.time}</div>
              <p>{term.text}</p>
            </div>
          ))}
        </div>
        <p className="block-note">При обращении сразу рассчитаем оба варианта — выберете оптимальный по сроку и бюджету.</p>
      </section>

      <section className="block">
        <h2 className="block-title"><span>03</span> Примеры работ</h2>
        <Gallery photos={GALLERY} />
      </section>

      <section className="block">
        <h2 className="block-title"><span>04</span> Материал</h2>
        <div className="columns">
          <p>
            Мелкозернистый плотный конструкционный графит — изостатический, марки <b>CZ5</b> и <b>CGD</b>,
            с пониженным содержанием примесей.
          </p>
          <p>
            Такой графит стабильно держит форму при нагреве и служит дольше экструзионного:
            меньше пыли и меньше износ камеры насоса.
          </p>
        </div>
      </section>

      <section className="block">
        <h2 className="block-title"><span>05</span> Для каких насосов</h2>
        <ul className="brands">
          {BRANDS.map((brand) => <li key={brand}>{brand}</li>)}
          <li className="brands-more">и другие</li>
        </ul>
        <p className="block-note">
          Вашей модели нет в списке — пришлите фото шильдика насоса: подберём параметры и подскажем, на что обратить внимание.
        </p>
      </section>

      <section className="block">
        <h2 className="block-title"><span>06</span> Нестандартные доработки</h2>
        <div className="with-photo">
          <p className="block-text">
            Делаем не только по стандарту: увеличим высоту, изменим геометрию, уберём фаску и т. д.
            Есть свои требования — расскажите, согласуем.
          </p>
          <img className="block-photo" src={PHOTOS.short.src} alt={PHOTOS.short.alt} width={PHOTOS.short.width} height={PHOTOS.short.height} loading="lazy" decoding="async" />
        </div>
      </section>

      <section className="block">
        <h2 className="block-title"><span>07</span> Как получить расчёт</h2>
        <p className="block-text">Позвоните или напишите на {PHONE} и пришлите любое из этого:</p>
        <ol className="steps">
          {STEPS.map((step) => <li key={step}>{step}</li>)}
        </ol>
        <p className="block-note">Сразу предложим оба тарифа и дадим рекомендации по подбору.</p>
      </section>

      <section className="block">
        <h2 className="block-title"><span>08</span> Доставка</h2>
        <div className="columns">
          <p>Отправляем транспортной компанией <b>СДЭК</b>, другие компании — по договорённости.</p>
          <p>Самовывоз — <b>г. Ростов-на-Дону</b>, район СЖМ.</p>
        </div>
        <a className="call-button" href={PHONE_HREF}>
          <span className="button-icon">↗</span>
          <span>Позвонить<small>{PHONE}</small></span>
        </a>
      </section>
    </>
  )
}
