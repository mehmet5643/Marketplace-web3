//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Marketplace{
    address public owner;
    uint256 public idForSale;

    struct ItemForSale{
        address contractAddress;
        address seller;
        address buyer;
        uint256 tokenId;
        uint256 price;
        bool isForSale;

   }

    mapping(uint => ItemForSale) public idToItemForSale;
    
    constructor(){
        owner = msg.sender;

    }


    function startNftSale() public{

    }

    function cancelNftSale() public{

    }

    function startNftAuction() public {

    }

    function cancelNftAuction() public{

    }

    function buyNft() public{

    }

    function bid() public payable{

    }

    function finishNftAuction() public {

    }

    function changeOwner(type name) {
        
    }
}
