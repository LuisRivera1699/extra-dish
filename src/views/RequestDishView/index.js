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
import requestDish from '../../utils/web3/RequestDish';
import { ethers } from 'ethers';

const RequestDishView = ({ setSelectedTab, dish, setWalletModalAddress, setIsOpen, ethPrice }) => {

    const [requestDescription, setRequestDescription] = useState('');
    const handleRequestDish = async () => {
        await requestDish(parseInt(dish[7].toString()), requestDescription, dish[2]);
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
                    <InputContainer type="text" placeholder="Write your request description..." label="Request description" value={requestDescription} onChange={(e) => setRequestDescription(e.target.value)} />
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
                <Button buttonText="Go back" type="orange" onClick={() => setSelectedTab(0)} />
                <Button buttonText="Request dish" type="blue" onClick={handleRequestDish} />
            </DashboardButtonsContainer>
        </DashboardContent>
    );
};

export default RequestDishView;