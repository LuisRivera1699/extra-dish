import './index.css';
import HeaderButton from '../HeaderButton';
import Header from '../Header';
import DashboardHeader from '../DashboardHeader';
import DashboardContent from '../DashboardContent';
import DishesContainer from '../DishesContainer';
import DishCard from '../DishCard';
import DishInfo from '../DishInfo';
import Button from '../Button';
import ListContainer from '../ListContainer';
import RequestItemContainer from '../RequestItemContainer';
import BuyerInfo from '../BuyerInfo';
import ItemButtonsContainer from '../ItemButtonsContainer';
import DashboardButtonsContainer from '../DashboardButtonsContainer';
import DishDetailContainer from '../DishDetailContainer';
import DetailContainer from '../DetailContainer';
import InputContainer from '../InputContainer';
import ViewCookerCalifications from '../ViewCookerCalifications';

const DashboardContainer = ({ children, wrappedAddress, authType, authTypeOnClick, selectedTab, setSelectedTab }) => {
    return (
        <div className="dashboard-container">
            <DashboardHeader>
                <Header className="header-top">
                    <HeaderButton text={wrappedAddress} />
                    <HeaderButton text="I have an extra dish" isActive={authType === 0} onClick={() => authTypeOnClick(0)}/>
                    <HeaderButton text="I'm hungry" isActive={authType === 1} onClick={() => authTypeOnClick(1)}/>
                </Header>
                <Header className="header-bottom">
                    <HeaderButton isActive={selectedTab === 0} text={authType === 0 ? "My dishes" : "Dishes"} onClick={() => setSelectedTab(0)}/>
                    <HeaderButton isActive={selectedTab === 1} text={authType === 0 ? "Requests" : "My requests"} onClick={() => setSelectedTab(1)}/>
                    {authType === 0 && <HeaderButton isActive={selectedTab === 2} text="Califications" onClick={() => setSelectedTab(2)}/>}
                </Header>
            </DashboardHeader>
            <DashboardContent>
                {children}
                {/* <DishesContainer>
                    <DishCard 
                        imgSrc="https://origin.cronosmedia.glr.pe/large/2024/05/02/lg_6633bb8bed7fed5a801a8bb0.jpg" 
                    >
                        <DishInfo 
                            dishName="Tallarines verdes" 
                            dishDescription="Ricos tallarines verdes con 2 huevos fritos." 
                            status="Status" 
                            address="Address" 
                            price="Price" 
                        />
                    </DishCard>    
                </DishesContainer> */}
                {/* <ListContainer>
                    <RequestItemContainer>
                        <DishInfo
                            dishName="Tallarines verdes"
                            dishDescription="Ricos tallarines verdes con 2 huevos fritos."
                            status="Status"
                            address="Address"
                            price="Price"
                        />
                        <BuyerInfo
                            buyerAddress="0x3abd2395dbd8a85B00badC984d207171aAaEB060"
                            buyerDescription="Hola lo voy a recoger en unos 10 minutos. Esperame o llamame a 957428888."
                        />
                        <ItemButtonsContainer>
                            <Button buttonText="Received" type="green" inItem={true} />
                            <Button buttonText="Cancel" type="red" inItem={true} />
                        </ItemButtonsContainer>
                    </RequestItemContainer>
                </ListContainer> */}
                {/* <DishDetailContainer>
                    <DetailContainer>
                        <h1>Create new dish</h1>
                        <InputContainer type="text" placeholder="Write your dish name..." label="Name" />
                        <InputContainer type="text" placeholder="Write your dish description..." label="Description" />
                        <InputContainer type="file" placeholder="Upload an image" label="Image" />
                        <InputContainer type="text" placeholder="Write your pickup address..." label="Pickup Address" />
                        <InputContainer type="number" placeholder="Write your dish price..." label="Price (BASE ~ 1USD)" />
                    </DetailContainer>
                    <DetailContainer>
                        <h1>Preview</h1>
                        <DishCard
                            imgSrc="https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
                        >
                            <DishInfo
                                dishName="Dish name"
                                dishDescription="Dish description"
                                status="PENDING"
                                address="Pick up address"
                                price="$BASE 0 ~ 0USD"
                            />
                        </DishCard>
                        <ViewCookerCalifications />
                    </DetailContainer>
                </DishDetailContainer> */}

                {/* <DashboardButtonsContainer>
                    <Button buttonText="Go back" type="orange" />
                    <Button buttonText="Create dish" type="blue" />
                </DashboardButtonsContainer> */}
            </DashboardContent>
        </div>
    )
}

export default DashboardContainer;