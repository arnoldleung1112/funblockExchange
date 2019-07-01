const express = require('express');
const passport = require('passport')
const router = express.Router();
const Profile = require('../../models/Profile')
const gameCoinAPI = require('../../gameCoinAPI')
const validateAddressInput = require('../../validations/validateAddressInput')
const config = require('../../configs/keys')
const axios = require('axios');
const uuidv1 = require('uuid/v1');

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
            console.log(ProfileWithBalance);
            ProfileWithBalance.balance = gameCoinRes.amount;

        
            axios.get("https://polarisexplorer.ont.io/api/v1/explorer/address/balance/" + ProfileWithBalance.deposit_address)
            .then( result => {
                if (result.data.Result.filter(result => result.AssetName == "BLX")[0])
                {
                    ProfileWithBalance.bluxBalance = result.data.Result.filter(result => result.AssetName == "BLX")[0].Balance
                }
                else
                {
                    ProfileWithBalance.bluxBalance = 0
                }
                res.status(200).json(
                    {
                        _id: ProfileWithBalance._id,
                        uid: ProfileWithBalance.uid,
                        username: ProfileWithBalance.username,
                        default_address: ProfileWithBalance.default_address,
                        deposit_address: ProfileWithBalance.deposit_address,
                        balance: ProfileWithBalance.balance,
                        bluxBalance: ProfileWithBalance.bluxBalance
                    }
                )
            })
            .catch(
                err => console.log(err)
            )

        }).catch(
            err => console.log(err)
        )
    })
    .catch((err)=>{
        console.log(err)
    })
})


//create or update default address in profile 
router.post('/',passport.authenticate('jwt',{session: false}),(req,res)=>{
    const profileFields = {
        uid: req.user.uid,
        username: req.user.username,
        default_address: req.body.default_address,
    };

        const {isValid, errors} = validateAddressInput(profileFields);
        if(!isValid)
        {
            return res.status(400).json(errors);
        }
    
        Profile.findOne({uid: req.user.uid})
        .then((profile) =>
        {
            if(profile)
            {
                Profile.findOneAndUpdate(
                    {uid: req.user.uid},
                    {$set: profileFields},
                    {new: true}
                ).then(
                    profile => res.status(200).json(
                        {
                            _id: profile._id,
                            uid: profile.uid,
                            username: profile.username,
                            default_address: profile.default_address,
                            deposit_address: profile.deposit_address,
                            balance: profile.balance
                        }
                    )
                )
            }
            else
            {
                new Profile(profileFields).save().then(profile => res.json(
                    {
                        _id: profile._id,
                        uid: profile.uid,
                        username: profile.username,
                        default_address: profile.default_address,
                        deposit_address: profile.deposit_address,
                        balance: profile.balance
                    }
                ));
            }
        }
        );
})

//generate ontology deposit address
router.post('/depositAddress/',passport.authenticate('jwt',{session:false}),(req,res)=>
    {
        const profileFields = {
            uid: req.user.uid,
            username: req.user.username,
            default_address: req.body.default_address,
            depositAddress: req.body.depositAddress,
        };

        Profile.findOne({uid: req.user.uid})
        .then(profile =>
            {
                const  pw = uuidv1();

                // 'create profile if not exist'
                if(!profile)
                {
                    axios.post(
                        config.ontologySignSer,
                        {
                            "qid": "123",
                            "method": "createaccount",
                            "pwd":pw,
                            "params":{}
                        }
                    ).then(ontRes =>
                        {
                            profileFields.deposit_address = ontRes.data.result.account;
                            profileFields.deposit_address_pw = pw;

                            new Profile(profileFields)
                            .save()
                            .then(profile => res.json(
                                {
                                    _id: profile._id,
                                    uid: profile.uid,
                                    username: profile.username,
                                    default_address: profile.default_address,
                                    deposit_address: profile.deposit_address,
                                    balance: profile.balance
                                }
                            ))
                            .catch(err => console.log(err));
                        }
                    )
                    .catch(
                        err => {console.log(err)}
                    )
                }
                else
                {
                    if(!profile.deposit_address)
                    {
                        axios.post(
                            config.ontologySignSer,
                            {
                                "qid": "123",
                                "method": "createaccount",
                                "pwd":pw,
                                "params":{}
                            }
                        ).then(ontRes =>
                            {
                                profileFields.deposit_address = ontRes.data.result.account;
                                profileFields.deposit_address_pw = pw;
    
                                Profile.findOneAndUpdate(
                                    {uid: req.user.uid},
                                    {$set: profileFields},
                                    {new: true}
                                ).then(
                                    profile => res.status(200).json(
                                        {
                                            _id: profile._id,
                                            uid: profile.uid,
                                            username: profile.username,
                                            default_address: profile.default_address,
                                            deposit_address: profile.deposit_address,
                                            balance: profile.balance
                                        }
                                    )
                                )
                            }
                        )
                    }
                    else
                    {
                        res.status(200).json({message: "deposit address created"})
                    }
                }
            }
        ).catch(err => {console.log(err)})
    
    }
)



// if (profileFields.deposit_address == null)
//                 {
//                     const  pw = uuidv1();

//                     axios.post(
                        
//                         config.ontologySignSer,
//                         {
//                             "qid": "123",
//                             "method": "createaccount",
//                             "pwd":pw,
//                             "params":{}
//                         }
//                     ).then(res =>
//                         {
//                             console.log('point 1');
//                             console.log(profileFields);
//                             profileFields.deposit_address = res.data.result.account;
//                             profileFields.deposit_address_pw = pw;
//                             new Profile(profileFields).save().then(profile => res.json(profile));
//                         }
//                     )
//                     .catch(
//                         err => {console.log(err)}
//                     )
//                 }



module.exports =  router;