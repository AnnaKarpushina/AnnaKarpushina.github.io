import { lazy, Suspense, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from '../../components/Layout/Layout';
import Loading from '../../components/Loading';
import { UserContext } from '../../context/UserContext/UserContext';
import Error from '../../features/Error';

// lazy позволяет отложить загрузку кода компонента до тех пор, пока он не будет отрисован в первый раз

const Admin = lazy(() => import('../../features/Admin'));
const Cart = lazy(() => import('../../features/Cart'));
const Product = lazy(() => import('../../features/Product'));
const Shop = lazy(() => import('../../features/Shop'));
const SignIn = lazy(() => import('../../features/SignIn'));
const SingUp = lazy(() => import('../../features/SingUp'));

const AppRouter = () => {
    const { user, loading } = useContext(UserContext);

    if (loading) {
        return <Loading />;
    }

    // Suspense - позволяет отображать запасной компонент (индикатор загрузки) во время ожидания загрузки, где
    // "fallback" - используется для обозначения компонента, который отображается во время ожидания загрузки данных

    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Shop />} />
                    <Route path="/cardlamp/:id" element={<Product />} />
                    <Route path="/singup" element={<SingUp />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/cart" element={<Cart />} />
                    { user && user.isAdmin && (
                        <Route path="/admin" element={<Admin />} />
                    )}
                </Route>
                <Route path="*" element={<Error />} /> {/* * - все остальные пути */}
            </Routes>
        </Suspense>
    );
};

export default AppRouter;
