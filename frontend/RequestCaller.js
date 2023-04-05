// Emit requests
async function callSendRequest(requester, accepter) {
    const fieldOperations = await FieldOperations.deployed();
    await fieldOperations.sendRequest(requester, accepter, { from: account });
}
async function callAnswerRequest(requester, accepter, accepted) {
    const fieldOperations = await FieldOperations.deployed();
    await fieldOperations.answerRequest(requester, accepter, accepted, { from: account });
}