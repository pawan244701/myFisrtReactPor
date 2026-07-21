import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  
  // StrictMode: should wrap the top most label layer of App, It is a dev...ment helper tool, tells about Bugs adn Warns about Deprecated features. Only works in devlopment.
  <StrictMode>
    {/* BrowserRouter: it will continuesly watch for App's URL changes and will be telling the React to render a thing that is mantioned in URL e.g. : /login  adn hide previous e.g. : /home*/}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
