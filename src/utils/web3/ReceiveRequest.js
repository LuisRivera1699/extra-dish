import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../contracts/contracts.js';

const receiveRequest = async (dishId) => {
    try {
        const { ethereum } = window;
        if (ethereum) {
            const provider = new ethers.BrowserProvider(ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

            let receivedTxn = await contract.received(dishId);

            await receivedTxn.wait();
            console.log("Transaction completed!!");
        }
    } catch (error) {
        console.log(error);
    }
}

export default receiveRequest;