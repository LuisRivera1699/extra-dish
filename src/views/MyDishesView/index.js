import DashboardContent from '../../components/DashboardContent';
import DishCard from '../../components/DishCard';
import DishInfo from '../../components/DishInfo';
import DashboardButtonsContainer from '../../components/DashboardButtonsContainer';
import Button from '../../components/Button';
import DishesContainer from '../../components/DishesContainer';
import { useState, useEffect } from 'react';
import getMyDishes from '../../utils/web3/GetMyDishes';
import { ethers } from 'ethers';

const MyDishesView = ({ setSelectedTab, ethPrice }) => {

    const [dishes, setDishes] = useState([]);

    const formatPrice = (price) => {
        console.log(price);
        return ethers.formatEther(price);
    }

    useEffect(() => {
        getMyDishes().then(setDishes);
    }, []);

    return (
        <DashboardContent>
            <DishesContainer>
                {
                    dishes.length > 0 ? dishes.map((dish, index) => (
                        console.log(dish),
                        <DishCard
                            imgSrc={`https://${dish[4]}`}
                        >
                            <DishInfo
                                dishName={dish[0]}
                                dishDescription={dish[1]}
                                status={dish[6].toString()}
                                address={dish[3]}
                                price={`$ETH ${formatPrice(dish[2])} ~ ${formatPrice(dish[2])*ethPrice} USD`}
                            />
                        </DishCard>
                    )) : <p>No dishes found.</p>
                }
            </DishesContainer>
            <DashboardButtonsContainer>
                <Button buttonText="Create new dish" type="blue" onClick={() => setSelectedTab(3)} />
            </DashboardButtonsContainer>
        </DashboardContent>
    )
}

export default MyDishesView;