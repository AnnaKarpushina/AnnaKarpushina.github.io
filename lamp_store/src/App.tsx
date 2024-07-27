import './App.scss';

import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { AdminContextProvider } from './context/AdminContext/AdminContext';
import CartContextProvider from './context/CartContext/CartContext';
import LampsContextProvider from './context/LampsContext/LampsContext';
import { UserContextProvider } from './context/UserContext/UserContext';
import AppRouter from './services/router';

const rootElement = document.getElementById('root');

if (rootElement) {
    createRoot(rootElement).render( // используем createRoot для рендеринга приложения
        <BrowserRouter>
            <LampsContextProvider>
                <AdminContextProvider>
                    <UserContextProvider>
                        <CartContextProvider>
                            <AppRouter />
                        </CartContextProvider>
                    </UserContextProvider>
                </AdminContextProvider>
            </LampsContextProvider>
        </BrowserRouter>,
    );
}
