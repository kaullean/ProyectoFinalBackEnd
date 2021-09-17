import { Request, Response, NextFunction } from 'express';
import { productsPersistencia } from '../presistencia/productos';


/*Logica de las rutas*/


class Producto {

  /*Obtiene desde la persistancia de productos el producto que coincide con el id o, si no se pasa un producto por params
  responde con todo el array de los mismos*/
  getProducts(req: Request, res: Response) {
    const id = Number(req.params.id);

    const producto = id ? productsPersistencia.get(id) //Si id existe id solicita a la persistencia ese producto especifico
                        : productsPersistencia.get();//sino solicita todo

    res.json({
      data: producto,
    });
  }

  /*
    persiste el archivo enviado en el array de productos del sistema
  */
  addProducts(req: Request, res: Response) {
    const newItem = productsPersistencia.add(req.body);

    res.json({
      msg: 'producto agregado con exito',
      data: newItem,
    });
  }
  /*
    Actualiza el producto de la base de datos que corresponde al id enviado
  */ 
  updateProducts(req: Request, res: Response) {
    const id = Number(req.params.id);
    const updatedProduct= productsPersistencia.update(id, req.body)
    res.json({
      msg: 'actualizando producto',
    });
  }

  /*
    Elmina el producto de la base de datos que corresponde al id enviado
  */ 
  deleteProducts(req: Request, res: Response) {
    
    const id = Number(req.params.id);

    productsPersistencia.delete(id);
    res.json({
      msg: 'producto borrado',
    });
  }
}

export const productosController = new Producto();