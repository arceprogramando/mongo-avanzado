import express from 'express';
import cors from 'cors';
import displayRoutes from 'express-routemap';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import configObject from './config/configenvironment.js';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import productRouter from './routes/products.routes.js';
import mongoDBConnection from './config/mongo.config.js';
import cartRouter from './routes/carts.routes.js';
import messageRouter from './routes/message.routes.js';

const app = express();
const env = configObject;

app.use(cors());

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.set('PORT', env.PORT || 8080);
app.set('NODE_ENV', env.NODE_ENV || 'development');

const server = app.listen(app.get('PORT'), () => {
  console.log(`=Encendido servidor en puerto ${app.get('PORT')}= \n====== http://localhost:${app.get('PORT')}/ =====`);
  console.log(`==========ENV:${app.get('NODE_ENV')}==========`);
  console.log('===============^^^^^===============');
  displayRoutes(app);
  mongoDBConnection();
});

app.use('/', viewsRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/chat', messageRouter);

const io = new Server(server);

io.on('connection', (socket) => {
  console.log('Saludo desde el servidor');
  socket.on('message', (data) => {
    console.log(data);
  });
});
