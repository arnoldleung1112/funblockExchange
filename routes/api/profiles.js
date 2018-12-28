const express = require('express');
const passport = require('passport')
const router = express.Router();
const Profile = require('../../models/Profile')
const gameCoinAPI = require('../../gameCoinAPI')

//get current profile
router.get('/',passport.authenticate('jwt',{session: false}),(req,res)=>{
    Profile.findOne({uid: req.user.uid})
    .then(profile => {
        const gameCoinData = {
            type:"query",
            uid:profile.uid,
        }
        gameCoinAPI(gameCoinData)
        .then((gameCoinRes)=>{
            
            const ProfileWithBalance = profile.toJSON();
            ProfileWithBalance.balance = gameCoinRes.amount;
            console.log(ProfileWithBalance)
            res.status(200).json(ProfileWithBalance);
        })
    })
})


//create or update profile
router.post('/',passport.authenticate('jwt',{session: false}),(req,res)=>{
    const profileFields = {
        uid: req.user.uid,
        username: req.user.username,
        default_address: req.body.default_address
    };
    
    Profile.findOne({uid: req.user.uid})
    .then((profile) =>{
        if(profile){
            Profile.findOneAndUpdate(
                {uid: req.user.uid},
                {$set: profileFields},
                {new: true}
            ).then(

                profile => res.status(200).json(profile)
            )
        }else{
            new Profile(profileFields).save().then(profile => res.json(profile));
        }
    }
        
   

    );



})


module.exports =  router;