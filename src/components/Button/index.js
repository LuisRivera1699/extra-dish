import './index.css';

const Button = ({ buttonText, onClick, type, inItem }) => {
    const buttonStyle = {
        "blue": "#C1E1EC",
        "green": "#A8E6CF",
        "orange": "#FFD3B6",
        "red": "#E6A8A8",
    }
    return (
        <button className={`button ${inItem ? 'in-item' : ''}`} style={{ backgroundColor: buttonStyle[type] }} onClick={onClick}>
            {buttonText}
        </button>
    )
}

export default Button;