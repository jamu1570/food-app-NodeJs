import connectDB from '../config/db.js';
import User from '../models/userModel.js';

await connectDB();

const users = await User.find({ userType: 'client'});

for (let user of users) {
  user.userType = 'admin';
  await user.save();
}

console.log(`✅ Migration applied: Added 'role' to ${users.length} users.`);
process.exit();