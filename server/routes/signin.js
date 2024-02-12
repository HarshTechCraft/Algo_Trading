
const User =require('../models/users')
const signin=async(req,res)=>{
    

        const checking=await User.findOne({Email:req.body.email});
        
        if(checking){
           if(checking.Password==req.body.pass)
           {
            console.log('signin successfully')
            res.json({email:true,password:true});
           }
           else{
            res.json({email:true,password:false});
           }
        }
        else{
            res.json({email:false});
        }
    
    
}

module.exports =signin