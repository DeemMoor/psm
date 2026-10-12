import { useEffect, useState } from 'react'
import { getStack, type StackGroup, type StackItem } from '../api/stack'
import './StackPage.css'

// Логотип технологии: картинка из /img/stack, при ошибке — буква-бейдж.
function TechLogo({ tech }: { tech: StackItem }) {
  const [failed, setFailed] = useState(false)
  return (
    <span className="stack-logo">
      {failed ? (
        <span className="stack-logo-letter" aria-hidden="true">{tech.name.charAt(0)}</span>
      ) : (
        <img src={`/img/stack/${tech.logo}.svg`} alt="" width={26} height={26} onError={() => setFailed(true)} />
      )}
    </span>
  )
}

// StackPage — «секретная» страница со стеком проекта. Не в меню, только по /stack.
// Версии подтягиваются с бэка (реальные, не захардкожены).
export default function StackPage() {
  const [groups, setGroups] = useState<StackGroup[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    document.title = 'Tech Stack — Графитовые лопатки'
    getStack()
      .then(setGroups)
      .catch(() => setError('Не удалось загрузить стек'))
  }, [])

  return (
    <section className="stack-page">
      <div className="eyebrow"><span /> РЕАЛЬНЫЕ ВЕРСИИ С СЕРВЕРА</div>
      <h1 className="stack-heading">Tech Stack</h1>

      {error && <p className="stack-status">{error}</p>}
      {!groups && !error && <p className="stack-status">Загрузка…</p>}

      {groups?.map((group) => (
        <div key={group.title} className="stack-group">
          <h2 className="stack-title">{group.title}</h2>
          <div className="stack-grid">
            {group.items.map((tech) => (
              <a key={tech.name} className="stack-card" href={tech.link} target="_blank" rel="noreferrer">
                <TechLogo tech={tech} />
                <span className="stack-meta">
                  <span className="stack-name">{tech.name}</span>
                  <span className="stack-version">{tech.version}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      ))}

      <p className="stack-credit">Developed by Deem Moor</p>
    </section>
  )
}
