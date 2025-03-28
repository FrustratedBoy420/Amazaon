import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import "../data/Cart-class.js";
import { loadproduct } from "../data/products.js";
import { loadcart } from "../data/cart.js";

Promise.all([
    new Promise((resolve) => {
        loadproduct(() => {
            resolve()
        })
    }),
    new Promise((resolve) => {
        loadcart(() => {
            resolve();
        })
    })
]).then(() => {
    renderOrderSummary()
    renderPaymentSummary()
})


// new Promise((resolve) => {
//     loadproduct(() => {
//         resolve()
//     })
// }).then(() => {
//     return new Promise((resolve) => {
//         loadcart(() => {
//             resolve();
//         })
//     })
// }).then(() => {
//     renderOrderSummary()
//     renderPaymentSummary()
// })




// loadproduct(() => {
//     renderOrderSummary()
//     renderPaymentSummary()
// })
