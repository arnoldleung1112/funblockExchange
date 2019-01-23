const axios = require("axios");
const md5 = require('md5');
const queryString = require("query-string");


module.exports =  (username, password)=>{
    // todo: secure key
    return new Promise((resolve, reject)=>{
        data = {
            openId:'OS2XSc',
            password:md5(password),
            productCode:'26940912809842029358369903149122',
            username:username,
        }
        data.sign=md5(queryString.stringify(data,{encode: false}) + '&WyDCFLtaIE6t1czIOuTITu3kHScKP5WM');

        axios.post('http://13.229.41.11/open/userLogin',
            queryString.stringify(data))
        .then((res) => resolve(res.data))
        .catch((err) => reject(err))
    })
        
    
}

