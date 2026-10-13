import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { usePageTitle } from './hooks/usePageTitle'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import StackPage from './pages/StackPage'

// Список путей должен совпадать с src/seo.ts и backend/src/Seo/SitePages.php.
export default function App() {
  usePageTitle()
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/stack" element={<StackPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
