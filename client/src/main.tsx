import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './scss/index.scss';
import Footer from './components/multiPageComponents/footer';
import SiteRoutes from './routes';
import { BrowserRouter } from 'react-router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
    <BrowserRouter>
      <SiteRoutes/>
    </BrowserRouter>

    <Footer/>
  </StrictMode>,
);
