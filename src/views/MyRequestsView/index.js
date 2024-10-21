import DashboardContent from '../../components/DashboardContent';
import ListContainer from '../../components/ListContainer';
import RequestItemContainer from '../../components/RequestItemContainer';
import DishInfo from '../../components/DishInfo';
import BuyerInfo from '../../components/BuyerInfo';
import ItemButtonsContainer from '../../components/ItemButtonsContainer';
import Button from '../../components/Button';
import getMyRequestsAsABuyer from '../../utils/web3/GetMyRequestsAsABuyer';
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import cancelRequest from '../../utils/web3/CancelRequest';
import receiveRequest from '../../utils/web3/ReceiveRequest';

const MyRequestsView = ({ setSelectedTab, setDish, ethPrice }) => {

    const [dishes, setDishes] = useState([]);

    const formatPrice = (price) => {
        return ethers.formatEther(price);
    }

    const handleCancelRequest = async (dishId) => {
        await cancelRequest(dishId);
        getMyRequestsAsABuyer().then(setDishes);
    }

    const handleReceiveRequest = async (dishId) => {
        await receiveRequest(dishId);
        getMyRequestsAsABuyer().then(setDishes);
    }

    useEffect(() => {
        getMyRequestsAsABuyer().then(setDishes);
    }, []);

    return (
        <DashboardContent>
            <ListContainer>
                {dishes.length > 0 ?dishes.map((dish, index) => (
                    <RequestItemContainer>
                        <DishInfo
                            dishName={dish[0]}
                            dishDescription={dish[1]}
                            status={dish[6].toString()}
                            address={dish[3]}
                            price={`$ETH ${formatPrice(dish[2])} ~ ${formatPrice(dish[2])*ethPrice} USD`}
                        />
                        <BuyerInfo
                            buyerAddress={dish[8]}
                            buyerDescription={dish[9]}
                        />
                        <ItemButtonsContainer>
                            {dish[6].toString() === '2' && <Button buttonText="Received" type="green" inItem={true} onClick={() => handleReceiveRequest(dish[7])}/>}
                            {dish[6].toString() === '2' && <Button buttonText="Cancel" type="red" inItem={true} onClick={() => handleCancelRequest(dish[7])}/>}
                            {dish[6].toString() === '3' && <Button buttonText="Rate" type="blue" inItem={true} onClick={() => {setDish(dish); setSelectedTab(3);}}/>}
                            {dish[6].toString() === '4' && <Button buttonText="View Rate" type="blue" inItem={true} onClick={() => {setDish(dish); setSelectedTab(4);}}/>}
                        </ItemButtonsContainer>
                    </RequestItemContainer>
                )) : <p>No requests found.</p>}
            </ListContainer>
        </DashboardContent>
    );
};

export default MyRequestsView;