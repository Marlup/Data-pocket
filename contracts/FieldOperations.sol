// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./DataStructures.sol";

/**
 * @title FieldOperations
 * @dev (user new data key atomicKey) Store new commited pairs of data (key & value) defined by the user.
 */
contract FieldOperations is DataStructures {
    // ++ States ++
    address private owner;
    // Maps atomic-key to field structures (atomicKey => Field)
    mapping(address => Field[]) private _addressFields;

    // ++ Events ++
    event requestSent(address indexed requester, address indexed accepter, uint indexed date);
    event requestAnswered(address indexed accepter, address indexed requester, uint indexed date, bool status);

    constructor() {
        owner = msg.sender;
    }

    modifier isOwner() { 
        require(msg.sender == owner, "Caller is not owner");
        _;
    }
    
    // ++ Getter functions ++ 
    /**
     * @notice Returns the address of the owner
     * @dev Address of whom deployed the smart contract
     */
    function getOwner() external view isOwner() returns(address) {
        return owner;
    }
    /**
     * @notice Returns the number of fields belonging to the user
     * @dev Use atomic-key to access
     */
    function getNumberFields() external view isOwner() returns(uint) {
        return _addressFields[msg.sender].length;
    }
    /**
     * @notice Returns all fields
     * @dev 
     */
    function getFields() external view isOwner() returns(Field[] memory) {
        return _addressFields[msg.sender];
    }
    /**
     * @notice Returns one field by index
     * @dev 
     */
    function getFieldByIndex(uint _index) external view isOwner() returns(Field memory) {
        return _addressFields[msg.sender][_index];
    }
    /**
     * @notice Returns one field by key
     * @dev 
     */
    function getFieldByKey(bytes memory _key) external view isOwner() returns(Field memory) {
        return _searchField(_key);
    }
    /**
     * @notice Returned field if input key is matched
     * @dev 
     */
    function _searchField(bytes memory _key) private view isOwner() returns(Field memory) {
        Field[] memory _fields = _addressFields[msg.sender];
        for (uint i = 0; i < _fields.length; i++) {
            if (keccak256(_fields[i].key) == keccak256(_key)) {
                return _fields[i];
            }
        }
        revert("Field was not found");
    }
    // ++ Setter functions ++
    /**
     * @notice Adds a new field for the user
     * @dev Add one field and stores it in 'fields' state 
     * and 'userFieldCounts' adds up 1 for the user
     */
    function addField(bytes calldata _key, bytes calldata _value) external isOwner() {
        Field memory _field;
        _field.key = _key;
        _field.value = _value;
        _field.updateDate = block.timestamp;
        _field.active = true;
        // Insert new Field struct
        _addressFields[msg.sender].push(_field);
    }
    /**
     * @notice Modify both key and value
     * @dev 
     */
    function modifyField(bytes calldata _key, bytes calldata _value, uint _index) external isOwner() {
        Field storage _field = _addressFields[msg.sender][_index];
        _field.key = _key;
        _field.value = _value;
        _field.updateDate = block.timestamp;
    }
    /**
     * @notice Modify only key of field
     * @dev 
     */
    function modifyFieldKey(bytes calldata _key, uint _index) external isOwner() {
        Field storage _field = _addressFields[msg.sender][_index];
        _field.key = _key;
        _field.updateDate = block.timestamp;
    }
    /**
     * @notice Modify only value of field
     * @dev 
     */
    function modifyFieldValue(bytes calldata _value, uint _index) external isOwner() {
        Field storage _field = _addressFields[msg.sender][_index];
        _field.value = _value;
        _field.updateDate = block.timestamp;
    }
    /**
     * @notice Set active field
     * @dev 
     */
    function toggleActiveField(uint _index) external isOwner() {
        Field storage _field = _addressFields[msg.sender][_index];
        _field.active = !_field.active;
    }
    // ++ Event functions ++
    /**
     * @notice Send request from user to other user. Full or partial field request
     * @dev 
     */
    function sendRequest(address _requester, address _accepter) external {
        emit requestSent(_requester, _accepter, block.timestamp);
    }
    /**
     * @notice Accept request from user.
     * @dev 
     */
    function answerRequest(address _requester, address _accepter, bool status) external {
        emit requestAnswered(_requester, _accepter, block.timestamp, status);
    }
}
