import { Router } from 'express';
import messageModel from '../dao/models/message.models.js';
import MessageController from '../controllers/message.controller.js';

const router = Router();

const messageController = new MessageController();

router.post('/', messageController.createMessage);

router.get('/', async (req, res) => {
  try {
    const findmessage = await messageModel.find({});
    const messages = findmessage.map((message) => message.toObject());
    res.render('chat', {
      messages,
      style: 'index.css',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
