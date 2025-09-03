import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './scss/index.scss';
import Footer from './components/multiPageComponents/footer';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Footer/>
  </StrictMode>,
);
