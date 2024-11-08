import './styles.scss';

import {
    ErrorMessage, Field, Form, Formik,
} from 'formik';
import { FC } from 'react';
import * as Yup from 'yup';

import AdminStore from '../../store/AdminStore/AdminStore';
import { ILamp } from '../../store/LampsStore/interface';
import Button from '../Button';
import Images from '../Images';
import Modal from '../Modal';

interface IModalCreateEdit {
    modalOpen: boolean;
    closeModal: () => void;
    currentProduct: ILamp | null;
}

const ModalCreateEdit:FC<IModalCreateEdit> = ({ modalOpen, closeModal, currentProduct }) => {
    const { createProduct, updateProduct } = AdminStore();

    const initialValues = {
        name: currentProduct?.name || '',
        price: currentProduct?.price.toString() || '',
        amount: currentProduct?.amount.toString() || '',
        info: currentProduct?.info || '',
        image: currentProduct?.productImage || '',
    };

    const validationSchema = Yup.object({
        name: Yup.string()
            .required('Required'),
        price: Yup.number()
            .required('Required')
            .integer('Price must be an integer') // целое число
            .positive('Price must be a positive number'), // положительное числом
        amount: Yup.number()
            .required('Required')
            .integer('Amount must be an integer')
            .positive('Amount must be a positive number'),
        info: Yup.string()
            .required('Required'),
        image: Yup.string()
            .required('Required')
            .url('Invalid image URL'),
    });

    const handleSave = async (values: typeof initialValues) => {
        const newProductData = {
            // если значение слева от оператора ?? является null или undefined, то будет возвращено значение справа.
            id: currentProduct?._id ?? '',
            _id: currentProduct?._id ?? '',
            name: values.name,
            price: +values.price,
            amount: +values.amount,
            info: values.info,
            productImage: values.image,
        };

        if (currentProduct) {
            await updateProduct(newProductData);
        } else {
            await createProduct(newProductData);
        }

        closeModal();
    };

    return (
        <Modal isOpen={modalOpen} onClose={closeModal}>
            <div className="createProduct">
                <h1>{currentProduct ? 'Edit Product' : 'Create Product'}</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSave}
                >
                    {({ values }) => (
                        <Form>
                            <label htmlFor="name">Product Name</label>
                            <Field type="text" name="name" className="createProduct-input" />
                            <ErrorMessage name="name" component="p" className="createProduct-error" />

                            <label htmlFor="name">Product Price</label>
                            <Field type="text" name="price" className="createProduct-input" />
                            <ErrorMessage name="price" component="p" className="createProduct-error" />

                            <label htmlFor="amount">Product Amount</label>
                            <Field type="text" name="amount" className="createProduct-input" />
                            <ErrorMessage name="amount" component="p" className="createProduct-error" />

                            <label htmlFor="amount">Product Info</label>
                            <Field type="text" name="info" className="createProduct-input" />
                            <ErrorMessage name="info" component="p" className="createProduct-error" />

                            <label htmlFor="amount">Product Image</label>
                            <Field type="text" name="image" className="createProduct-input" />
                            <ErrorMessage name="image" component="p" className="createProduct-error" />

                            {values.image && (
                                <Images
                                    src={values.image}
                                    alt={values.name}
                                    className="createProduct-img"
                                />
                            )}

                            <Button type="submit">Save Product</Button>

                        </Form>
                    )}
                </Formik>

            </div>

        </Modal>
    );
};

export default ModalCreateEdit;
