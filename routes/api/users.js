const express = require('express');
const router = express.Router();
const passport = require('passport');
const quickAPI = require('../../quickAPI');

const jwt = require('jsonwebtoken');
const keys = require('../../configs/keys');
//test route
router.get('/',(req,res)=>{
    res.status(200).json({success: true});
})

router.post('/login',(req,res)=>{
    
    const {errors, isValid} = require('../../validations/validateLoginInput')(req.body)
    // check validation
    if (!isValid) {
         return res.status(400).json(errors);
     }
     console.log("login user");
     console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;

    quickAPI(username,password)
    .then((resObj) =>{
        console.log(resObj);
        if(resObj.status){
            jwt.sign(
                resObj.data,
                keys.secretOrKey,
                {expiresIn:3600},
                (err,Token)=>{
                    res.json({
                        success: true,
                        token: 'Bearer ' + Token
                    });

                }
            )
            
        }else {
            errors.password = 'Password incorrect';
            return res.status(400).json(errors);
          }
    })
    .catch(err => res.status(400).json({errors: 'quickAPI failed'}))

})

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      res.json({
        uid: req.user.uid,
        username: req.user.username,
      });
    }
  );

module.exports = router;