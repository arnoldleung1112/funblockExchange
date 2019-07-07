const {abi}                     = require('./configs/contractABI');
const {my_privkey, infura_api_key, contractAddress, fromAddress}  = require('./configs/keys');
const Web3                      = require('web3');
const Tx                        = require('ethereumjs-tx');

module.exports = (dstAddress, transferAmount)=>{
    return new Promise((resolve,reject)=>{
        const web3 = new Web3(infura_api_key)
    const contract = new web3.eth.Contract(abi,contractAddress,{from:fromAddress})
    web3.eth.getTransactionCount(fromAddress)
    .then((txCount) => {
        
        web3.eth.getGasPrice()
        .then((price)=>{
        //put together transaction
            console.log(price)
            const rawTrans = {
            from: fromAddress,
            nonce: "0x" + txCount.toString(16),
            gasPrice: 20000000,
            gasLimit: 300000,
            to: contractAddress,
            value: "0x0",
            "data": contract.methods.transfer(dstAddress, web3.utils.toWei(transferAmount,'ether')).encodeABI(),
            chainId: 0x04
            }

            //sign transaction
            var privKey = Buffer.from(my_privkey, 'hex');
            var tx = new Tx(rawTrans);
            tx.sign(privKey);
            var serializedTx = tx.serialize();

            //send transaction
            web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
            .on('transactionHash', hash=> resolve(hash))
            .on('receipt', receipt => console.log(receipt.transactionHash))
            .then((tx)=>  console.log(tx.transactionHash))
            .catch(err=> reject(err))
            }
        )
    })
    })
}

