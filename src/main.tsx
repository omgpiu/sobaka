import { createRoot } from 'react-dom/client'
import { WrappedApp } from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
    <WrappedApp />
)
