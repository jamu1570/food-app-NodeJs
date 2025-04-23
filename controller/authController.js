import userModel from '../models/userModel.js';

export const registerController = async (req, res) => {
  try {
    const { userName, email, password, phone, address } = req.body;
    //validation
    if (!userName || !email || !password || !phone || !address) {
      return res.status(500).send({
        success: false,
        message: 'All fields are required',
        user
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
    const user = await userModel.create({ userName, email, password, phone, address });
    if (user) {
      return res.status(201).send({
        success: true,
        message: 'successfully registered',
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
