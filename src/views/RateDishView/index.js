import DashboardContent from '../../components/DashboardContent';
import DishDetailContainer from '../../components/DishDetailContainer';
import DetailContainer from '../../components/DetailContainer';
import InputContainer from '../../components/InputContainer';
import DishCard from '../../components/DishCard';
import DishInfo from '../../components/DishInfo';
import DashboardButtonsContainer from '../../components/DashboardButtonsContainer';
import Button from '../../components/Button';
import ViewCookerCalifications from '../../components/ViewCookerCalifications';
import { useState } from 'react';
import rateDish from '../../utils/web3/RateDish';
import { ethers } from 'ethers';

const RateDishView = ({ setSelectedTab, dish, setWalletModalAddress, setIsOpen, ethPrice }) => {

    const [rateDescription, setRateDescription] = useState('');
    const handleRateDish = async () => {
        await rateDish(parseInt(dish[7].toString()), rateDescription);
        setSelectedTab(1);
    }

    const formatPrice = (price) => {
        return ethers.formatEther(price);
    }

    const handleViewCalifications = () => {
        setWalletModalAddress(dish[5]);
        setIsOpen(true);
    }

    return (
        <DashboardContent>
            <DishDetailContainer>
                <DetailContainer>
                    <h1>Dish detail</h1>
                    <InputContainer type="text" placeholder="Write your dish name..." label="Name" disabled={true} value={dish[0]} />
                    <InputContainer type="text" placeholder="Write your dish description..." label="Description" disabled={true} value={dish[1]} />
                    <InputContainer type="text" placeholder="Write your pickup address..." label="Pickup Address" disabled={true} value={dish[3]} />
                    <InputContainer type="number" placeholder="Write your dish price..." label="Price (ETH ~ 1USD)" disabled={true} value={formatPrice(dish[2])*ethPrice} />
                    <InputContainer type="text" placeholder="Write your rate description..." label="Rate description" value={dish[10] ? dish[10] : rateDescription} disabled={dish[10] ? true : false} onChange={!dish[10] ? (e) => setRateDescription(e.target.value) : null} />
                </DetailContainer>
                <DetailContainer>
                    <h1>Preview</h1>
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
                    <ViewCookerCalifications handleClick={handleViewCalifications} />
                </DetailContainer>
            </DishDetailContainer>
            <DashboardButtonsContainer>
                <Button buttonText="Go back" type="orange" onClick={() => setSelectedTab(1)} />
                {!dish[10] && <Button buttonText="Rate dish" type="blue" onClick={handleRateDish} />}
            </DashboardButtonsContainer>
        </DashboardContent>
    );
};

export default RateDishView;