import mongoose from 'mongoose';
import configObject from '../../../config/configenvironment.js';

const { DB_CNN, DB_HOST, DB_PORT, DB_NAME } = configObject;

const configConnection = {
  url: `${DB_CNN}${DB_NAME}` ?? `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};

const mongoDBConnection = async () => {
  try {
    await mongoose.connect(configConnection.url, configConnection.options);
    console.log(`======= URL: ${configConnection.url.substring(0, 20)} =======`);
  } catch (error) {
    console.log(`🚀 ~ file: mongo.config.js:28 ~ mongoDBConnection ~ err:, ${error}`);
  }
};

export default mongoDBConnection;
