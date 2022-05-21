// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// 0x0c6608bAe3D3f5e920EdCf824955814D305Bc6Bf

// Openzepplin imports
import "@openzeppelin/contracts@4.4.2/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.4.2/access/Ownable.sol";
import "@openzeppelin/contracts@4.4.2/utils/Counters.sol";

// Creation of metaverse smart contract with NFT tokens
contract Metaverse is ERC721, Ownable {
  constructor () ERC721("META", "MJG") {}

  using Counters for Counters.Counter;
  Counters.Counter private supply;
  uint256 public maxSupply = 100;

  uint256 public cost = 1 ether;
  mapping (address => Building []) NFTOwners;
  struct Building {
    string name;
    int8 x;
    int8 y;
    int8 z;
    int8 w;
    int8 d;
    int8 h;    
  }
  Building [] public buildings;

  function getBuildings() public view returns(Building [] memory) {
    return buildings;
  }

  function totalSupply() public view returns (uint256){
    return supply.current();
  }

  function mint(string memory _building_name, int8 _x, int8 _y, int8 _z, int8 _w, int8 _d, int8 _h) public payable {
    require(supply.current() <= maxSupply, "Max supply exceeded");
    require(msg.value >= cost, "Insufficient funds!");
    supply.increment();
    _safeMint(msg.sender, supply.current());
    Building memory _newBuild = Building(_building_name, _x, _y, _z, _w, _d, _h);
    buildings.push(_newBuild);
    NFTOwners[msg.sender].push(_newBuild);
  }

  function withdraw() external payable onlyOwner {
     address payable _owner = payable(owner());
     _owner.transfer(address(this).balance);
  }

  function getOwnerBuildings() public view returns (Building [] memory){
    return NFTOwners[msg.sender];
  }
}
