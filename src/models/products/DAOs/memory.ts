import {
    newProduct,
    Product,
    ProductBaseClass,
    ProductQuery,
  } from '../products.interface';
  
export class ProductosMemDAO implements ProductBaseClass {
  private productos: Product[] = [];
  private ID: string='0';

  constructor(){
    
    const mockData = [
      { _id: this.proximoID(), timestamp:new Date(), nombre: 'lapiz', descripcion:'Lapiz HB negro', codigo: "codigoLapiz", fotoUrl: "url/lapiz", precio: 100,stock:10},
      { _id: this.proximoID(), timestamp:new Date(), nombre: 'goma', descripcion:'goma blanca', codigo: "codigoGoma", fotoUrl: "url/goma", precio: 200,stock:20},
      { _id: this.proximoID(), timestamp:new Date(), nombre: 'calculadora', descripcion:'calculadora cientifica', codigo: "codigoCalculadora", fotoUrl: "url/calculadora", precio: 300,stock:30},
      { _id: this.proximoID(), timestamp:new Date(), nombre: 'escuadra', descripcion:'escuadra 45 grados', codigo: "codigoEscuadra", fotoUrl: "url/escuadra", precio: 400,stock:40},
      { _id: this.proximoID(), timestamp:new Date(), nombre: 'regla', descripcion:'regla 20cm transparente', codigo: "codigoRegla", fotoUrl: "url/regla", precio: 500,stock:50},
      { _id: this.proximoID(), timestamp:new Date(), nombre: 'lapiz', descripcion:'Lapiz HB negro', codigo: "codigoLapiz", fotoUrl: "url/lapiz", precio: 10,stock:10},
      
    ];
    mockData.forEach((aMock) => this.productos.push(aMock));
  }

  proximoID(){

    const proximoId=Number(this.ID)+1
    this.ID=proximoId.toString();
    return this.ID;
  }
  
  findIndex(id: string) {
    return this.productos.findIndex((aProduct) => aProduct._id == id);
  }

  find(id: string): Product | undefined {
    return this.productos.find((aProduct) => aProduct._id === id);
  }

  async get(id?: string): Promise<Product[]> {
    if (id) {
      return this.productos.filter((aProduct) => aProduct._id === id);
    }
    return this.productos;
  }

  async add(data: newProduct): Promise<Product> {
    const newItem: Product = {
      _id: this.proximoID(),
      timestamp: new Date(),
      ...data
    };
    
    this.productos.push(newItem);

    return newItem;
  }

  async update(id: string, newProductData: newProduct): Promise<Product> {
    const index = this.findIndex(id);
    const oldProduct = this.productos[index];

    const updatedProduct: Product = { ...oldProduct, ...newProductData };
    this.productos.splice(index, 1, updatedProduct);
    return updatedProduct;
  }

  async delete(id: string): Promise<Product> {
    const index = this.findIndex(id);
    const productoBorrado=this.productos[index]    
    this.productos.splice(index, 1);
    return productoBorrado;
    
  }

  async query(options: ProductQuery): Promise<Product[]> {
      type Conditions = (aProduct: Product) => boolean;
      const query: Conditions[] = [];
      console.log("filtro x query");
      
      if (options.nombre)
          query.push((aProduct: Product) => aProduct.nombre == options.nombre);
      if (options.descripcion)
          query.push((aProduct: Product) => aProduct.descripcion == options.descripcion);
      if (options.codigo)
          query.push((aProduct: Product) => aProduct.codigo == options.codigo);
      if (options.fotoUrl)
          query.push((aProduct: Product) => aProduct.fotoUrl == options.fotoUrl);    
      if (options.precio)
          query.push((aProduct: Product) => aProduct.precio == options.precio);
      if (options.stock)
          query.push((aProduct: Product) => aProduct.stock == options.stock);

    return this.productos.filter((aProduct) => query.every((x) => x(aProduct)));
  }
}