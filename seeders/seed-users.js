// seeders/seed-users.js
import connectDB from '../config/db.js';
import User from '../models/userModel.js';

await connectDB();

// await User.deleteMany();

await User.insertMany([
  {
    userName: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    phone: '9874562100',
    address: ['address1'],
  },
  {
    userName: 'Test User',
    email: 'test@example.com',
    password: 'test123',
    phone: '9974562100',
    address: ['address2'],
  },
]);

console.log('✅ Users seeded');
process.exit();
