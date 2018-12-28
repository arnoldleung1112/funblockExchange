const express = require('express');
const router = express.Router();
const passport = require('passport');
const Transaction = require('../../models/Transaction')
const gameCoinAPI = require('../../gameCoinAPI')

//test route
router.get('/',(req,res)=>{
    res.status(200).json({success: true});
})

//@des      submit a transcation private
//@access   private
//@url      api/transactions/

router.post('/',passport.authenticate('jwt',{session:false}),
(req,res)=>{
   
    const trans = new Transaction({
        user_uid: req.user.uid,
        dst_address: req.body.dst_address,
        amountRequested: req.body.amountRequested
    })

    trans.save().then(trans => res.status(200).json(trans));
})

//@des      get transcations of current user
//@access   private
//@url      api/transactions/

router.get('/current',passport.authenticate('jwt',{session:false}),
    (req,res)=>{
        Transaction.find({user_uid:req.user.uid})
        .then(trans=>res.status(200).json(trans))
    }
)

//@des      delete a transcations of current user
//@access   private
//@url      api/transactions/:trans_id

router.delete('/:trans_Id',passport.authenticate('jwt',{session:false}),
    (req,res)=>{
        Transaction.findOneAndRemove({user_uid:req.user.uid, _id:req.params.trans_Id})
        .then(
            res.json({success:true})
        )
        .catch(err => res.status(400).json(err));
    }
)

//@des      get all transcations
//@access   public
//@url      api/transactions/

router.get('/all', 
    passport.authenticate('jwt',{session: false}),
    (req,res)=>{
        Transaction.find({})
        .then(trans=>res.status(200).json(trans))
    }
)

//@des      get a transcation
//@access   private
//@url      api/transactions/:transid

router.get('/:trans_Id',passport.authenticate('jwt',{session:false}),
(req,res)=>{
   Transaction.findById(req.params.trans_Id)
    .then(tran => {
        res.status(200).json(tran)
    })
})

//@des      update transcation
//@access   private
//@url      api/transactions/:transid

router.patch('/:trans_Id',passport.authenticate('jwt',{session:false}),
(req,res)=>{
   console.log(req.params.trans_Id);
   
   Transaction.findByIdAndUpdate(req.params.trans_Id,
        req.body,
        {new:true})
    .then(tran => {
        const gameCoinData = {
            amount:tran.amountRequested,
            type:"consume",
            uid:tran.user_uid
        }
        gameCoinAPI(gameCoinData)
        .then((gameCoinRes)=>{
            res.status(200).json(tran)
        })

        
    })
})

module.exports = router;