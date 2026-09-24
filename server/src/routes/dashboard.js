import express from 'express';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', requireAuth, (req, res) => {
  res.json({
    message: `Welcome back, ${req.user.name}`,
    user: req.user.toSafeJSON(),
    nextSteps: ['Add your first appointment', 'Browse available providers', 'Review your care timeline']
  });
});

export default router;
