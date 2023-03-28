const crypto = require("crypto");
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");

const schema = buildSchema(`
  type Product {
    id: ID!
    nombre: String,
    precio: String,
    thumbnail: String,
    stock: String
  }

  input ProductInput {
    nombre: String,
    precio: String,
    thumbnail: String,
    stock: String
  }

  type Query {
    getProducts(nombre: String,
    precio: String,
    thumbnail: String,
    stock: String):[Product]
 
  }

  type Mutation {
    createProduct(datos: ProductInput):Product
    updateProduct(id: ID!, datos: ProductInput ): Product
    deleteProduct( id: ID! ): Product
  }
`);

const graphql = graphqlHTTP({
  schema: schema,
  rootValue: {
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct,
  },
  graphiql: true,
});

class Product {
  constructor(id, { nombre, precio, thumbnail, stock }) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.thumbnail = thumbnail;
    this.stock = stock;
  }
}

const productsMap = {};

function getProducts({ campo, valor }) {
  const products = Object.values(productsMap);
  if (campo && valor) {
    return products.filter((p) => p[campo] == valor);
  } else {
    return products;
  }
}

function createProduct({ datos }) {
  const id = crypto.randomBytes(10).toString("hex");
  const nuevaProduct = new Product(id, datos);
  productsMap[id] = nuevaProduct;
  return nuevaProduct;
}

function updateProduct({ id, datos }) {
  if (!productsMap[id]) {
    throw new Error("Product not found.");
  }
  const productActualizado = new Product(id, datos);
  productsMap[id] = productActualizado;
  return productActualizado;
}

function deleteProduct({ id }) {
  if (!productsMap[id]) {
    throw new Error("Product not found.");
  }
  const productBorrado = productsMap[id];
  delete productsMap[id];
  return productBorrado;
}

module.exports = { graphql };


/* -------------------------------------------------------------------------- */
/*                                 CODIGO TEST                                */
/* -------------------------------------------------------------------------- */

/*
query getProducts {
    getProducts{
      id
      nombre
      precio
      thumbnail
      stock
    }
  }
  
  mutation createProduct{
    createProduct(
      datos:{
        nombre: "El nombre del viento",
        precio: "4500",
        thumbnail: "https://http2.mlstatic.com/D_NQ_NP_640343-MLA47941205694_102021-O.jpg",
        stock: "20"
      }
    ) 
    {
      id
    }
  }
  
  mutation crearProduct2{
    createProduct(
      datos:{
        nombre: "El temor de un hombre sabio",
        precio: "5500",
        thumbnail: "https://images.cdn3.buscalibre.com/fit-in/360x360/35/a6/35a6411002c7d26f2dc6981ac8b31137.jpg",
        stock: "10"
      }
    ) 
    {
      id
    }
  }
  
  mutation updateProduct{
    updateProduct(id: "4c2ca1b487a96b417b38",datos:{nombre: "El nombre del viento",precio: "1200" ,thumbnail: "asd", stock: "0"}) {
      id
    }
  }
  
  mutation deleteProduct {
    deleteProduct(id: "3db01777474aa501d9d8") {
      id
    }
  }
*/