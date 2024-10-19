import PageContainer from '../../components/PageContainer';
import AuthContainer from '../../components/AuthContainer';
import Button from '../../components/Button';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';

const AuthPage = () => {

    const { connectWallet } = useContext(AuthContext);

    return (
        <PageContainer>
            <AuthContainer>
                <h1>What do you have?</h1>
                <p>Select between the buttons below</p>
                <Button onClick={() => connectWallet(0)} buttonText="I have an extra dish" type="blue" />
                <Button onClick={() => connectWallet(1)} buttonText="I'm hungry" type="green" />
            </AuthContainer>
        </PageContainer>
    )
}

export default AuthPage;