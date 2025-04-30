import userModel from '../models/userModel.js';
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import { sendWelcomeEmail } from '../utils/mailer.js';
// import {NotFoundError} from "../utils/ApiError.js";

export const registerController = async (req, res) => {
  try {
    const { userName, email, password, phone, address } = req.body;
    //validation
    if (!userName || !email || !password || !phone || !address) {
      return res.status(500).send({
        success: false,
        message: 'All fields are required'
      });
    }
    // check existing
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(500).send({
        success: false,
        message: 'email already exist please login',
      });
    }
    // create user
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await userModel.create({ userName, email, password : hashPassword, phone, address });
    
    try {
      await sendWelcomeEmail(user.email, user.userName);
      res.status(201).json({ message: 'User registered and email sent!' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Registration succeeded but email failed.' });
    }
    if (user) {
      return res.status(201).send({
        success: true,
        message: 'successfully registered',
        user
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in Register Api',
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const {email, password} = req.body;
    if(!email || !password){
      return res.status(500).send({
        success: false,
        message: 'All fields are required',
      });
    }

    const user = await userModel.findOne({email : email});
    if(!user){
      return res.status(400).send({
        success:false,
        message: "user not found",
      })
      // new NotFoundError('404', "user not found")

    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
      return res.status(500).send({
        success:false,
        message: "invalid credential.",
      })
    }
    const token = JWT.sign({id: user._id}, process.env.JWT_TOKEN, {
      expiresIn : '7d'
    })
    user.password = undefined;
    if(isMatch){
      return res.status(200).send({
        success: true,
        message: "successfully login",
        token,
        user
      })
    }
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in login Api',
      error,
    });
  }
}
