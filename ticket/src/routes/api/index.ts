import express from 'express';
import users from './ticket'
const router=express.Router();

router.use('/ticket',users);

export default router;