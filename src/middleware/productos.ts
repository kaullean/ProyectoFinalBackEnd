import { Request, Response, NextFunction } from 'express';
import { productsPersistencia } from '../presistencia/productos';
/*
  Este archivo contiene middlewares que se encargaran de realizar comprobaciones a los productos.
*/

//Comprueba si lo ingresado tiene el formato de un producto
export const isAproduct = (req: Request, res: Response, next: NextFunction) => {
  if(
    !req.body.nombre ||req.body.nombre===''||
    !req.body.descripcion ||req.body.descripcion===''||
    !req.body.codigo ||req.body.codigo===''||
    !req.body.fotoUrl ||req.body.fotoUrl===''||
    !req.body.precio ||req.body.precio===NaN||
    !req.body.stock ||req.body.stock===NaN||
    
    typeof req.body.nombre != typeof String() ||
    typeof req.body.descripcion != typeof String() ||
    typeof req.body.codigo !=typeof String() ||
    typeof req.body.fotoUrl != typeof String() ||
    typeof req.body.precio != typeof Number() ||
    typeof req.body.stock != typeof Number() 

  ){
      return res.status(404).json({
          msg:"Formato de archivo incorrecto, corroborar atributos y tipos de dato"
      })
  }
      
  console.log("ControllerProductoLog- Formato de producto validado");
  next()  
}
//Comprueba que el producto solicitado exista
export const productExists = (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);

  if (productsPersistencia.find(id) === undefined) {
    return res.status(404).json({
      msg: 'Producto no encontrado',
    });
  }
  next();
}
//Comprueba si hay productos
export const hayProductos=(req: Request, res: Response, next: NextFunction) => {

  if (productsPersistencia.get().length===0) {
        return res.status(404).json({
          msg: 'No hay productos cargados en el sistema',
        });
      }
  next();
}






