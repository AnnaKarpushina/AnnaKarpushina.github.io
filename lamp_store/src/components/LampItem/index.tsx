import './styles.scss';

import { FC } from 'react';

import { ILamp } from '../../store/LampsStore/interface';
import Images from '../Images';

interface IListItem {
    lamp: ILamp;
}

const LampItem: FC<IListItem> = ({ lamp }) => (
    <div className="lampItem" key={lamp._id}>
        <Images className="lampItem_img" src={lamp.productImage} alt={lamp.name} />
        <div className="lampItem-text">
            <h4>{lamp.name}</h4>
            <p>{lamp.price?.toLocaleString()} ₽</p>
        </div>
    </div>
);

export default LampItem;
