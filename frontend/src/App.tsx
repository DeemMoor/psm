import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import StackPage from './pages/StackPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/stack" element={<StackPage />} />
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  )
}
