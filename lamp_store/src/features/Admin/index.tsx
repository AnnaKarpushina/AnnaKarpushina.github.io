import './styles.scss';

import { FC, useEffect } from 'react';

import Button from '../../components/Button';
import Input from '../../components/Input';
import ListAdmin from '../../components/ListAdmin';
import Loading from '../../components/Loading';
import ModalCreateEdit from '../../components/ModalCreateEdit';
import AdminStore from '../../store/AdminStore/AdminStore';
import LampsStore from '../../store/LampsStore/LampsStore';

const Admin:FC = () => {
    const {
        modalOpen, currentProduct, search,
        getAllLamps, openModal, closeModal, setSearch, getFilteredLamps,
    } = AdminStore();

    const { isLoading } = LampsStore();

    const filterLamps = getFilteredLamps();

    useEffect(() => {
        getAllLamps(); // получаем данные с сервера при первой загрузке компонента
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="admin">
            <div className="admin_search">
                <Input
                    type="text"
                    placeholder="Search products by name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button onClick={openModal}>Create Product</Button>
            </div>

            <ModalCreateEdit
                modalOpen={modalOpen}
                closeModal={closeModal}
                currentProduct={currentProduct}
            />

            {filterLamps.length > 0 ? (
                <>
                    <div className="admin_table admin_table-title">
                        <p>Image</p>
                        <p>Product Name</p>
                        <p>Price</p>
                        <p>Product amount</p>
                        <p>Actions</p>
                    </div>

                    <ListAdmin />
                </>
            ) : (
                <div className="admin_bun">No lamps found</div>
            )}
        </div>
    );
};

export default Admin;
