export const cart = [];

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
            quantity: cartQuantity
        })

    }

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