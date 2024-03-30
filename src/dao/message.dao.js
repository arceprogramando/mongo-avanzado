import MessageModel from './models/message.models.js';

class MessageDao {
  constructor() {
    this.messageModel = MessageModel;
  }

  createMessage = async (newMessage) => {
    try {
      const createMessage = await this.messageModel.create(newMessage);
      return createMessage;
    } catch (error) {
      throw new Error('Error Al crear el message en el dao');
    }
  };

  getAllMessages = async () => {
    try {
      const getAllMessages = await this.messageModel.find();
      return getAllMessages;
    } catch (error) {
      throw new Error('Error Al traer los mensajes en el dao');
    }
  };
}

export default MessageDao;
