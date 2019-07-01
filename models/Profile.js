const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema(
    {
        uid: {
            type: String,
            required: true
        },
        default_address: {
            type: String,
        },
        deposit_address: {
            type: String,
        },
        deposit_address_pw: {
            type: String,
        },
        username: {
            type: String,
            required: true
        }
    }
    
)

module.exports  = Profile = mongoose.model('profile', ProfileSchema);