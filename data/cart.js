export let cart;


loadFromStorage()

function loadFromStorage() {
    cart = JSON.parse(localStorage.getItem('cart'))
    if (!cart) {

        cart = [{
            id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1,
            deliveryOptionId: '1'
        },
        {
            id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            deliveryOptionId: '2'
        }];
    }
    return cart;
}
function savetostorage() {
    localStorage.setItem('cart', JSON.stringify(cart))
}

export function addtocart(productId) {
    const cartQuantity = Number(document.querySelector(`.js-product-quantity-${productId}`).value)
    let matchingItem;
    cart.forEach((item, index) => {
        if (productId === item.id) {
            matchingItem = item
        }
    })

    if (matchingItem) {
        matchingItem.quantity += cartQuantity;
    }
    else {
        cart.push({
            id: productId,
            quantity: cartQuantity,
            deliveryOptionId: '1'
        })

    }
    savetostorage()

}

export function addtocarpopup(productId) {
    document.querySelector(`.js-added-to-cart-${productId}`)
        .innerHTML = `
          <img src="images/icons/checkmark.png">
              Added
          `
    function clearTimeout() {
        clearTimeout(SetID)
    }
    let SetID = setTimeout(() => {
        document.querySelector(`.js-added-to-cart-${productId}`)
            .innerHTML = ``
    }, 2000)
}
export function updateCart(productId) {
    const cartQuantity = Number(document.querySelector(`.js-product-quantity-${productId}`).value)
    let totalQuantity = 0
    cart.forEach((value) => {
        totalQuantity += value.quantity
    })
    document.querySelector('.cart-quantity')
        .innerHTML = `${totalQuantity}`
}
export function removeCartItems(productID) {
    let newCart = []
    cart.forEach((cartItems) => {
        if (cartItems.id !== productID) {
            newCart.push(cartItems)
        }
    })
    cart = newCart
    savetostorage()
}
export function updateCartQuantity(productID, newQuantity) {
    cart.forEach((cartItems) => {
        if (productID === cartItems.id) {
            cartItems.quantity = newQuantity
        }
    })
    savetostorage()
}
export function updateDeliveryOption(productID, deliveryOptionId) {
    let matchingItem;
    cart.forEach((cartItems) => {
        if (productID === cartItems.id) {
            matchingItem = cartItems
        }
    })
    matchingItem.deliveryOptionId = deliveryOptionId;
    savetostorage()
}
export function loadcart(func) {
    const xhr = new XMLHttpRequest

    xhr.addEventListener('load', () => {
        console.log(xhr.response);
        func()

    })
    xhr.open('GET', 'https://supersimplebackend.dev/cart')
    xhr.send()
}