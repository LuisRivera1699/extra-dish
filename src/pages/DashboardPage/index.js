import DashboardContainer from '../../components/DashboardContainer';
import { AuthContext } from '../../providers/AuthProvider';
import { useContext, useState } from 'react';
import MyDishesView from '../../views/MyDishesView';
import RequestsView from '../../views/RequestsView';
import CalificationsView from '../../views/CalificationsView';
import DishesView from '../../views/DishesView';
import MyRequestsView from '../../views/MyRequestsView';
import CreateDishView from '../../views/CreateDishView';
import RequestDishView from '../../views/RequestDishView';
import RateDishView from '../../views/RateDishView';
import ModalView from '../../views/ModalView';
const DashboardPage = () => {
    const { walletAddress, authType, setAuthType, ethPrice } = useContext(AuthContext);
    const [selectedTab, setSelectedTab] = useState(0);
    const [dish, setDish] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [walletModalAddress, setWalletModalAddress] = useState('');

    const wrapAddress = (address) => {
        if (address) {
            return address.slice(0, 6) + "..." + address.slice(-4);
        }
        return "";
    }

    const getTab = () => {
        if (authType === 0) {
            switch (selectedTab) {
                case 0: return <MyDishesView ethPrice={ethPrice} setSelectedTab={setSelectedTab} />;
                case 1: return <RequestsView ethPrice={ethPrice} />;
                case 2: return <CalificationsView ethPrice={ethPrice} address={walletAddress}/>;
                case 3: return <CreateDishView setSelectedTab={setSelectedTab} ethPrice={ethPrice}/>;
                default: return <></>;
            }
        } else {
            switch (selectedTab) {
                case 0: return <DishesView ethPrice={ethPrice} setSelectedTab={setSelectedTab} setDish={setDish} />;
                case 1: return <MyRequestsView ethPrice={ethPrice} setSelectedTab={setSelectedTab} setDish={setDish}/>;
                case 2: return <RequestDishView setSelectedTab={setSelectedTab} dish={dish} ethPrice={ethPrice} setWalletModalAddress={setWalletModalAddress} setIsOpen={setIsOpen}/>;
                case 3: return <RateDishView setSelectedTab={setSelectedTab} dish={dish} ethPrice={ethPrice} setWalletModalAddress={setWalletModalAddress} setIsOpen={setIsOpen}/>;
                case 4: return <RateDishView setSelectedTab={setSelectedTab} dish={dish} ethPrice={ethPrice} setWalletModalAddress={setWalletModalAddress} setIsOpen={setIsOpen}/>;
                default: return <></>;
            }
        }
    }

    const modalView = <ModalView isOpen={isOpen} setIsOpen={setIsOpen} address={walletModalAddress} />;

    const handleAuthTypeClick = (type) => {
        setSelectedTab(0);
        setAuthType(type);
    }

    return (
        <DashboardContainer wrappedAddress={wrapAddress(walletAddress)} authType={authType} authTypeOnClick={handleAuthTypeClick} selectedTab={selectedTab} setSelectedTab={setSelectedTab} isOpen={isOpen} setIsOpen={setIsOpen} modalView={modalView}>
            {getTab()}
        </DashboardContainer>
    )
}

export default DashboardPage;