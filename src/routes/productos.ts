import { Router } from 'express'
import { checkAdmin} from '../middleware/admin';
import {isAproduct,productExists, hayProductos } from '../middleware/productos'
import { productosController } from '../controller/productos'
const miRouter = Router();



miRouter.get('/listar',hayProductos,productosController.getProducts)

miRouter.get('/listar/:id',hayProductos,productExists,productosController.getProducts)

miRouter.post('/agregar',checkAdmin,isAproduct,productosController.addProducts)

miRouter.put('/actualizar/:id',checkAdmin,hayProductos,isAproduct,productExists,productosController.updateProducts)

miRouter.delete('/borrar/:id',checkAdmin,hayProductos,productExists,productosController.deleteProducts)

export default miRouter;