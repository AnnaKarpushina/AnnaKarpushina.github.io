import './styles.scss';

import {
    FC, MouseEvent, ReactNode, useCallback, useEffect,
} from 'react';
import ReactDOM from 'react-dom';

import Button from '../Button';

interface IModal {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode; // Содержимое модального окна
}

const Modal: FC<IModal> = ({ isOpen, onClose, children }) => {
    // Обработчик для закрытия модального окна по нажатию клавиши Escape
    // Используется useCallback, чтобы избежать создания новой функции при каждом рендере
    const handleEsc = useCallback((e: KeyboardEvent) => { // событие клавиатуры
        if (e.key === 'Escape') {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleEsc);
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [isOpen, handleEsc]);

    // Чтобы оно не закрывалось, если пользователь кликает внутрь модалки
    const handleContentClick = (e: MouseEvent) => {
        e.stopPropagation();
    };

    if (!isOpen) return null; // Отключаем модальное окно, пока не нажали на него

    // createPortal — это способ, который позволяет показывать что-то в другом месте на странице,
    // даже если оно находится внутри другого компонента

    return ReactDOM.createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={handleContentClick}>
                <Button className="modal-close" onClick={onClose}>&times;</Button>
                {children}
            </div>
        </div>,
        document.body, // Рендеринг модального окна в body документа
    );
};

export default Modal;
