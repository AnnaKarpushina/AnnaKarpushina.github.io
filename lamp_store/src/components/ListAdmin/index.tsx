import './styles.scss';

import { FC } from 'react';

import AdminStore from '../../store/AdminStore/AdminStore';
import Button from '../Button';
import Images from '../Images';

const ListAdmin:FC = () => {
    const { getFilteredLamps, setCurrentProduct, deleteProduct } = AdminStore();

    return (
        <>
            {getFilteredLamps().map((lamp) => (
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
                        <Button className="admin_table-button-edit" onClick={() => setCurrentProduct(lamp)}>Edit</Button>
                        <Button className="admin_table-button-delete" onClick={() => deleteProduct(lamp._id)}>Delete</Button>
                    </div>
                </div>
            ))}
        </>
    );
};

export default ListAdmin;
