import { ProductosMemDAO } from './DAOs/memory';


export enum TipoPersistencia {
  Memoria = 'MEM'
}

export class NoticiasFactoryDAO {
  static get(tipo: TipoPersistencia) {
    switch (tipo) {

      default:
        console.log('RETORNANDO INSTANCIA CLASE MEMORIA');
        return new ProductosMemDAO();
    }
  }
}