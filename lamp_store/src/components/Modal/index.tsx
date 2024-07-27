import './styles.scss';

import {
    FC, MouseEvent, ReactNode, useCallback, useEffect,
} from 'react';
import ReactDOM from 'react-dom';

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
        window.addEventListener('keydown', handleEsc); // добавляется обработчик события keydown к объекту window
        return () => window.removeEventListener('keydown', handleEsc);
        // Когда компонент размонтируется или handleEsc изменится, обработчик события keydown будет удален
    }, [handleEsc]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset'; // сбрасывает свойство
        }
    }, [isOpen]);

    // Чтобы оно закрывалось, если пользователь кликает на область вне модалки
    const handleOverlayClick = () => {
        onClose();
    };

    // Чтобы оно не закрывалось, если пользователь кликает внутрь модалки
    const handleContentClick = (e: MouseEvent) => {
        e.stopPropagation(); // для предотвращения всплытия
    };

    // Отключаем модальное окно, пока не нажали на него
    if (!isOpen) {
        return null;
    }

    // createPortal — это способ, который позволяет показывать что-то в другом месте на странице,
    // даже если оно находится внутри другого компонента

    return ReactDOM.createPortal(
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content" onClick={handleContentClick}>
                <button className="modal-close" onClick={onClose}>&times;</button>
                {children}
            </div>
        </div>,
        document.body, // Рендеринг модального окна в body документа
    );
};

export default Modal;
