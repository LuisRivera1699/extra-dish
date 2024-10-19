import './index.css';

const BuyerInfo = ({ buyerAddress, buyerDescription }) => {
    return (
        <div className="buyer-info">
            <h3>Buyer</h3>
            <p>{buyerAddress}</p>
            <p>{buyerDescription}</p>
        </div>
    )
}

export default BuyerInfo;