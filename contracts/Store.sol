pragma solidity ^0.5.1;

contract Store {

    address owner;
    mapping(string => string) Storage;

    constructor() public {
        owner = msg.sender;

    }
    function addHash(string memory id, string memory data) public {
        if(msg.sender!= owner) return;
        Storage[id] = data;
    }

    function getHash(string memory id) public view returns(string memory value) {
        return(Storage[id]);
    }
}
