const Product = require('./Product');
const store = require('../store/products');

class Cart{
    static #items = [];

    static add(productName){
        const product = store.getAll().find(p => p.name === productName);
        if(!product) throw new Error("Product not found");

        const existing = this.#items.find(item => item.product.name === product.name);
        if(existing){
            existing.quantity =+ 1;
        }else{
            this.#items.push({product, quantity: 1});
        }
    }

    static getItems(){
        return this.#items;
    }

    static getTotalPrice(){
        return this.#items.reduce((total, item) => total + item.product.price * item.quantity, 0);
    }

    static getProductsQuantity(){
        return this.#items.reduce((total, item) => total + item.quantity, 0);
    }

    static clearCart(){
        this.#items = [];
    }
}

module.exports = Cart;