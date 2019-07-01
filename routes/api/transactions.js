const express = require('express');
const router = express.Router();
const passport = require('passport');
const Transaction = require('../../models/Transaction')
const gameCoinAPI = require('../../gameCoinAPI')
const web3API = require('../../web3API')
const validateExchangeRequest = require('../../validations/validateExchangeRequest')
//test route
router.get('/',(req,res)=>{
    res.status(200).json({success: true});
})

//@des      submit a transcation private
//@access   private
//@url      api/transactions/

router.post('/',passport.authenticate('jwt',{session:false}),
(req,res)=>{
    
    const transData = {
        user_uid: req.user.uid,
        dst_address: req.body.dst_address,
        amountRequested: req.body.amountRequested,
        transType: req.body.transType
    }
    
    validateExchangeRequest(transData)
    .then((validation)=>{
        if (!validation.isValid){
            res.status(400).json(validation.errors)
        }else{
            const trans = new Transaction(transData)
            trans.save().then(trans => res.status(200).json(trans));
        }
    })
    
})

//@des      get transcations of current user with type
//@access   private
//@url      api/transactions/

router.get('/current/:type',passport.authenticate('jwt',{session:false}),
    (req,res)=>{
        Transaction.find({
                            user_uid:req.user.uid,
                            transType: req.params.type
                        })
        .then(trans=>res.status(200).json(trans))
    }
)


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
    if(req.user.uid != "57") return res.json({error: "no permission"});

   Transaction.findById(req.params.trans_Id)
    .then(tran => {
        res.status(200).json(tran)
    })
})

//@des      execute a transcation
//@access   private
//@url      api/transactions/:transid

router.patch('/:trans_Id',passport.authenticate('jwt',{session:false}),
(req,res)=>{
    
   if(req.user.uid != "57") return res.json({error: "no permission"});
   //Todo update sequence rearranging for security reason
   console.log('transferring to address: ' + req.body.dst_address);
   web3API(req.body.dst_address, req.body.amountTransferred)
   .then(txHash => {
        req.body.transactionId = txHash;

        Transaction.findByIdAndUpdate(req.params.trans_Id,
            req.body,
            {new:true})
        .then(tran => {
            if(tran.status == "Pending"){
                const gameCoinData = {
                    amount:tran.amountRequested,
                    type:"consume",
                    uid:tran.user_uid
                }
                gameCoinAPI(gameCoinData)
                .then((gameCoinRes)=>{
                    res.status(200).json(tran)
                })
                .catch(err => console.log(err));
                
            }else{
                res.status(200).json({error: "transaction has been executed"})
            }

        })

        }
    )

    
})

module.exports = router;