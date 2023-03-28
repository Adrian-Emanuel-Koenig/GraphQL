INICIAR: NPM RUN DEV

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
