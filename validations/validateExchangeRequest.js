const isEmpty = require('./is-empty');
const Validator = require('validator');
const web3 = require('web3');
const gameCoinAPI = require('../gameCoinAPI')

module.exports = function(data){
    return new Promise((resolve, reject)=>{
        var errors = {};
        data.user_uid = !isEmpty(data.user_uid) ? data.user_uid : '';
        data.amountRequested = !isEmpty(data.amountRequested) ? data.amountRequested : 0;
        data.dst_address = !isEmpty(data.dst_address) ? data.dst_address: '';



        if (Validator.isEmpty(data.user_uid)){
            errors.user_uid = 'user uid is empty'
        }
        
        
        if (Validator.isEmpty(data.dst_address)){
            errors.dst_address = 'destination address is empty'
        }
        // else if(!web3.utils.isAddress(data.dst_address)) {
        //     errors.dst_address = 'destination address is not a valid ethereum address'
        // }
        if (Validator.isEmpty(data.transType)){
            errors.dst_address = 'transaction type address is empty'
        }
        else
        {
            if (data.transType != "GcToBlux" && data.transType != "BluxToPax")
            {
                errors.transType = 'invalid transaction type'
            }
        }

        const gameCoinData = {
        type: "query",
        uid: data.user_uid}
        

        gameCoinAPI(gameCoinData).then((res)=>{
            
        if (isNaN(data.amountRequested)){
            errors.amountRequested = 'amount required is invalid'       
        }else if( res.amount < data.amountRequested){
            errors.amountRequested = 'insufficient fund'
        }

        resolve({
                errors: errors,
                isValid: isEmpty(errors)
            })
        
        })
    })
    
}