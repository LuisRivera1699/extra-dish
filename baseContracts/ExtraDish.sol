// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

struct Dish {
    string name;
    string description;
    uint price;
    string pickUpAddress;
    string image;
    address payable owner;
    uint status;
    uint id;
    address payable requester;
    string requestDescription;
    string rateDescription;
}

contract ExtraDish {

    uint public dishCounter;
    uint public requestCounter;
    uint public SERVICE_FEE = 3;
    mapping (uint => Dish) public dishId;
    mapping (address => uint[]) public addressDishes;
    address CEO_ADDRESS = 0x93a758c63CD7B15C8def570378E017ea0a2d7fd2;

    constructor() {}

    function createDish(
        string memory name,
        string memory description,
        uint price,
        string memory pickUpAddress,
        string memory image
    ) external {
        Dish memory auxDish = dishId[dishCounter];
        auxDish.name = name;
        auxDish.description = description;
        auxDish.price = price;
        auxDish.pickUpAddress = pickUpAddress;
        auxDish.image = image;
        auxDish.owner = payable(msg.sender);
        auxDish.status = 1;
        auxDish.id = dishCounter;

        dishId[dishCounter] = auxDish;
        addressDishes[msg.sender].push(dishCounter);
        dishCounter++;
    }

    function getMyDishes() external view returns (Dish[] memory) {
        uint[] memory myDishIds = addressDishes[msg.sender];
        Dish[] memory myDishes = new Dish[](myDishIds.length);

        for (uint i = 0; i < myDishIds.length; i++) {
            myDishes[i] = dishId[myDishIds[i]];
        }

        return myDishes;
    }

    function getPendingDishes() external view returns (Dish[] memory) {
        uint matchingCount = 0;

        for (uint i = 0; i < dishCounter; i++) {
            if (dishId[i].status == 1 && dishId[i].owner != msg.sender) {
                matchingCount++;
            }
        }

        Dish[] memory matchingDishes = new Dish[](matchingCount);
        uint index = 0;

        for (uint i = 0; i < dishCounter; i++) {
            if (dishId[i].status == 1 && dishId[i].owner != msg.sender) {
                matchingDishes[index] = dishId[i];
                index++;
            }
        }

        return matchingDishes;
    }

    function requestDish(uint id, string memory requestDescription) external payable {
        Dish memory auxDish = dishId[id];
        require(msg.value == auxDish.price);

        auxDish.requester = payable(msg.sender);
        auxDish.status = 2;
        auxDish.requestDescription = requestDescription;

        dishId[id] = auxDish;
    }

    function getMyRequestsAsASeller() external view returns (Dish[] memory){
        uint[] memory myDishIds = addressDishes[msg.sender];

        uint matchingCount = 0;

        for (uint i = 0; i < myDishIds.length; i++) {
            if (dishId[myDishIds[i]].status == 2 || dishId[myDishIds[i]].status == 3 || dishId[i].status == 4) {
                matchingCount++;
            }
        }

        Dish[] memory matchingDishes = new Dish[](matchingCount);
        uint index = 0;

        for (uint i = 0; i < myDishIds.length; i++) {
            if (dishId[myDishIds[i]].status == 2 || dishId[myDishIds[i]].status == 3 || dishId[i].status == 4) {
                matchingDishes[index] = dishId[myDishIds[i]];
                index++;
            }
        }

        return matchingDishes;
    }

    function getMyRequestsAsABuyer() external view returns (Dish[] memory){
        uint matchingCount = 0;

        for (uint i = 0; i < dishCounter; i++) {
            bool statusMatches = dishId[i].status == 2 || dishId[i].status == 3 || dishId[i].status == 4;
            if (statusMatches && dishId[i].requester == msg.sender) {
                matchingCount++;
            }
        }

        Dish[] memory matchingDishes = new Dish[](matchingCount);
        uint index = 0;

        for (uint i = 0; i < dishCounter; i++) {
            bool statusMatches = dishId[i].status == 2 || dishId[i].status == 3 || dishId[i].status == 4;
            if (statusMatches && dishId[i].requester == msg.sender) {
                matchingDishes[index] = dishId[i];
                index++;
            }
        }

        return matchingDishes;
    }

    function cancelRequest(uint id) external {
        Dish memory auxDish = dishId[id];
        require(auxDish.owner == msg.sender || auxDish.requester == msg.sender);
        require(auxDish.status == 2);
        require(auxDish.requester != address(0));

        if (auxDish.owner == msg.sender) {
            payable(auxDish.requester).transfer(auxDish.price);
        }

        if (auxDish.requester == msg.sender) {
            uint fee = auxDish.price * SERVICE_FEE / 100;
            payable(CEO_ADDRESS).transfer(fee);
            payable(auxDish.requester).transfer(auxDish.price - fee);
        }

        auxDish.requestDescription = "";
        auxDish.requester = payable(address(0));
        auxDish.status = 1;

        dishId[id] = auxDish;
    }

    function received(uint id) external {
        Dish memory auxDish = dishId[id];
        require(auxDish.requester == msg.sender);
        require(auxDish.status == 2);

        auxDish.status = 3;

        uint fee = auxDish.price * SERVICE_FEE / 100;
        payable(CEO_ADDRESS).transfer(fee);
        payable(auxDish.owner).transfer(auxDish.price - fee);

        dishId[id] = auxDish;
    }

    function rateDish(uint id, string memory rateDescription) external {
        Dish memory auxDish = dishId[id];
        require(auxDish.requester == msg.sender);
        require(auxDish.status == 3);

        auxDish.rateDescription = rateDescription;
        auxDish.status = 4;

        dishId[id] = auxDish;
    }

    function getAddressRates(address owner) external view returns(Dish[] memory) {
        uint matchingCount = 0;

        uint[] memory ownerDishes = addressDishes[owner];

        for (uint i = 0; i < ownerDishes.length; i++) {
            if (bytes(dishId[ownerDishes[i]].rateDescription).length > 0) {
                matchingCount++;
            }
        }

        Dish[] memory matchingDishes = new Dish[](matchingCount);
        uint index = 0;

        for (uint i = 0; i < ownerDishes.length; i++) {
            if (bytes(dishId[ownerDishes[i]].rateDescription).length > 0) {
                matchingDishes[index] = dishId[i];
                index++;
            }
        }

        return matchingDishes;
    }

}