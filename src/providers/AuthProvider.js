import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import fetchEthPrice from "../utils/functions/fetchEthPrice";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [walletAddress, setWalletAddress] = useState(null);
    const [authType, setAuthType] = useState(1);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [ethPrice, setEthPrice] = useState(0);
    const navigate = useNavigate();

    // Parámetros de la Base Sepolia Testnet
    const baseSepoliaTestnet = {
        chainId: '0x14a34',
        chainName: 'Base Sepolia Testnet',
        nativeCurrency: {
            name: 'ETH',
            symbol: 'ETH',
            decimals: 18,
        },
        rpcUrls: ['https://sepolia.base.org'],
        blockExplorerUrls: ['https://sepolia.basescan.org']
    };

    // Función para solicitar el cambio de red a Base Sepolia Testnet
    async function switchToBaseSepoliaTestnet() {
        if (window.ethereum) {
            try {
                // Verificar la red actual
                const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
                // Si no está en Base Sepolia Testnet
                if (currentChainId !== baseSepoliaTestnet.chainId) {
                    // Intentar cambiar a Base Sepolia Testnet
                    try {
                        await window.ethereum.request({
                            method: 'wallet_switchEthereumChain',
                            params: [{ chainId: baseSepoliaTestnet.chainId }],
                        });
                    } catch (switchError) {
                        // Si la red no está en MetaMask, solicitar agregarla
                        if (switchError.code === 4902) {
                            try {
                                await window.ethereum.request({
                                    method: 'wallet_addEthereumChain',
                                    params: [baseSepoliaTestnet],
                                });
                            } catch (addError) {
                                console.error('Error adding Base Sepolia Testnet:', addError);
                            }
                        }
                    }
                }
            } catch (error) {
                console.error('Error switching network:', error);
            }
        } else {
            console.error('MetaMask is not installed.');
        }
    }

    const getEthPrice = async () => {
        const price = await fetchEthPrice();
        setEthPrice(price);
    }

    const connectWallet = async (type) => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                await switchToBaseSepoliaTestnet();
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
        switchToBaseSepoliaTestnet();
        checkIfWalletIsConnected();
        getEthPrice();
    }, []);

    return (
        <AuthContext.Provider value={{ walletAddress, authType, isAuthenticated, connectWallet, setAuthType, ethPrice }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;