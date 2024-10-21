import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../contracts/contracts.js';

const createDish = async (name, description, image, pickupAddress, price) => {
    try {
        const { ethereum } = window;
        if (ethereum) {
            const provider = new ethers.BrowserProvider(ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

            let createTxn = await contract.createDish(
                name,
                description,
                ethers.parseEther(price),
                pickupAddress,
                image
            );

            await createTxn.wait();
            console.log("Transaction completed!!");
        }
    } catch (error) {
        console.log(error);
    }
}

export default createDish;