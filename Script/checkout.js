import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import "../data/Cart-class.js";
import { loadproduct, loadproductFetch } from "../data/products.js";
import { loadcart } from "../data/cart.js";

async function loadpage() {
    try {
        console.log("done Buddy");

        await loadproductFetch()


        await new Promise((resolve) => {
            loadcart(() => {
                resolve();
            })
        })
    } catch (error) {
        alert(`Please Came With Your Personal Hotspot`)
    }
    renderOrderSummary()
    renderPaymentSummary();
}
loadpage()


// Promise.all([
//     loadproductFetch(),
// new Promise((resolve) => {
//     loadcart(() => {
//         resolve();
//     })
// })
// ]).then(() => {
//     renderOrderSummary()
//     renderPaymentSummary()
// })


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
