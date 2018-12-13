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
        username: {
            type: String,
            required: true
        }
    }
    
)

module.exports  = Profile = mongoose.model('profile', ProfileSchema);