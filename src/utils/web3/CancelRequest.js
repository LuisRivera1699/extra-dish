import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../contracts/contracts.js';

const cancelRequest = async (dishId) => {
    try {
        const { ethereum } = window;
        if (ethereum) {
            const provider = new ethers.BrowserProvider(ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

            let cancelTxn = await contract.cancelRequest(dishId);

            await cancelTxn.wait();
            console.log("Transaction completed!!");
        }
    } catch (error) {
        console.log(error);
    }
}

export default cancelRequest;