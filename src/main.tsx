
import { createRoot } from 'react-dom/client'
import './styles/styles.scss'
import App from './components/App/App.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)