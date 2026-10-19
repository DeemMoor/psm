import { useEffect, useState } from 'react'
import type { Photo } from '../photos'

// Следующий/предыдущий номер по кругу: после последнего фото — снова первое.
const shift = (i: number | null, delta: number, total: number) => (i === null ? null : (i + delta + total) % total)

// Сетка фото; по клику фото открывается на весь экран (лайтбокс), листается стрелками, Esc — закрыть.
// initial — сколько фото показать сразу; остальные — по кнопке «Показать ещё».
// mobileInitial — то же, но только для телефона. Ширину экрана при пререндере знать нельзя,
// поэтому все фото есть в HTML, а лишние на телефоне прячет CSS (класс gallery-item-extra).
type Props = { photos: Photo[]; initial?: number; mobileInitial?: number }

export default function Gallery({ photos, initial = photos.length, mobileInitial = initial }: Props) {
  const [expanded, setExpanded] = useState(false)
  // Номер открытого фото; null — лайтбокс закрыт.
  const [open, setOpen] = useState<number | null>(null)

  const isOpen = open !== null

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight') setOpen((i) => shift(i, 1, photos.length))
      if (e.key === 'ArrowLeft') setOpen((i) => shift(i, -1, photos.length))
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, photos.length])

  const step = (delta: number) => setOpen((i) => shift(i, delta, photos.length))
  const current = open === null ? null : photos[open]

  return (
    <>
      <div className={expanded ? 'gallery gallery-expanded' : 'gallery'}>
        {(expanded ? photos : photos.slice(0, initial)).map((photo, i) => (
          <button type="button" className={i >= mobileInitial ? 'gallery-item gallery-item-extra' : 'gallery-item'} key={photo.src} onClick={() => setOpen(i)} aria-label={`Открыть фото: ${photo.alt}`}>
            <img src={photo.thumb ?? photo.src} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" decoding="async" />
          </button>
        ))}
      </div>
      {!expanded && photos.length > initial && (
        <button type="button" className="gallery-more" onClick={() => setExpanded(true)}>
          Показать ещё {photos.length - initial} фото
        </button>
      )}
      {!expanded && photos.length > mobileInitial && initial === photos.length && (
        <button type="button" className="gallery-more gallery-more-mobile" onClick={() => setExpanded(true)}>
          Показать ещё {photos.length - mobileInitial} фото
        </button>
      )}

      {current && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={current.alt} onClick={() => setOpen(null)}>
          <img src={current.src} alt={current.alt} width={current.width} height={current.height} onClick={(e) => e.stopPropagation()} />
          <button type="button" className="lightbox-close" aria-label="Закрыть" onClick={() => setOpen(null)}>×</button>
          <button type="button" className="lightbox-nav lightbox-prev" aria-label="Предыдущее фото" onClick={(e) => { e.stopPropagation(); step(-1) }}>‹</button>
          <button type="button" className="lightbox-nav lightbox-next" aria-label="Следующее фото" onClick={(e) => { e.stopPropagation(); step(1) }}>›</button>
          <div className="lightbox-count">{(open ?? 0) + 1} / {photos.length}</div>
        </div>
      )}
    </>
  )
}
