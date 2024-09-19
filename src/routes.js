import { Router } from 'express';

//Multer(upload)
import multer from 'multer';
import multerConfig from './config/multer';

//Controller
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ProductController from './app/controllers/ProductController';
import CategoryController from './app/controllers/CategoryController';

//Middleware
import authMiddleware from './middlewares/auth';

const routes = new Router();

const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

routes.use(authMiddleware);
routes.post('/products', upload.single('file'), ProductController.store); //upload de um só arquivo no campo 'file'
routes.get('/products', ProductController.index);
routes.post('/categories', CategoryController.store);
routes.get('/categories', CategoryController.index);

export default routes;
