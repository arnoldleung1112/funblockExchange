const axios = require('axios');
const md5 = require('md5');
const queryString = require("query-string");
const config = require("./configs/keys")

// const data = {
//     type: "query",
//     uid: "57"}

module.exports = (data) => {
    // todo: secure key
    const dataEntries = Object.entries(data)
    var query = dataEntries.map( entry => entry.join("=")).join('');
    query = query + config.gameCoinSecret

    const MD5query= md5(query)

    data.sign = MD5query
    

    return new Promise((resolve, reject) => {
        axios.post('http://ugc.playfunblock.com:12350/token', queryString.stringify(data))
        .then( res => {
            resolve(res.data)})
        .catch(err => {return err})
    })

    
}   

