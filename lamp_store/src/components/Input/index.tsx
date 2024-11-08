import { FC } from 'react';

interface IInput {
    type: string;
    placeholder?: string;
    value: number | string;
    name?: string;
    className?: string;
    readOnly?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // React.ChangeEvent<HTMLInputElement> - тип события,
    // который предоставляет информацию о том, что произошло изменение в элементе ввода
}

const Input: FC<IInput> = ({
    type, placeholder, value, name, className, onChange, readOnly,
}) => (
    <input
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        className={className}
        readOnly={readOnly}
        onChange={onChange}
    />
);

export default Input;
