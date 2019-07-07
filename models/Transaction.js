const mongoose = require('mongoose');

const TransSchema = new mongoose.Schema(
    {
        user_uid: {
            type: String,
            required: true
        },
        transType:{
            type: String,
            required: true
        },
        dst_address: {
            type: String,
            required: true
        },
        status: {
            type: String,
            default: "Pending"
        },
        amountRequested: {
            type: Number,
            required: true
        },
        amountTransferred: {
            type: Number,

        },
        transId: {
            type: String,
        },
        execTime: {
            type: Date
        },
        requestTime: {
            type: Date,
            default: Date.now
        },
        transferred:{
            type:Number
        },
        transactionId:{
            type:String
        }
    }
    
)

module.exports  = Transaction = mongoose.model('transaction', TransSchema);