import { createRoot } from 'react-dom/client'

import './styles/_globals.scss'
import App from './App'

createRoot(document.getElementById('appRoot')!).render(<App />)
