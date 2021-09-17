import fs from 'fs'
import path from 'path'
import { objToJSON } from '../services/json';
import {idBaseDeDatos} from './data';
const publicPathFileProductos = path.resolve(
  __dirname,
  '../../public/productos.json'
);

const pathFileProductos = path.resolve(
  __dirname,
  './dataDB.json'
);
let data =fs.readFileSync(publicPathFileProductos, 'utf-8');

let productos : Product[]= JSON.parse(data);

let idActual=idBaseDeDatos;
  
interface Product {
  id: number;
  timestamp: Date;
  nombre: string;
  descripcion: string;
  codigo: string;
  fotoUrl: string;
  precio: number;
  stock: number;
}
interface newProduct {
  nombre: string;
  descripcion: string;
  codigo: string;
  fotoUrl: string;
  precio: number;
  stock: number;
}


class Productos {

  find(id: number): Product | undefined | number {
    
    return productos.find((aProduct) => aProduct.id === id);
    
  }
  /*
    Actualiza el json para incrementar el valor del ultimo iddeProducto
  */
  actualizarIdDB(){
    let data=fs.readFileSync(pathFileProductos, 'utf-8');
    let dataParse = JSON.parse(data);
    dataParse.idDb=idActual;
    
    fs.writeFileSync(pathFileProductos, objToJSON(dataParse), 'utf-8');
  }
  /*
    guarda el producto en un json
  */
  guardarProductosArchivo() {//quizas deba implementar una clase para el manejador de archivos (un chino)
    fs.writeFileSync(publicPathFileProductos, objToJSON(productos), 'utf-8');
  }
  /*
    Devuelve el producto solicitado 
  */
  get(id?: number)  {
    if (id) {
      return productos.filter((aProduct) => aProduct.id === id);
    }
    return productos;
  }
  /*
    Agrega el producto a los productos del sistema, lo guarda en el archivo, actualiza el ultimo id y devuelve el item agregado 
  */
  add(data: newProduct) {
    const newItem: Product = {
      id:idActual,
      timestamp: new Date(),
      nombre: data.nombre,
      descripcion: data.descripcion,
      codigo: data.codigo,
      fotoUrl: data.fotoUrl,
      precio: data.precio,
      stock: data.stock,
    };
    idActual++;
    productos.push(newItem);
    this.actualizarIdDB();
    this.guardarProductosArchivo();
    return newItem;
  }
  /*
    Actualiza el producto solicitado
  */
  update(id : number, data: newProduct){
    for(let i=0;i<productos.length;i++){            
      if(productos[i].id === id){ 
          const updatedProduct={
              id : productos[i].id,
              timestamp: new Date(),
              ...data,
          }

          productos[i]=updatedProduct
          return productos[i];
      }       
  }      
  }
  /*
    Borra el producto solicitado y actualiza los datos en el json
  */
  delete(id: number) {

    productos = productos.filter((aProduct) => aProduct.id !== id);
    this.guardarProductosArchivo();
    return productos;
  }
}

export const productsPersistencia = new Productos();