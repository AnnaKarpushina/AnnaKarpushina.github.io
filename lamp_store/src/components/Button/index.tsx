import { FC, ReactNode } from 'react';

interface IButton {
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    children: ReactNode; // указываем тип, который представляет любой элемент, который может быть отрисован
    type?: 'submit' | 'button';
}

const Button: FC<IButton> = ({
    className, onClick, disabled, children, type,
}) => (
    <button type={type} className={className} onClick={onClick} disabled={disabled}>
        {children}
    </button>
);

export default Button;
