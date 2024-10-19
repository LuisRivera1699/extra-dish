import './index.css';

const DishInfo = ({ dishName, dishDescription, status, address, price }) => {
    return (
        <div className="dish-info">
            <h3>{dishName}</h3>
            <p>{dishDescription}</p>
            <p>{status}</p>
            <p>{address}</p>
            <p>{price}</p>
        </div>
    )
}

export default DishInfo;