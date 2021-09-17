import fs from 'fs'
import path from 'path'
/*
    Este archivo obtiene los ultimos id de la base de datos (tanto de los productos como el id del carrito), en caso que el json este vacio los inicializa
*/ 

const publicPathFileProductos = path.resolve(
    __dirname,
    './dataDB.json'
);

let archivo =fs.readFileSync(publicPathFileProductos, 'utf-8');
let data=JSON.parse(archivo)


let auxIdBD : number ;
let auxIdCBD : number;
 
if(!data.idDb){//Si no existe idDb Lo inicializa
    console.log("no tengo productos cargados en json");  
    auxIdBD=1;
}else{//si existe lo actualiza
    auxIdBD= data.idDb;
}


if(!data.idCarritoDb){//Si no existe IdCarritoDb lo inicializa
    console.log("no tengo carritos cargados en json");    
    auxIdCBD=1;
}else{//sino lo actualiza
    auxIdCBD= data.idCarritoDb;
}

export let idBaseDeDatos : number = auxIdBD ;
export let idCarritoBaseDeDatos : number = auxIdCBD ;
