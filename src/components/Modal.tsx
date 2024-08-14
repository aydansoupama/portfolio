import React from 'react';
import { LuX } from 'react-icons/lu';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <button className="close-button" onClick={onClose}><LuX size={14} /></button>
                <h2>Message sent successfully!</h2>
                <p>Thank you for your message. We will respond as soon as possible.</p>
            </div>
        </div>
    );
};

export default Modal;