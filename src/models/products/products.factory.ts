import { ProductosMemDAO } from './DAOs/memory';
import { ProductosSql3DAO } from './DAOs/sqlite3';


export enum TipoPersistencia {
  MEMORIA = 'MEM',
  SQLITE3 ='SLQ3'
}

export class NoticiasFactoryDAO {
  static get(tipo: TipoPersistencia) {
    switch (tipo) {
      case TipoPersistencia.SQLITE3:
        console.log('Retornando instancia de SQLITE3');
        return new ProductosSql3DAO
      
      default:
        console.log('RETORNANDO INSTANCIA CLASE MEMORIA');
        return new ProductosMemDAO();
    }
  }
}