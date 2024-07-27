import { useContext, useEffect } from 'react';

import ListLamp from '../../components/ListLamp';
import Title from '../../components/Title';
import { LampsContext } from '../../context/LampsContext/LampsContext';

const Shop = () => {
    const { isLoading, lamps, getAllLamps } = useContext(LampsContext);

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
