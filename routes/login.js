import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
  res.render('login', { title: 'Login', username: '' });
});

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

export default router;
