import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../contracts/contracts';

const requestDish = async (dishId, requestDescription, dishPrice) => {
    try {
        const { ethereum } = window;
        if (ethereum) {
            const provider = new ethers.BrowserProvider(ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

            let placeRequest = await contract.requestDish(dishId, requestDescription, {value: dishPrice});
            await placeRequest.wait();

            return true;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

export default requestDish;