import DashboardContent from '../../components/DashboardContent';
import ListContainer from '../../components/ListContainer';
import RequestItemContainer from '../../components/RequestItemContainer';
import DishInfo from '../../components/DishInfo';
import BuyerInfo from '../../components/BuyerInfo';
import ItemButtonsContainer from '../../components/ItemButtonsContainer';
import { useState, useEffect } from 'react';
import getAddressRates from '../../utils/web3/GetAddressRates';
import { ethers } from 'ethers';

const CalificationsView = ({ address, ethPrice }) => {

    const [dishes, setDishes] = useState([]);

    const formatPrice = (price) => {
        return ethers.formatEther(price);
    }

    useEffect(() => {
        getAddressRates(address).then(setDishes);
    });

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
                            buyerDescription={dish[10]}
                        />
                        <ItemButtonsContainer>

                        </ItemButtonsContainer>
                    </RequestItemContainer>
                )) : <div>No califications found.</div>}
            </ListContainer>
        </DashboardContent>
    );
};

export default CalificationsView;