import mongoose from 'mongoose';
import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

export async function initializeUsers() {
  const count = await User.countDocuments();
  if (count === 0) {
    // Get the path to users.json
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const usersPath = join(__dirname, '../users.json');

    // Read and parse the JSON file
    const data = await readFile(usersPath, 'utf-8');
    const users = JSON.parse(data);

    // Insert users into MongoDB
    await User.insertMany(users);
    console.log('Users initialized from users.json');
  }
}

export default User;