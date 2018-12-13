const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data){
    let errors = {};
    data.username = !isEmpty(data.username) ? data.username : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (Validator.isEmpty(data.username)){
        errors.username = 'Username is empty'
    }

    if (Validator.isEmpty(data.password)){
        errors.password = 'password is empty'
    }
    return {
        errors:errors,
        isValid: isEmpty(errors)
    }
}