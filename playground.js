const quickAPI = require('./quickAPI')  

quickAPI('dev@funblock.io','Kickinthedoor')
    .then(user => console.log(user))
    .catch(err => console.log(err))