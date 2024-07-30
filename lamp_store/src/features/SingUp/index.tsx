import './styles.scss';

import {
    ErrorMessage, Field, Form, Formik,
} from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import Button from '../../components/Button';
import { IRegisterData } from '../../store/UserStore/interface';
import UserStore from '../../store/UserStore/UserStore';

const SignUp = () => {
    const { register } = UserStore();
    const navigate = useNavigate();

    const funFetchRegister = async (values: IRegisterData) => {
        await register(values); // вызываем метод register с данными, введенными пользователем
        navigate('/');
    };

    return (
        <div className="authentication">
            <h1>Create an account</h1>
            <Formik
                initialValues={{ name: '', email: '', password: '' }} // Задает начальные значения полей формы
                validationSchema={Yup.object({ // Определяет правила валидации с использованием Yup
                    name: Yup.string()
                        .min(2, 'Minimum 2 letters')
                        .max(50, 'Maximum 50 letters')
                        .required('Required'),
                    email: Yup.string()
                        .email('Invalid email')
                        .required('Required'),
                    password: Yup.string()
                        .min(8, 'Too Short! At least 8 characters')
                        .required('Required'),
                })}
                onSubmit={(values) => {
                    funFetchRegister(values);
                }}
            >
                <Form>
                    <label htmlFor="name">Name</label>
                    <Field type="text" name="name" />
                    <ErrorMessage name="name" component="p" className="error" />

                    <label htmlFor="email">Email</label>
                    <Field type="email" name="email" />
                    <ErrorMessage name="email" component="p" className="error" />

                    <label htmlFor="password">Password</label>
                    <Field type="password" name="password" />
                    <ErrorMessage name="password" component="p" className="error" />

                    <Button type="submit">Register</Button>
                </Form>
            </Formik>
        </div>
    );
};

export default SignUp;
