import { FC } from 'react';

import { ILamp } from '../../context/LampsContext/interface';
import AdminItem from '../AdminItem';

interface IListAdmin {
    lamps: ILamp[],
    onEdit: (lamp: ILamp) => void;
}

const ListAdmin:FC<IListAdmin> = ({ lamps, onEdit }) => (
    <div>
        {lamps.map((lamp) => (
            <AdminItem key={lamp._id} lamp={lamp} onEdit={onEdit} />
        ))}
    </div>
);

export default ListAdmin;
