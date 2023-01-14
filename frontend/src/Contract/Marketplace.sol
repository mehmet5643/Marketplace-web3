//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract Marketplace{
    address public owner;
    uint public idForSale;
    uint public idForAuction;

    struct ItemForSale{
        address contractAddress;
        address seller;
        address buyer;
        uint tokenId;
        uint price;
        bool isForSale;

   }

   struct ItemForAuction{
       address contractAddress;
       address seller;
       address buyer;
       uint startingPrice;
       uint highestBid;
       uint tokenId;
       uint deadline;
       bool isForAuction;
   }

    mapping(uint => ItemForSale) public idToItemForSale;
    mapping(uint => ItemForAuction) public idToItemForAuction;
    
    constructor(){
        owner = msg.sender;
    }


    function startNFTSale(address _contractAddress,uint _price, uint _tokenId) public{
        IERC721 NFT = IERC721(_contractAddress);
        require(NFT.ownerOf(_tokenId)==msg.sender, " You are not owner of this NFT");
        NFT.transferFrom(msg.sender,address(this),_tokenId);
        require(NFT.ownerOf(_tokenId)== address(this));
        idToItemForSale[idForSale]= ItemForSale(_contractAddress,msg.sender,msg.sender,_price,_tokenId,false);
        idForSale++;
    }

    function cancelNFTSale(uint Id) public {
        ItemForSale memory info = idToItemForSale[Id];
        IERC721 NFT = IERC721(info.contractAddress);
        require(info.seller == msg.sender,"You are not seller");
        require(info.isForSale == false);
        NFT.transferFrom(address(this),msg.sender,info.tokenId);
        idToItemForSale[Id]= ItemForSale(address(0),address(0),address(0),0,0,true);
    }

    function startNFTAuction(address _contractAddress, uint _startingPrice, uint _tokenId,uint _deadline) public {
        IERC721 NFT = IERC721(_contractAddress);
        require(NFT.ownerOf(_tokenId)==msg.sender, " You are not owner of this NFT");
        NFT.transferFrom(msg.sender, address(this), _tokenId);
        idToItemForAuction[_tokenId]=ItemForAuction(_contractAddress,msg.sender,msg.sender, _startingPrice,0,_tokenId,_deadline,false);
        idForAuction++;
    }

    function cancelNFTAuction(uint Id) public{
        ItemForAuction memory info = idToItemForAuction[Id];
        IERC721 NFT = IERC721(info.contractAddress);
        require(info.seller == msg.sender,"You are not seller");
        require(info.isForAuction == false);
        require(info.buyer == msg.sender);
        NFT.transferFrom(address(this),msg.sender,info.tokenId);
        idToItemForAuction[Id]= ItemForAuction(address(0),address(0),address(0),0,0,0,0,true);
    }

    function buyNFT(uint Id) payable public{
        ItemForSale storage info = idToItemForSale[Id];
        require(Id < idForSale);
        require(msg.sender != info.seller);
        require(msg.value == info.price);
        require(info.isForSale == false);
        IERC721 NFT = IERC721(info.contractAddress);
        NFT.transferFrom(address(this),msg.sender,info.tokenId);
        uint price = msg.value * 95/100;
        payable(info.seller).transfer(price);
        payable(owner).transfer(msg.value-price);

    }

    function bid(uint Id) public payable{
        ItemForAuction storage info = idToItemForAuction[Id];
        require(Id<idForAuction);
        require(msg.sender != info.seller);
        require(msg.sender != info.buyer);
        require(msg.value >=info.startingPrice);
        require(msg.value > info.highestBid);
        require(info.isForAuction == false);
        require(block.timestamp < info.deadline);
        if(info.seller == info.buyer) {
            info.buyer=msg.sender;
            info.highestBid=msg.value;
        } else {
            payable(info.buyer).transfer(info.highestBid);
            info.buyer = msg.sender;
            info.highestBid=msg.value;
        }
    }

    function finishNFTAuction(uint Id) public {
        ItemForAuction storage info = idToItemForAuction[Id];
        require(Id<idForAuction);
        require(msg.sender == info.buyer);
        require(info.isForAuction == false);
        require(block.timestamp > info.deadline);        
        IERC721 NFT = IERC721(info.contractAddress);
        NFT.transferFrom(address(this), info.buyer, info.tokenId);
        uint price = info.highestBid * 95/100;
        payable(info.seller).transfer(price);
        payable(owner).transfer(info.highestBid - price);
        info.isForAuction = true;
    }

    function changeOwner(address _newOwner) public{
        require(owner==msg.sender);
        owner=_newOwner;
    }
}

