import './index.css';

const DishesContainer = ({ children }) => {
    return (
        <div className="dishes-container">
            {children}
        </div>
    )
}

export default DishesContainer;