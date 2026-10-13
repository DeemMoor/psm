import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="not-found">
      <div className="eyebrow"><span /> ОШИБКА 404</div>
      <h1>Страница<br /><span>не найдена</span></h1>
      <p className="intro">Такой страницы нет. Вернитесь на главную — там телефон и условия поставки.</p>
      <Link className="call-button" to="/">
        <span className="button-icon">←</span>
        <span>На главную</span>
      </Link>
    </section>
  )
}
