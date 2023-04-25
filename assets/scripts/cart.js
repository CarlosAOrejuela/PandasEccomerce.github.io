//Modulo que obtendra los datos de los productos y los guardara en el local storage
//Para su posterior uso

let cart = {};

export function addToCart(product) {
    let cart = getCart();
    if (cart[product.id]) {
        cart[product.id].count++;
    } else {
        cart[product.id] = {
            product: product,
            count: 1
        };
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function removeFromCart(productId) {
    let cart = getCart();
    if (cart[productId]) {
        cart[productId].count--;
        if (cart[productId].count === 0) {
            delete cart[productId];
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function getCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || {};
    return cart;
}
