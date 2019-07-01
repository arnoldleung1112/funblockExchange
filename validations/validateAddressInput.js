const isEmpty = require('./is-empty');
const Validator = require('validator');
const web3 = require('web3');

module.exports = function(data){

    let errors = {};
    data.uid = !isEmpty(data.uid) ? data.uid : '';
    data.username = !isEmpty(data.username) ? data.username : '';
    data.default_address = !isEmpty(data.default_address) ? data.default_address: ''

    if (Validator.isEmpty(data.uid)){
        errors.uid = 'uid is empty'
    }

    if (Validator.isEmpty(data.username)){
        errors.username = 'username is empty'
    }

    if (Validator.isEmpty(data.default_address)){
        errors.default_address = 'default address is empty'
    }
    // else if(!web3.utils.isAddress(data.default_address)) {
    //     errors.default_address = 'default address is not a valid ethereum address'
    // }

    return {
        errors:errors,
        isValid: isEmpty(errors)
    }
}