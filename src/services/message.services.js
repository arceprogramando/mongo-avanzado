import MessageDao from '../repository/message.dao.js';

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
}

export default MessageService;
