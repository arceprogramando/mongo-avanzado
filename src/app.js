import express from 'express';
import cors from 'cors';
import displayRoutes from 'express-routemap';
import { engine } from 'express-handlebars';
import __dirname from './utils.js';
import configObject from './config/config.js';
import mongoDBConnection from './db/mongo.config.js';
import productsroutes from './routes/products.routes.js';
import viewsProducts from './routes/views.router.js';

const app = express();
const env = configObject;
// Middlewares
app.use(cors());

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

const PORT = env.PORT || 8080;
const NODE_ENV = env.NODE_ENV || 'development';

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`=Encendido servidor en puerto ${PORT}= \n====== http://localhost:${PORT}/ =====`);
  // eslint-disable-next-line no-console
  console.log(`==========ENV:${NODE_ENV}==========`);
  // eslint-disable-next-line no-console
  console.log('===============^^^^^===============');
  displayRoutes(app);
});

mongoDBConnection();

app.use('/', viewsProducts);
app.use('/', productsroutes);
