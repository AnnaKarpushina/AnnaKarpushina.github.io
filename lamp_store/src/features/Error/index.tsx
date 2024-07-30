import './styles.scss';

import { NavLink } from 'react-router-dom';

const Error = () => (
    <div className="errorPage">
        <h1 className="errorPage-title">Ошибка 404</h1>
        <p className="errorPage-message">Страница, которую вы ищете, не найдена</p>
        <NavLink to="/" className="errorPage-link">
            Вернуться на главную
        </NavLink>
    </div>
);

export default Error;
