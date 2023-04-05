const NENCRYPTEDATTRIBUTES = 2;
const Attribute = {
	Key: "key",
	Value: "value",
	DateUpdate: "dateUpdate",
	Active: "active"
}

fun

const FieldOperations = artifacts.require("FieldOperations");

async function callGetOwner(account) {
    const fieldOperations = await FieldOperations.deployed();
    const owner = await fieldOperations.getOwner({ from: account });
    return owner;
}
async function callGetNumberFields(account) {
    const fieldOperations = await FieldOperations.deployed();
    const nFields = await fieldOperations.getNumberFields({ from: account });
    return nFields;
}
async function callGetFields(account, fields) {
    fieldOperations = await FieldOperations.deployed();
    const fields = await fieldOperations.getFields({ from: account });
    fieldsDecoded = [];
    fields.forEach( function(field) {
        fieldsDecoded.push(extractAndEncrypt(account, field))
    });
    return fieldsDecoded;
}
async function callGetFieldByIndex(account, index) {
    fieldOperations = await FieldOperations.deployed();
    const field = await fieldOperations.getFieldByIndex(index, { from: account });
    return extractAndEncrypt(account, field);
}
async function callGetFieldByIndex(account, index) {
    fieldOperations = await FieldOperations.deployed();
    const field = await fieldOperations.getFieldByIndex(index, { from: account });
    return extractAndEncrypt(account, field);
}
async function callGetFieldByKey(account, key) {
    fieldOperations = await FieldOperations.deployed();
    const field = await fieldOperations.getFieldByKey(key, { from: account });
    return extractAndEncrypt(account, field);
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
function decodeData(accountOwner, encryptedData) {
    // Parse the string into the object again
    //const encryptedObject = EthCrypto.cipher.parse(encryptedString);
    const decryptedData = EthCrypto.decryptWithPrivateKey(
        accountOwner.privateKey,
        encryptedData
    );
    //const decryptedPayload = JSON.parse(decrypted);
    return decryptedData;
}
function verifyAndSend(payload, signature) {
    // check signature
    const senderAddress = EthCrypto.recover(
        signature,
        EthCrypto.hash.keccak256(payload)
    );
    // Send functionality
    console.log(
        'Got data from ' +
        senderAddress +
        ': ' +
        payload
        );
}
function dataFormatter(field) {
    // Destruct the data and format bytes data-types to utf-8 string
    const key = web3.utils.toUtf8(field[0].key);
    const value = web3.utils.toUtf8(field[0].key);
    const updateDate = web3.utils.toUtf8(field[0].key);
    const active = web3.utils.toUtf8(field[0].key);
    return (key, value, updateDate, active);
}