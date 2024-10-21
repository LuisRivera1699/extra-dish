import './index.css';

const InputContainer = ({ type, placeholder, label, value, onChange, disabled }) => {
    return (
        <div className="input-container">
            <label>{label}</label>
            <input type={type} disabled={disabled} placeholder={placeholder} value={value} onChange={onChange} />
        </div>
    )
}

export default InputContainer;