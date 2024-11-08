import './styles.scss';

import {
    ErrorMessage, Field, Form, Formik,
} from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import Button from '../../components/Button';
import UserStore from '../../store/UserStore/UserStore';

const SignIn = () => {
    const { login } = UserStore();
    const navigate = useNavigate();

    return (
        <div className="authentication">
            <h1>Log in to your account</h1>
            <Formik
                initialValues={{ email: '', password: '' }} // Задает начальные значения полей формы
                validationSchema={Yup.object({ // Определяет правила валидации с использованием Yup
                    email: Yup.string()
                        .email('Invalid email')
                        .required('Required'),
                    password: Yup.string()
                        .min(8, 'Too Short! At least 8 characters')
                        .required('Required'),
                })}
                onSubmit={(values) => {
                    login(values, () => navigate('/'));
                }}
            >
                <Form>
                    <label htmlFor="email">Email</label>
                    <Field type="email" name="email" />
                    <ErrorMessage name="email" component="p" className="error" />

                    <label htmlFor="password">Password</label>
                    <Field type="password" name="password" />
                    <ErrorMessage name="password" component="p" className="error" />

                    <Button type="submit">Login</Button>
                </Form>
            </Formik>
        </div>
    );
};
export default SignIn;
