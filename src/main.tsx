import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './app/styles/fonts.css'
import './app/styles/reset.css'
import './app/styles/variables.css'
import './app/styles/global.css'

import { App } from './app/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
