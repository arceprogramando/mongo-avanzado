import { Router } from 'express';
import MessageController from '../controllers/message.controller.js';

const router = Router();

const messageController = new MessageController();

router.post('/', messageController.createMessage);

router.get('/', messageController.getAllMessages);

export default router;
