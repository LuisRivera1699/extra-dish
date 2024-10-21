import DashboardContent from '../../components/DashboardContent';
import DishesContainer from '../../components/DishesContainer';
import DishCard from '../../components/DishCard';
import DishInfo from '../../components/DishInfo';
import { useState, useEffect } from 'react';
import getPendingDishes from '../../utils/web3/GetPendingDishes';
import { ethers } from 'ethers';

const DishesView = ({ setSelectedTab, setDish, ethPrice }) => {

    const [dishes, setDishes] = useState([]);

    const formatPrice = (price) => {
        return ethers.formatEther(price);
    }

    useEffect(() => {
        getPendingDishes().then(setDishes);
    }, []);

    return (
        <DashboardContent>
            <DishesContainer>
                {
                    dishes.length > 0 ? dishes.map((dish, index) => (
                        <DishCard
                            imgSrc={`https://${dish[4]}`}
                            onClick={() => {
                                setDish(dish);
                                setSelectedTab(2);
                            }}
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
        </DashboardContent>
    );
};

export default DishesView;