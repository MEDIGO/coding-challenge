import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { injectGlobal } from '@emotion/css'

injectGlobal({
  body: {
    margin: 0,
    padding: 0,
    backgroundColor: '#506387',
    font: '16px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
