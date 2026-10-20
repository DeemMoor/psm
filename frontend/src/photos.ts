// Фото и видео продукции (лежат в frontend/public/, при сборке копируются в backend/public/).
// width/height — реальные размеры файла: браузер заранее резервирует место и страница не «прыгает» при загрузке.
// thumb — лёгкое превью для сетки; полное фото грузится, только когда его открыли.
export type Photo = {
  src: string
  thumb?: string
  alt: string
  width: number
  height: number
}

const DIR = '/img/photos'

const photo = (name: string, alt: string, width: number, height: number, withThumb = true): Photo => ({
  src: `${DIR}/${name}.webp`,
  thumb: withThumb ? `${DIR}/${name}-sm.webp` : undefined,
  alt,
  width,
  height,
})

export const HERO = photo('hero-01', 'Графитовые лопатки разных размеров для вакуумных насосов и компрессоров', 1024, 768, false)

export const WORKS: Photo[] = [
  photo('works-01', 'Четыре графитовые лопатки для вакуумного насоса веером', 1280, 1280),
  photo('works-03', 'Два комплекта графитовых лопаток разной ширины', 1280, 1280),
  photo('works-04', 'Комплекты длинных и коротких графитовых лопаток', 1280, 1280),
  photo('works-05', 'Длинные графитовые лопатки с фаской, вид сбоку', 1280, 1280),
  photo('works-06', 'Стопка широких графитовых лопаток', 1280, 1280),
  photo('works-07', 'Графитовые лопатки с фаской, вид с торца', 1280, 1280),
  photo('works-08', 'Графитовые лопатки для компрессора сухого трения', 1280, 1280),
  photo('works-10', 'Короткие графитовые лопатки с фаской', 1280, 1280),
]

export const MEASURE: Photo[] = [
  photo('measure-02', 'Замер графитовой лопатки микрометром', 1280, 1280),
  photo('measure-03', 'Замер ширины графитовой лопатки штангенциркулем', 1280, 1280),
  photo('measure-04', 'Проверка ширины комплекта лопаток штангенциркулем', 1280, 1280),
  photo('measure-06', 'Проверка размеров короткой лопатки', 960, 1280),
]

// Видео лежит в frontend/public/video/; poster — обложка, которую видно до нажатия Play.
export const PROFILE_VIDEO = {
  src: '/video/vane-profile.mp4',
  poster: `${DIR}/vane-profile-poster.jpg`,
  width: 540,
  height: 960,
}
