import './styles.scss';

import { FC } from 'react';
import { Link } from 'react-router-dom';

import LampsStore from '../../store/LampsStore/LampsStore';
import LampItem from '../LampItem';
import Loading from '../Loading';

const ListLamp: FC = () => {
    const { isLoading, lamps } = LampsStore();

    if (isLoading) {
        return (<Loading />);
    }

    return (
        <div className="lamps">
            {lamps.map((lamp) => (
                <Link key={lamp._id} to={`/cardlamp/${lamp._id}`}>
                    <LampItem key={lamp._id} lamp={lamp} />
                </Link>
            ))}
        </div>
    );
};

export default ListLamp;
