import { Router } from 'express';
import User from '../models/user.js'; // Adjust the path as necessary
const router = Router();

router.get('/', (req, res) => {
  res.render('login', { title: 'Login', username: '' });
});

/*
router.post('/', (req, res) => {
  const { username = '', password = '' } = req.body;
  if (!username || !password) {
    return res.status(400).render('login', { title: 'Login', username, error: 'Username and password are required' });
  }
  if (username === 'ctm' && password === '1234') {
    return res.render('ctm', { title: 'Login', username: username, password: password });
  }
  res.render('login', { title: 'Login', username, error: 'Invalid credentials' });
});
*/
router.post('/', async (req, res) => {
  const { username = '', password = '' } = req.body;
  if (!username || !password) {
    return res.status(400).render('login', { title: 'Login', username, error: 'Username and password are required' });
  }
  const user = await User.findOne({ username, password });
  if (user) {
    return res.render('ctm', { title: 'Login', username: username, password: password });
  }
  res.render('login', { title: 'Login', username, error: 'Invalid credentials' });
});

export default router;
