import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../contracts/contracts.js';

const getPendingDishes = async () => {
    try {
        const { ethereum } = window;
        if (ethereum) {
            const provider = new ethers.BrowserProvider(ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

            let dishes = await contract.getPendingDishes();
            return dishes;
        }
    } catch (error) {
        console.log(error);
    }
}

export default getPendingDishes;