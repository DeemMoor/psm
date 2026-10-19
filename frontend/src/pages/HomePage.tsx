import Gallery from '../components/Gallery'
import { PHONE, PHONE_HREF } from '../contacts'
import { HERO, MEASURE, WORKS } from '../photos'

// Тексты лендинга. Вынесены в массивы, чтобы правка контента не требовала лезть в разметку.
const TERMS = [
  { name: 'Срочно', time: 'за 1 сутки', text: 'Когда лопатка нужна максимально быстро. Стоимость выше.' },
  { name: 'Стандартно', time: 'около 2 недель', text: 'Оптимальная цена для плановой замены.' },
]

const MATERIALS = [
  {
    name: 'Графит группы МПГ',
    text: [
      'Мелкозернистые плотные графиты группы высокопрочных. В зависимости от требуемых характеристик подбираем марку: МПГ-6 (с малым содержанием золы), МПГ-7 (плотность не менее 1,70–1,80 г/см³, прочность при сжатии ~103 МПа), МПГ-8 (плотность до 1,99 г/см³, повышенная эрозионная стойкость).',
      'Оптимальный выбор для лопаток, работающих в узлах сухого трения и в контакте с агрессивными средами.',
    ],
  },
  {
    name: 'Изостатический графит',
    text: [
      'Производится методом холодного изостатического прессования (CIP). Ключевое преимущество — изотропия: свойства материала одинаковы во всех направлениях.',
      'Это обеспечивает минимальную пористость, высокую и стабильную плотность (до 1,9 г/см³) и предсказуемое поведение детали под нагрузкой. Применяется там, где требуется максимальная точность и надёжность.',
    ],
  },
]

const CAPABILITIES = [
  'Изготовление по чертежам заказчика',
  'Подбор марки графита под конкретные условия эксплуатации',
  'Контроль геометрии и качества поверхности',
  'Серийные и единичные партии',
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
          <h1><span className="line">Графитовые <span className="accent">лопатки</span></span> <span className="line">для насосов-компрессоров</span></h1>
          <p className="intro">
            Изготавливаем лопатки для роторно-пластинчатых насосов и компрессоров «сухого» трения —
            точно под ваше оборудование: по размерам, чертежу, образцу или фото. Срочно — за 1 сутки.
          </p>
          <a className="call-button" href={PHONE_HREF}>
            <span className="button-icon">↗</span>
            <span>Рассчитать стоимость<small>{PHONE}</small></span>
          </a>
          <div className="hero-index"><span>01</span><i /> ГРАФИТ МПГ · ИЗОСТАТИЧЕСКИЙ ГРАФИТ</div>
        </div>
        <div className="hero-art">
          <div className="art-glow" />
          {/* Главное фото грузим сразу (не lazy) — оно на первом экране. */}
          <img className="hero-photo" src={HERO.src} alt={HERO.alt} width={HERO.width} height={HERO.height} fetchPriority="high" />
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
        <Gallery photos={WORKS} mobileInitial={4} />
      </section>

      <section className="block">
        <h2 className="block-title"><span>04</span> Материал</h2>
        <p className="block-text">
          Мы производим лопатки из искусственного графита для вакуумных насосов, компрессоров и насосного
          оборудования. В зависимости от условий работы применяем два типа материалов.
        </p>
        <div className="cards materials">
          {MATERIALS.map((material) => (
            <div className="card" key={material.name}>
              <h3 className="card-value">{material.name}</h3>
              {material.text.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          ))}
        </div>
        <h3 className="block-subtitle">Наши возможности</h3>
        <ul className="features">
          {CAPABILITIES.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <h3 className="block-subtitle">Области применения</h3>
        <p>Вакуумные насосы, компрессоры, насосное оборудование, узлы сухого трения, агрессивные среды.</p>
      </section>

      <section className="block">
        <h2 className="block-title"><span>05</span> Контроль размеров</h2>
        <Gallery photos={MEASURE} />
      </section>

      <section className="block">
        <h2 className="block-title"><span>06</span> Для каких насосов</h2>
        <ul className="brands">
          {BRANDS.map((brand) => <li key={brand}>{brand}</li>)}
          <li className="brands-more">и другие</li>
        </ul>
        <p className="block-note">
          Вашей модели нет в списке — пришлите фото шильдика насоса: подберём параметры и подскажем, на что обратить внимание.
        </p>
      </section>

      <section className="block">
        <h2 className="block-title"><span>07</span> Нестандартные доработки</h2>
        <p className="block-text">Возможны нестандартные доработки, обращайтесь.</p>
      </section>

      <section className="block">
        <h2 className="block-title"><span>08</span> Как получить расчёт</h2>
        <p className="block-text">Позвоните или напишите на {PHONE} и пришлите любое из этого:</p>
        <ol className="steps">
          {STEPS.map((step) => <li key={step}>{step}</li>)}
        </ol>
        <p className="block-note">Сразу предложим оба тарифа и дадим рекомендации по подбору.</p>
      </section>

      <section className="block">
        <h2 className="block-title"><span>09</span> Доставка</h2>
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
