import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../contracts/contracts';

const rateDish = async (dishId, rateDescription) => {
    try {
        const { ethereum } = window;
        if (ethereum) {
            const provider = new ethers.BrowserProvider(ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

            let rate = await contract.rateDish(dishId, rateDescription);
            await rate.wait();

            return true;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

export default rateDish;