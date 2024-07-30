import './App.scss';

import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import AppRouter from './services/router';

const rootElement = document.getElementById('root');

if (rootElement) {
    createRoot(rootElement).render( // используем createRoot для рендеринга приложения
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>,
    );
}
