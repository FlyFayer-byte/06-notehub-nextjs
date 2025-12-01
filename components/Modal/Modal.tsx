import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  // Закриття по Escape
 useEffect(() => {
   const handleKeyDown = (e: KeyboardEvent) => {
     if (e.key === 'Escape') onClose();
   };

   // Блокуємо скрол під модальним вікном
   const prevOverflow = document.body.style.overflow;
   document.body.style.overflow = 'hidden';

   window.addEventListener('keydown', handleKeyDown);

   return () => {
     window.removeEventListener('keydown', handleKeyDown);

     // Повертаємо попередню поведінку сторінки
     document.body.style.overflow = prevOverflow;
   };
 }, [onClose]);


  // Закриття при кліку по backdrop
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Рендер у портал
  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>{children}</div>
    </div>,
    document.body
  );
}
