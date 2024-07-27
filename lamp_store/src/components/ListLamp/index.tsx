import './styles.scss';

import { FC } from 'react';
import { Link } from 'react-router-dom';

import { ILamp } from '../../context/LampsContext/interface';
import LampItem from '../LampItem';
import Loading from '../Loading';

interface IListLamp {
    lamps: ILamp[];
    isLoading: boolean;
}

const ListLamp: FC<IListLamp> = ({ lamps, isLoading }) => {
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
