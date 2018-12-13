const express = require('express');
const router = express.Router();


router.get('/exchangeRate',(req,res)=>{
    res.status(200).json({Rate:0.5});
})

module.exports = router;