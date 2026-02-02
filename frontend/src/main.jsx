import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
// Force light mode
document.documentElement.classList.remove("dark");
localStorage.removeItem("theme");

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)