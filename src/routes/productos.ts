import { Router } from 'express'
import { checkAdmin} from '../middleware/admin';
import { productosController } from '../controller/productos'
import asyncHandler from 'express-async-handler'

const miRouter = Router();



miRouter.get(
    '/listar',
    productosController.hayProductos,
    asyncHandler(productosController.getProducts)
);

miRouter.get(
    '/listar/:id',
    productosController.hayProductos,
    productosController.productExists,
    asyncHandler(productosController.getProducts)
);

miRouter.post(
    '/agregar',
    checkAdmin,
    productosController.isAproduct,
    asyncHandler(productosController.addProducts)
);

miRouter.put(
    '/actualizar/:id',
    checkAdmin,
    productosController.hayProductos,
    productosController.productExists,
    productosController.isAproduct,    
    asyncHandler(productosController.updateProducts)
);

miRouter.delete(
    '/borrar/:id',
    checkAdmin,
    productosController.hayProductos,
    productosController.productExists,
    asyncHandler(productosController.deleteProducts)
);

export default miRouter;