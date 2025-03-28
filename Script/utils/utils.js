
export function formatCurrency(currency) {
    return (Math.round(currency) / 100).toFixed(2);
}
export function totalitems(cart) {
    let totalitems = 0
    cart.forEach((cartItems) => {
        totalitems += cartItems.quantity
    })
    return totalitems;
}
export function totalPrice(products, cart) {
    let price = 0;
    let quantity;
    let priceCents;
    products.forEach((product) => {
        let matchingItem;

        cart.forEach((cartItems) => {
            if (product.id === cartItems.id) {
                quantity = cartItems.quantity
                priceCents = product.priceCents
                let initialPrice = (quantity * priceCents)
                price += initialPrice
            }
        })
    })
    return price;
}
