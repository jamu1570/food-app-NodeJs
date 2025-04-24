import userModel from "../models/userModel.js";
import { sendResponse } from '../utils/responseHandler.js';
import { NotFoundError } from "../utils/ApiError.js";

export const getUserController = async (req, res) => {
  try {
    const user = await userModel.findById({_id: req.id});
    if(!user){
        res.status(500).send({
            success: false,
            message: 'user not found',
          });
          NotFoundError('404', "user not found")
    }
    user.password = undefined;
    sendResponse(res,201,user,'user info successfully.')
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in get user Api',
      error,
    });
  }
};
