import { Router } from 'express'
import productosRouter from './productos'
import carritoRouter from './carrito'
import { productsPersistencia } from '../presistencia/productos';


const miRouter = Router();

miRouter.use('/api/productos', productosRouter)
miRouter.use('/api/carrito', carritoRouter)

miRouter.get('/', (req, res) =>{
    const data = {
        layout: 'index',
        hayDatos: false,
        productos:productsPersistencia.get(),
    }
    if(data.productos){
        data.hayDatos=true;
    }
    res.render('main',data)
})


export default miRouter;