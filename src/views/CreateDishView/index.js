import DashboardContent from '../../components/DashboardContent';
import DishDetailContainer from '../../components/DishDetailContainer';
import DetailContainer from '../../components/DetailContainer';
import InputContainer from '../../components/InputContainer';
import DishCard from '../../components/DishCard';
import DishInfo from '../../components/DishInfo';
import DashboardButtonsContainer from '../../components/DashboardButtonsContainer';
import Button from '../../components/Button';
import { useState } from 'react';
import { PINATA_JWT, PINATA_GATEWAY } from '../../utils/constants/constants';
import createDish from '../../utils/web3/CreateDish';
import { PinataSDK } from 'pinata-web3';
import fetchEthPrice from '../../utils/functions/fetchEthPrice';

const pinata = new PinataSDK({
    pinataJwt: PINATA_JWT,
    pinataGateway: PINATA_GATEWAY
});

const CreateDishView = ({ setSelectedTab, ethPrice }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [pickupAddress, setPickupAddress] = useState('');
    const [price, setPrice] = useState('');

    const handleCreateDish = async () => {
        let ipfshsh = await uploadToIPFS();
        await createDish(name, description, PINATA_GATEWAY + "/ipfs/" + ipfshsh, pickupAddress, price);
        setSelectedTab(0);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log(file);
        setImage(file);
    };

    const uploadToIPFS = async () => {
        if (!image) {
            alert('Please upload an image first.');
            return;
        }

        try {
            const upload = await pinata.upload.file(image);
            return upload.IpfsHash;
        } catch (error) {
            console.error('Error uploading to IPFS:', error);
        }
    }

    return (
        <DashboardContent>
            <DishDetailContainer>
                <DetailContainer>
                    <h1>Create new dish</h1>
                    <InputContainer value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Write your dish name..." label="Name" />
                    <InputContainer value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Write your dish description..." label="Description" />
                    <InputContainer type="file" placeholder="Upload an image" label="Image" onChange={handleImageChange} />
                    <InputContainer value={pickupAddress} onChange={(e) => setPickupAddress(e.target.value)} type="text" placeholder="Write your pickup address..." label="Pickup Address" />
                    <InputContainer value={price} onChange={(e) => setPrice(e.target.value)} type="number" placeholder="Write your dish price..." label={`Price (${price ? price : 0}ETH ~ ${price ? price*ethPrice : 0}USD)`} />
                </DetailContainer>
                <DetailContainer>
                    <h1>Preview</h1>
                    <DishCard
                        imgSrc={image ? URL.createObjectURL(image) : "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"}
                    >
                        <DishInfo
                            dishName={name ? name : "Dish name"}
                            dishDescription={description ? description : "Dish description"}
                            status="PENDING"
                            address={pickupAddress ? pickupAddress : "Pick up address"}
                            price={`$ETH ${price ? price : 0} ~ ${price ? price*ethPrice : 0}USD`}
                        />
                    </DishCard>
                </DetailContainer>
            </DishDetailContainer>
            <DashboardButtonsContainer>
                <Button buttonText="Go back" type="orange" onClick={() => setSelectedTab(0)} />
                <Button buttonText="Create dish" type="blue" onClick={handleCreateDish} />
            </DashboardButtonsContainer>
        </DashboardContent>
    );
};

export default CreateDishView;