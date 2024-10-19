import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ethers} from "ethers";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [walletAddress, setWalletAddress] = useState(null);
    const [authType, setAuthType] = useState(1);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const connectWallet = async (type) => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = provider.getSigner();
                const walletAddress = (await signer).address;

                console.log("Wallet address: ", walletAddress);

                setWalletAddress(walletAddress);
                setAuthType(type);
                setIsAuthenticated(true);

                navigate("/dashboard");
            } catch (error) {
                console.log(error);
            }
        } else {
            alert("Metamask not installed");
        }
    }

    const checkIfWalletIsConnected = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                console.log("Checking if wallet is connected");
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                console.log("Accounts: ", accounts);
                if (accounts.length !== 0) {
                    console.log("Wallet is connected");
                    const walletAddress = accounts[0];
                    setWalletAddress(walletAddress);
                    setIsAuthenticated(true);
                    navigate("/dashboard");
                } else {
                    navigate("/");
                }
            }
            catch (error) {
                console.log(error);
            }
        } else {
            console.log("Metamask not installed");
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    return (
        <AuthContext.Provider value={{ walletAddress, authType, isAuthenticated, connectWallet, setAuthType }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;