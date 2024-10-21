import './index.css';

const DishInfo = ({ dishName, dishDescription, status, address, price }) => {
    
    const statusMap = {
        0: 'Not created',
        1: 'PENDING',
        2: 'REQUESTED',
        3: 'RECEIVED',
        4: 'RECEIVED'
    }
    
    return (
        <div className="dish-info">
            <h3>{dishName}</h3>
            <p>{dishDescription}</p>
            <p className={statusMap[status]}>{statusMap[status]}</p>
            <p>{address}</p>
            <p>{price}</p>
        </div>
    )
}

export default DishInfo;