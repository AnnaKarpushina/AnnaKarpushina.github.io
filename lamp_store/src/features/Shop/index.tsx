import { useEffect } from 'react';

import ListLamp from '../../components/ListLamp';
import Title from '../../components/Title';
import LampsStore from '../../store/LampsStore/LampsStore';

const Shop = () => {
    const { isLoading, lamps, getAllLamps } = LampsStore();

    useEffect(() => {
        getAllLamps(); // получаем данные с сервера при первой загрузке компонента
    }, []);

    return (
        <>
            <Title />
            <ListLamp lamps={lamps} isLoading={isLoading} />
        </>
    );
};

export default Shop;
