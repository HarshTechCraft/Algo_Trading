const User=require('../models/users')

const signup=async(req,res)=>{
    try {
        const data = {
            Email: req.body.email,
            Password: req.body.pass
        }

        const checking = await User.findOne({ Email: req.body.email });

        if (checking) {
            console.log("User details already exist");
            res.json({signup:false});
        }
        else {
            console.log(data)
            await User.create(data)
            console.log('Successfully Signup ')
            res.json({signup:true})
        }
    }
    catch (e) {
        console.log("error is " + e)
    }
}

module.exports= signup;