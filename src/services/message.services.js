import MessageDao from '../dao/message.dao.js';

class MessageService {
  constructor() {
    this.messageDao = new MessageDao();
  }

  createMessage = async (newMessage) => {
    try {
      const createMessage = await this.messageDao.createMessage(newMessage);
      return createMessage;
    } catch (error) {
      throw new Error(`Error al crear el mensaje  en el service: ${error.message}`);
    }
  };

  getAllMessages = async () => {
    try {
      const getAllMessages = await this.messageDao.getAllMessages();
      return getAllMessages;
    } catch (error) {
      throw new Error(`Error al buscar los mensajes  en el service: ${error.message}`);
    }
  };
}

export default MessageService;
