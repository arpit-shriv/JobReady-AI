import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./style.scss"

// Force a fresh reload whenever the browser restores a page from bfcache
// (e.g. after using the back/forward buttons), so auth checks always run
// fresh instead of showing a stale cached render.
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        window.location.reload()
    }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)