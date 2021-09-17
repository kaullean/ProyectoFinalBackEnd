import { Router } from 'express'
import { checkAdmin} from '../middleware/admin';
import {hayProductosEnCarrito,productExistsEnCarrito } from '../middleware/carrito'
import { productExists,hayProductos } from '../middleware/productos';
import { carritoController } from '../controller/carrito';

const miRouter = Router();

miRouter.get('/listar',hayProductosEnCarrito,carritoController.getCarrito)

miRouter.get('/listar/:id',hayProductosEnCarrito,productExistsEnCarrito,carritoController.getCarrito)

miRouter.post('/agregar/:id',hayProductos,productExists,carritoController.addProductsCarrito)

miRouter.delete('/borrar/:id',checkAdmin,hayProductosEnCarrito,productExistsEnCarrito,carritoController.deleteProductsCarrito)

export default miRouter;