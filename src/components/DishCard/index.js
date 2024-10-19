import './index.css';

const DishCard = ({ imgSrc, children }) => {
    return (
        <div className="dish-card">
            <img src={imgSrc} alt="" />
            {children}
        </div>
    )
}

export default DishCard;