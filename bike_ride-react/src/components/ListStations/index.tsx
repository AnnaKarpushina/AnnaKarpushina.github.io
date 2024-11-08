import './styles.scss';

import { FC } from 'react';

import useStationsStore from '../../store/useStationsStore/useStationsStore';
import Loading from '../Loading';

const ListStations: FC = () => {
  const {
    isLoadingSt,
    toggleFavorite,
    favorites,
    stationsCount,
    showFavoritesStations,
    isShowFavorites,
  } = useStationsStore();

  if (isLoadingSt) {
    return <Loading />;
  }

  if (!stationsCount && !isShowFavorites) {
    return <p className="listStations_items_notSelected">Станция не выбрана</p>;
  }

  return (
    <div className="listStations">
      <div className="listStations_items">
        {showFavoritesStations().map((station) => (
          <div className="listStations_items_item" key={station.id}>
            <div className="listStations_items_item-title">
              <p>{station.name}</p>
              <div className="listStations_items_item-title-like">
                {favorites.find((i) => i.id === station.id) ? '❤️' : ' '}
              </div>
            </div>
            <p className="listStations_items_item-description">
              Кол-во свободных велосипедов на станции:{' '}
              <span>{station.free_bikes}</span>
            </p>
            <div
              className={`listStations_items_item-button ${favorites.find((i) => i.id === station.id) ? 'del' : ''}`}
              onClick={() => toggleFavorite(station.id)}
            >
              <p>
                {favorites.find((i) => i.id === station.id)
                  ? 'Убрать из избранного'
                  : 'Добавить в избранное'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListStations;
