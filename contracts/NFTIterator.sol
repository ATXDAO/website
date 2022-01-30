// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;
import { IERC721 } from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

/**
@title iterate over NFT to determine which the user owns
@author kungfuflex
@notice intended to be used in eth_call only
*/
contract NFTIterator {
  function checkNft(address nft, uint256 i) internal view returns (bool found, address user) {
    (bool success, bytes memory response) = nft.staticcall(abi.encodeWithSelector(IERC721.ownerOf.selector, i));
    found = success;
    if (!found) return (found, address(0x0));
    (user) = abi.decode(response, (address));
  }
  constructor(address nft) {
    address[] memory owners = new address[](200);
    for (uint256 i = 1; i < 200; i++) {
      (bool found, address owner) = checkNft(nft, i);
      if (!found) owners[i] = address(0x0);
      else owners[i] = owner;
    }
    bytes memory response = abi.encode(owners);
    assembly {
      return(add(0x20, response), mload(response))
    }
  }
}
