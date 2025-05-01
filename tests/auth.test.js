/* eslint-disable no-undef */
import { registerController, loginController } from '../controller/authController.js';
import userModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
import { sendWelcomeEmail } from '../utils/mailer.js';

jest.mock('../models/userModel.js');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('../utils/mailer.js');

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Auth Controller', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('registerController', () => {
    it('should return 500 if any field is missing', async () => {
      const req = { body: { email: 'test@test.com' } };
      const res = mockRes();

      await registerController(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
        success: false,
        message: 'All fields are required',
      }));
    });

    it('should return 500 if user already exists', async () => {
      userModel.findOne.mockResolvedValue({ email: 'test@test.com' });

      const req = {
        body: {
          userName: 'John',
          email: 'test@test.com',
          password: '123456',
          phone: '1234567890',
          address: '123 street'
        }
      };
      const res = mockRes();

      await registerController(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
        message: 'email already exist please login'
      }));
    });

    it('should create user and send welcome email', async () => {
      userModel.findOne.mockResolvedValue(null);
      bcrypt.genSaltSync.mockReturnValue('salt');
      bcrypt.hash.mockResolvedValue('hashedpass');
      userModel.create.mockResolvedValue({ email: 'test@test.com', userName: 'John' });
      sendWelcomeEmail.mockResolvedValue();

      const req = {
        body: {
          userName: 'John',
          email: 'test@test.com',
          password: '123456',
          phone: '1234567890',
          address: '123 street'
        }
      };
      const res = mockRes();

      await registerController(req, res);

      expect(userModel.create).toHaveBeenCalled();
      expect(sendWelcomeEmail).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
    });
  });

  describe('loginController', () => {
    it('should return 500 if email or password missing', async () => {
      const req = { body: { email: '' } };
      const res = mockRes();

      await loginController(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
        success: false,
        message: 'All fields are required'
      }));
    });

    it('should return 400 if user not found', async () => {
      userModel.findOne.mockResolvedValue(null);
      const req = { body: { email: 'test@test.com', password: '123456' } };
      const res = mockRes();

      await loginController(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
        message: 'user not found'
      }));
    });

    it('should return 500 if password does not match', async () => {
      userModel.findOne.mockResolvedValue({ password: 'hashed' });
      bcrypt.compare.mockResolvedValue(false);

      const req = { body: { email: 'test@test.com', password: 'wrong' } };
      const res = mockRes();

      await loginController(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
        message: 'invalid credential.'
      }));
    });

    it('should return 200 if login successful', async () => {
      const mockUser = { _id: '123', password: 'hashed', email: 'test@test.com' };
      userModel.findOne.mockResolvedValue({ ...mockUser });
      bcrypt.compare.mockResolvedValue(true);
      JWT.sign.mockReturnValue('token123');

      const req = { body: { email: 'test@test.com', password: '123456' } };
      const res = mockRes();

      await loginController(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
        success: true,
        message: 'successfully login',
        token: 'token123'
      }));
    });
  });
});
