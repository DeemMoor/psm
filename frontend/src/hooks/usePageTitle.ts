import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { metaFor } from '../seo'

// При переходах внутри SPA обновляем <title> — HTML с сервера пришёл для первой страницы.
export function usePageTitle() {
  const { pathname } = useLocation()
  useEffect(() => {
    document.title = metaFor(pathname).title
  }, [pathname])
}
