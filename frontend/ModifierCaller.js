// dataEncoder() function courtesy of
// https://github.com/pubkey/eth-crypto/blob/master/tutorials/encrypted-message.md

const FieldOperations = artifacts.require("FieldOperations");

// Insert data
async function callAddField(account, key, value) {
    const fieldOperations = await FieldOperations.deployed();
    await fieldOperations.addField(key, value, { from: account });
}
// Update data
async function callModifyField(account, key, value, index) {
    const fieldOperations = await FieldOperations.deployed();
    await fieldOperations.modifyField(key, value, index, { from: account });
}
async function callModifyFieldKey(account, key, index) {
    const fieldOperations = await FieldOperations.deployed();
    await fieldOperations.modifyFieldKey(key, value, index, { from: account });
}
async function callModifyFieldValue(account, value, index) {
    const fieldOperations = await FieldOperations.deployed();
    await fieldOperations.modifyFieldValue(value, index, { from: account });
}
function encodeData(accountOwner, data) {
    const EthCrypto = require('eth-crypto');
    /*
    const signature = EthCrypto.sign(
        accountOwner.privateKey,
        EthCrypto.hash.keccak256(data)
    );
    
    const payload = {
        data: data,
        signature
    };
    const encrypted = EthCrypto.encryptWithPublicKey(
        accountOwner.publicKey,
        //stringify the payload before encryption
        JSON.stringify(payload) // we have to 
    );
    */
    const encrypted = EthCrypto.encryptWithPublicKey(
        accountOwner.publicKey,
        data
    );
    // Convert the object into a smaller string-representation
    const encryptedString = EthCrypto.cipher.stringify(encrypted);
}

// ** Auxiliar **
function extractAndEncrypt(account, field) {
    auxArray = [];
    // for ( [key, value] of Object.entries(field)) {
    var count = 0;
    for (const [key, attribute] of Object.entries(field)) {
        if (count < NENCRYPTEDATTRIBUTES) {
            // Decode encrypted attibute
            attribute = decodeData(account, attribute);
            // Decoding result is bytes. Transform into utf-8 string
            attribute = web3.utils.toUtf8(attribute);
        }
        auxArray.push(attribute);
        count += 1;
    }
    return auxArray;
}
function verifyAndSend(payload) {
    // check signature
    const senderAddress = EthCrypto.recover(
        payload.signature,
        EthCrypto.hash.keccak256(payload.data)
    );
    // Send functionality
    console.log(
        'Got data from ' +
        senderAddress +
        ': ' +
        payload.data
        );
}