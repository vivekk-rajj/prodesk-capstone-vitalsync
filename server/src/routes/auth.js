import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { requireAuth, signToken } from '../middleware/auth.js';

const router = express.Router();

function validateCredentials({ name, email, password }, isRegister = false) {
  if (isRegister && (!name || name.trim().length < 2)) return 'Name must contain at least 2 characters';
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) return 'A valid email is required';
  if (!password || password.length < 8) return 'Password must contain at least 8 characters';
  return null;
}

router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const validationError = validateCredentials({ name, email, password }, true);
    if (validationError) return res.status(400).json({ message: validationError });

    const normalizedEmail = email.toLowerCase().trim();
    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) return res.status(409).json({ message: 'An account with this email already exists' });

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password,
      role: ['patient', 'doctor', 'admin'].includes(role) ? role : 'patient'
    });

    return res.status(201).json({ token: signToken(user), user: user.toSafeJSON() });
  } catch (error) {
    if (error?.code === 11000) return res.status(409).json({ message: 'An account with this email already exists' });
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validationError = validateCredentials({ email, password });
    if (validationError) return res.status(400).json({ message: validationError });

    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');
    const valid = user && user.isActive && await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid email or password' });

    return res.json({ token: signToken(user), user: user.toSafeJSON() });
  } catch (error) {
    next(error);
  }
});

router.get('/me', requireAuth, (req, res) => {
  res.json({ user: req.user.toSafeJSON() });
});

export default router;
