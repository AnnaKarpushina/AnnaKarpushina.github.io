import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../Header';

const Layout: FC = () => (
    <>
        <Header />
        <div className="main">
            <Outlet /> {/* Указывает, где должны отображаться дочерние маршруты */}
        </div>
    </>
);

export default Layout;
