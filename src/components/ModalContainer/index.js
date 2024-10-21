import './index.css';

const ModalContainer = ({ isOpen, setIsOpen, children }) => {
    if (!isOpen) return null;
    return (
        <div className="modal-overlay" onClick={() => setIsOpen(!isOpen)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export default ModalContainer;