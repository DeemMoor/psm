// Фото продукции (лежат в frontend/public/img/works/, при сборке копируются в backend/public/img/works/).
// width/height — реальные размеры файла: браузер заранее резервирует место и страница не «прыгает» при загрузке.
export type Photo = {
  src: string
  alt: string
  width: number
  height: number
}

export const PHOTOS = {
  fan: { src: '/img/works/vanes-fan.webp', alt: 'Четыре графитовые лопатки для вакуумного насоса веером на столе', width: 960, height: 880 },
  row: { src: '/img/works/vanes-row.webp', alt: 'Комплект из восьми графитовых лопаток для роторно-пластинчатого насоса', width: 720, height: 912 },
  stand: { src: '/img/works/vanes-stand.webp', alt: 'Графитовые лопатки с фаской, вид с торца', width: 960, height: 912 },
  short: { src: '/img/works/vanes-short.webp', alt: 'Короткие графитовые лопатки с фаской для компрессора', width: 960, height: 912 },
} satisfies Record<string, Photo>

export const GALLERY: Photo[] = [PHOTOS.row, PHOTOS.stand, PHOTOS.short, PHOTOS.fan]
