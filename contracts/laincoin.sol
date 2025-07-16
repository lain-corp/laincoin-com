// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LainCoin is ERC20, Ownable {
    string private _tokenLogoURI;

    constructor(
        uint256 initialSupply,
        string memory logoURI
    ) ERC20("LainCoin", "LAIN") {
        _mint(msg.sender, initialSupply);
        _tokenLogoURI = logoURI;
    }

    function tokenLogoURI() public view returns (string memory) {
        return _tokenLogoURI;
    }

    function setTokenLogoURI(string memory newURI) external onlyOwner {
        _tokenLogoURI = newURI;
    }
}

