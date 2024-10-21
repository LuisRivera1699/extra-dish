import ListContainer from '../../components/ListContainer';
import RequestItemContainer from '../../components/RequestItemContainer';
import DishInfo from '../../components/DishInfo';
import BuyerInfo from '../../components/BuyerInfo';
import ItemButtonsContainer from '../../components/ItemButtonsContainer';
import Button from '../../components/Button';
import DashboardContent from '../../components/DashboardContent';
import getMyRequestsAsASeller from '../../utils/web3/GetMyRequestsAsASeller';
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import cancelRequest from '../../utils/web3/CancelRequest';

const RequestsView = ({ ethPrice }) => {

    const [dishes, setDishes] = useState([]);

    const formatPrice = (price) => {
        return ethers.formatEther(price);
    }

    const handleCancelRequest = async (dishId) => {
        await cancelRequest(dishId);
        getMyRequestsAsASeller().then(setDishes);
    }

    useEffect(() => {
        getMyRequestsAsASeller().then(setDishes);
    }, []);

    return (
        <DashboardContent>
            <ListContainer>
                {dishes.length > 0 ? dishes.map((dish, index) => (
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
                            {dish[6].toString() === '2' && <Button buttonText="Cancel" type="red" inItem={true} onClick={() => handleCancelRequest(dish[7])} />}
                        </ItemButtonsContainer>
                    </RequestItemContainer>
                )) : <p>No requests found.</p>}
            </ListContainer>
        </DashboardContent>
    );
};

export default RequestsView;