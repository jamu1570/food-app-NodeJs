import JWT from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers['authorization'].split(" ")[1];
    JWT.verify(token,process.env.JWT_TOKEN, (err,decode)=> {
        if(err){
            res.status(401).send({
                success: false,
                message: 'please provide auth token',
              }); 
        }else{
            req.id = decode.id;
            next();
        }
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in Auth Api',
      error,
    });
  }
};
