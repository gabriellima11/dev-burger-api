import { Router } from 'express';

//Multer(upload)
import multer from 'multer';
import multerConfig from './config/multer';

//Controller
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ProductController from './app/controllers/ProductController';
import CategoryController from './app/controllers/CategoryController';
import OrderController from './app/controllers/OrderController';
import CreatePaymentIntentController from './app/controllers/stripe/CreatePaymentIntentController';

//Middleware
import authMiddleware from '../src/app/middlewares/auth';

const routes = new Router();

const upload = multer(multerConfig);

routes.get('/', (req, res) => {
	return res.json({ message: 'DevBurger API :)' });
});

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

routes.use(authMiddleware);

//PRODUCTS
routes.post('/products', upload.single('file'), ProductController.store); //upload de um só arquivo no campo 'file'
routes.put('/products/:id', upload.single('file'), ProductController.update);
routes.get('/products', ProductController.index);

//CATEGORIES
routes.post('/categories', upload.single('file'), CategoryController.store);
routes.put('/categories/:id', upload.single('file'), CategoryController.update);
routes.get('/categories', CategoryController.index);

//ORDERS
routes.post('/orders', OrderController.store);
routes.get('/orders', OrderController.index);
routes.put('/orders/:id', OrderController.update);

routes.post('/create-payment-intent', CreatePaymentIntentController.store);

export default routes;
