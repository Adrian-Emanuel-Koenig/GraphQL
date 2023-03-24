class MemoryCrud {
  constructor() {
    this.data = [];
  }

  create(object) {
    return new Promise((resolve, reject) => {
      this.data.push(object);
      resolve();
    });
  }

  getAllProducts() {
    return new Promise((resolve, reject) => {
      const products = this.data.map((obj) => obj.product);
      resolve(products);
    });
  }

  read(id) {
    const object = this.data.find((obj) => obj.id == id);
    if (!object) {
      return console.log("User not found");
    }
    return object;
  }

  update(id, newObject) {
    return new Promise((resolve, reject) => {
      const index = this.data.findIndex((obj) => obj.id === id);
      if (index === -1) reject(new Error("Object not found"));
      this.data.splice(index, 1, newObject);
      resolve();
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      const index = this.data.findIndex((obj) => obj.id === id);
      if (index === -1) reject(new Error("Object not found"));
      this.data.splice(index, 1);
      resolve();
    });
  }
}

module.exports = MemoryCrud;
