import './index.css';

const HeaderButton = ({ text, onClick, isActive }) => {
    return (
        <button className={`header-button ${isActive ? "active" : ""}`} onClick={onClick}>
            {text}
        </button>
    );
};

export default HeaderButton;