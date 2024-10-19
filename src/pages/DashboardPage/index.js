import DashboardContainer from '../../components/DashboardContainer';
import { AuthContext } from '../../providers/AuthProvider';
import { useContext } from 'react';

const DashboardPage = () => {
    const { walletAddress, authType, setAuthType } = useContext(AuthContext);

    const wrapAddress = (address) => {
        if (address) {
            return address.slice(0, 6) + "..." + address.slice(-4);
        }
        return "";
    }

    const handleAuthTypeClick = (type) => {
        setAuthType(type);
    }

    return (
        <DashboardContainer wrappedAddress={wrapAddress(walletAddress)} authType={authType} authTypeOnClick={handleAuthTypeClick}>
        </DashboardContainer>
    )
}

export default DashboardPage;