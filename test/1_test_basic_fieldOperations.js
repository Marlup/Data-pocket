/* Notice. 
 * Truffle does not manage solidity abi? bytes32 properly, a trailing of zeros right zeros
 * are set and I don't know why it happens. web3.utils.toUtf8 can successfully translate bytes
 * to utf-8 string.
*/

const FieldOperations = artifacts.require("FieldOperations");

contract("FieldOperations", (accounts) => {
  let fieldOperations;

  before(async () => {
    fieldOperations = await FieldOperations.deployed();
  });

  describe("addField", () => {
    it("should add a new field for the user", async () => {
      const key = web3.utils.asciiToHex("test key");
      const value = web3.utils.asciiToHex("test value");

      await fieldOperations.addField(key, value, { from: accounts[0] });

      const numberFields = await fieldOperations.getNumberFields({ from: accounts[0] });
      assert.equal(numberFields.toNumber(), 1, "Number of fields should be 1");

      const field = await fieldOperations.getFields({ from: accounts[0] });

      assert.equal(web3.utils.toUtf8(field[0].key), web3.utils.toUtf8(key), "Field key should match");
      assert.equal(web3.utils.toUtf8(field[0].value), web3.utils.toUtf8(value), "Field value should match");
    });
  });

  describe("modifyField", () => {
    it("should modify both key and value of a field", async () => {
      const key = web3.utils.asciiToHex("new test key");
      const value = web3.utils.asciiToHex("new test value");
      const index = 0;

      await fieldOperations.modifyField(key, value, index, { from: accounts[0] });

      const field = await fieldOperations.getFields({ from: accounts[0] });
      assert.equal(web3.utils.toUtf8(field[0].key), web3.utils.toUtf8(key), "Field key should match");
      assert.equal(web3.utils.toUtf8(field[0].value), web3.utils.toUtf8(value), "Field value should match");
    });
  });

  describe("modifyFieldKey", () => {
    it("should modify only the key of a field", async () => {
      const key = web3.utils.asciiToHex("modified test key");
      const index = 0;

      await fieldOperations.modifyFieldKey(key, index, { from: accounts[0] });

      const field = await fieldOperations.getFields({ from: accounts[0] });
      assert.equal(web3.utils.toUtf8(field[0].key), web3.utils.toUtf8(key), "Field key should match");
    });
  });

  describe("modifyFieldValue", () => {
    it("should modify only the value of a field", async () => {
      const value = web3.utils.asciiToHex("modified test value");
      const index = 0;

      await fieldOperations.modifyFieldValue(value, index, { from: accounts[0] });

      const field = await fieldOperations.getFields({ from: accounts[0] });
      assert.equal(web3.utils.toUtf8(field[0].value), web3.utils.toUtf8(value), "Field value should match");
    });
  });

  describe("toggleActiveField", () => {
    it("should toggle the active field status", async () => {
      const index = 0;

      const fieldBefore = await fieldOperations.getFieldByIndex(index, { from: accounts[0] });
      const activeBefore = fieldBefore.active;

      await fieldOperations.toggleActiveField(index, { from: accounts[0] });

      const fieldAfter = await fieldOperations.getFieldByIndex(index, { from: accounts[0] });
      const activeAfter = fieldAfter.active;

      assert.notEqual(activeBefore, activeAfter, "Active status should be toggled");
    });
  });
  describe("getFieldByKey", () => {
    it("should get the field by key", async () => {
      const key = web3.utils.asciiToHex("modified test key");
      const value = web3.utils.asciiToHex("modified test value");

      const field = await fieldOperations.getFieldByKey(key, { from: accounts[0] });

      assert.equal(web3.utils.toUtf8(field[0].key), web3.utils.toUtf8(key), "Field key should match");
      assert.equal(web3.utils.toUtf8(field[0].value), web3.utils.toUtf8(value), "Field value should match");
    });
  });
}
);
