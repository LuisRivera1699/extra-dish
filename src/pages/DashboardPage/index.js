import DashboardContainer from '../../components/DashboardContainer';
import { AuthContext } from '../../providers/AuthProvider';
import { useContext, useState } from 'react';

const DashboardPage = () => {
    const { walletAddress, authType, setAuthType } = useContext(AuthContext);
    const [selectedTab, setSelectedTab] = useState(0);

    const wrapAddress = (address) => {
        if (address) {
            return address.slice(0, 6) + "..." + address.slice(-4);
        }
        return "";
    }

    const getTab = () => {
        if (authType === 0) {
            switch (selectedTab) {
                case 0: return "My dishes";
                case 1: return "Requests";
                case 2: return "Califications";
            }
        } else {
            switch (selectedTab) {
                case 0: return "Dishes";
                case 1: return "My requests";
            }
        }
    }

    const handleAuthTypeClick = (type) => {
        setSelectedTab(0);
        setAuthType(type);
    }

    return (
        <DashboardContainer wrappedAddress={wrapAddress(walletAddress)} authType={authType} authTypeOnClick={handleAuthTypeClick} selectedTab={selectedTab} setSelectedTab={setSelectedTab}>
            <h1>{getTab()}</h1>
        </DashboardContainer>
    )
}

export default DashboardPage;