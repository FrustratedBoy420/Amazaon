export function formatCurrency(currency) {
    return (currency / 100).toFixed(2);
}
export function totalitems(cart) {
    let totalitems = 0
    cart.forEach((cartItems) => {
        totalitems += cartItems.quantity
    })
    return totalitems;
}