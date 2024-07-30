import './styles.scss';

import { FC } from 'react';

import AdminStore from '../../store/AdminStore/AdminStore';
import { ILamp } from '../../store/LampsStore/interface';
import Button from '../Button';
import Images from '../Images';

interface IAdminItem {
    lamp: ILamp;
    onEdit: (lamp: ILamp) => void;
}

const AdminItem:FC<IAdminItem> = ({ lamp, onEdit }) => {
    const { deleteProduct } = AdminStore();

    const handleEdit = () => {
        onEdit(lamp);
    };

    const handleDelete = async () => {
        await deleteProduct(lamp._id);
    };

    return (
        <div key={lamp._id} className="admin_table">
            <Images src={lamp.productImage} alt={lamp.name} />
            <span>
                <b className="admin_table-span">Product Name:</b>
                {lamp.name}
            </span>
            <span>
                <b className="admin_table-span">Price:</b>
                {lamp.price?.toLocaleString()}
            </span>
            <span>
                <b className="admin_table-span">Product amount:</b>
                {lamp.amount}
            </span>
            <div className="admin_table-button">
                <Button className="admin_table-button-edit" onClick={handleEdit}>Edit</Button>
                <Button className="admin_table-button-delete" onClick={handleDelete}>Delete</Button>
            </div>
        </div>
    );
};

export default AdminItem;
