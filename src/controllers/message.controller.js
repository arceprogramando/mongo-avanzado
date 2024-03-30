import MessageService from '../services/message.services.js';

class MessageController {
  constructor() {
    this.messageService = new MessageService();
  }

  createMessage = async (req, res) => {
    try {
      const { user, message } = req.body;

      if (!user) return res.status(400).json({ error: 'El usuario no fue enviado correctamente' });

      if (!message) return res.status(400).json({ error: 'El mensaje no fue enviado correctamente' });

      const newMessage = {
        user,
        message,
      };

      const createdMessage = await this.messageService.createMessage(newMessage);

      return res.status(201).json(createdMessage);
    } catch (error) {
      return res.status(500).json({ error: 'Ocurrió un error al guardar el mensaje' });
    }
  };
}

export default MessageController;
