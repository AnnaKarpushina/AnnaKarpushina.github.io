import './styles.scss';

import { useContext, useEffect, useState } from 'react';

import Button from '../../components/Button';
import Input from '../../components/Input';
import ListAdmin from '../../components/ListAdmin';
import Loading from '../../components/Loading';
import ModalCreateEdit from '../../components/ModalCreateEdit';
import { ILamp } from '../../context/LampsContext/interface';
import { LampsContext } from '../../context/LampsContext/LampsContext';

const Admin = () => {
    const { lamps, getAllLamps, isLoading } = useContext(LampsContext);

    const [modalOpen, setModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<ILamp | null>(null); // текущий продукт, который редактируется

    const [search, setSearch] = useState('');

    const openModal = () => setModalOpen(true);

    const closeModal = () => {
        setModalOpen(false);
        setCurrentProduct(null); // сбрасываем текущий продукт
    };

    const onEdit = (lamp: ILamp) => {
        setCurrentProduct(lamp); // устанавливает текущий продукт
        openModal();
    };

    const filterLamps = lamps.filter((lamp) => lamp.name.toLowerCase().includes(search.toLowerCase()));

    useEffect(() => {
        getAllLamps(); // получаем данные с сервера при первой загрузке компонента
    }, []);

    if (isLoading) {
        return (<Loading />);
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

            <ModalCreateEdit modalOpen={modalOpen} closeModal={closeModal} currentProduct={currentProduct} />

            {filterLamps.length > 0 ? (
                <>
                    <div className="admin_table admin_table-title">
                        <p>Image</p>
                        <p>Product Name</p>
                        <p>Price</p>
                        <p>Product amount</p>
                    </div>

                    <ListAdmin lamps={filterLamps} onEdit={onEdit} />
                </>
            ) : (
                <div className="admin_bun">No lamps found</div>
            )}

        </div>
    );
};

export default Admin;
