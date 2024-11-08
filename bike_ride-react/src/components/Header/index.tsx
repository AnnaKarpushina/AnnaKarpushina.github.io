import './styles.scss';

import { FC } from 'react';
import { Tooltip } from 'react-tooltip';

import useNetworksStore from '../../store/useNetworksStore/useNetworksStore';
import useStationsStore from '../../store/useStationsStore/useStationsStore';

const Header: FC = () => {
    const { stationsCount, favoritesCount, toggleFavoritesView } = useStationsStore();
    const { activeNetwork } = useNetworksStore();
    
    return (
        <header>
            <p className="header_title">Bicycles App</p>

            <div className="header_content">
                <div className="header_content_left">
                    <p>Кол-во избранных: {favoritesCount}</p>
                    {activeNetwork.networkSelected && (
                        <>
                            <p>Кол-во станций в сети: {stationsCount}</p>
                            <p>{activeNetwork.name}</p>
                        </>
                    )}
                </div>
            </div>
            <div
                className="header_content_right"
                data-tooltip-id="favorites-tooltip"
                onClick={() => {
                    toggleFavoritesView();
                }}
            >
                <p>Избранные станции</p>
            </div>
            {!favoritesCount && (
                <Tooltip
                    id="favorites-tooltip"
                    content="У вас нет избранных"
                    className="favorites_tooltip"
                />
            )}
        </header>
    );
};

export default Header;
