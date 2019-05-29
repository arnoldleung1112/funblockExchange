const axios = require('axios');
const md5 = require('md5');
const queryString = require("query-string");

// const data = {
//     type: "query",
//     uid: "57"}

module.exports = (data) => {
    // todo: secure key
    const dataEntries = Object.entries(data)
    var query = dataEntries.map( entry => entry.join("=")).join('');
    query = query + '02aeb8316f736ac0a468160e047055c9'

    const MD5query= md5(query)

    data.sign = MD5query
    

    return new Promise((resolve, reject) => {
        axios.post('http://ugc.playfunblock.com:12350/token', queryString.stringify(data))
        .then( res => {
            console.log(res.data);
            resolve(res.data)})
        .catch(err => {return err})
    })

    
}   

