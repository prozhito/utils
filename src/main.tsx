import React from 'react'
import ReactDOM from 'react-dom/client'
import { Header } from './view/header/header.tsx'
import { Footer } from './view/footer/footer.tsx'
import App from './App.tsx'
import './styles.css'

ReactDOM.createRoot(document.body).render(
  <>
    <Header />

    <React.StrictMode>
      <main className="main">
        <App />
      </main>
    </React.StrictMode>

    <Footer />
    <div className="body__bg"></div>
  </>
)
