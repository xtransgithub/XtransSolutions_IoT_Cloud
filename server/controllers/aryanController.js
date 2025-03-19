exports.getAryan = async(req, res) =>{
    // console.log(1.9)
    try{
      const userId = req.user._id;
      res.status(200).json({message:'success', user: userId})
    }catch(error){
      console.log(error)
      res.status(500).json({message:"failed to retrieve user for aryan"})
    }
  }