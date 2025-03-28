import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import "../data/Cart-class.js";
import { loadproduct } from "../data/products.js";

loadproduct(() => {
    renderOrderSummary()
    renderPaymentSummary()
})
