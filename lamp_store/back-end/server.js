import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';
import cartRoute from './routes/cart';
import userRoute from './routes/users';
import uploadRoute from './routes/upload';
import productsRoute from './routes/products';
import ClearCart from './utils/clearCart';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';


const app = express();

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Lamp-Shop',
      version: '1.0.0',
      description: 'API documentation',
    },
    servers: [
      {
        url: 'http://localhost:3001',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

async function start() {
  try {
    await mongoose.connect('mongodb+srv://Alexis:qwer1234@lamp-app.e21k02f.mongodb.net/?retryWrites=true&w=majority&appName=Lamp-App', {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    ClearCart();
    app.listen(3001, () => {
      console.log(`server has been started on port ${3001}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();

app.set('views', path.join(__dirname, 'views'));

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/cart', cartRoute);
app.use('/users', userRoute);
app.use('/upload', uploadRoute);
app.use('/products', productsRoute);
app.use('/public', express.static('public'));
