import './index.css';

const InputContainer = ({ type, placeholder, label }) => {
    return (
        <div className="input-container">
            <label>{label}</label>
            <input type={type} placeholder={placeholder} />
        </div>
    )
}

export default InputContainer;