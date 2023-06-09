// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;
/**
 * @title DataStructures
 * @dev Custom data structures.
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract DataStructures {
    struct Field {
        bytes key;
        bytes value;
        uint updateDate;
        bool active;
    }
    struct Request {
        address requester;
        bytes key;
        uint requestDate;
        bool accepted;
    }
}
