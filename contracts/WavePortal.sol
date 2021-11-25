// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {

    uint256 totalWaves;

    struct Wave {
        address waver;
        uint256 timestamp;
        string message;
    }

    Wave[] waves;

    uint256 private seed;
    mapping(address => uint256) public lastWavedAt;


    constructor() payable {
        console.log("Yo yo, I am a contract and I am smart");
        seed = (block.timestamp + block.difficulty) % 100;
    }

    function wave(string memory message) public {
require(
            lastWavedAt[msg.sender] + 15 minutes < block.timestamp,
            "Wait 15m"
        );
        waves.push(Wave(msg.sender, block.timestamp, message));

        totalWaves += 1;
        console.log("Waved !!", msg.sender);

        uint256 prizeMoney = 0.001 ether;

        seed = (block.difficulty + block.timestamp + seed) % 100;

 if (seed <= 50) {
        require(prizeMoney <= address(this).balance, "Trying to withdraw more money than you have");

        (bool success, ) = (msg.sender).call{
            value: prizeMoney
        }("");

        require(success, "failed to withdraw money from the contract");

 }



    }

    function getAllWaves() public view returns (uint256) {
        console.log("Total waves --> ", totalWaves);
        return totalWaves;
    }

    function getWaves() public view returns (Wave[] memory){
        return waves;
    }
}