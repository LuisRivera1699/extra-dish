import './index.css';

const DishCard = ({ imgSrc, children, onClick }) => {
    return (
        <div className="dish-card" onClick={onClick}>
            <img src={imgSrc} alt="" />
            {children}
        </div>
    )
}

export default DishCard;