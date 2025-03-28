import { totalitems, formatCurrency, totalPrice } from "../utils/utils.js"
import { cart } from "../../data/cart.js"
import { products } from "../../data/products.js";
import { getDeliveryOption } from "../../data/delivery.js";

export function renderPaymentSummary() {
  let shippingPriceCents = 0;
  cart.forEach(cartItems => {
    const deliveryOption = getDeliveryOption(cartItems.deliveryOptionId)
    shippingPriceCents += deliveryOption.priceCents
  });
  const productPriceCents = totalPrice(products, cart);
  const taxAmountCents = (shippingPriceCents + productPriceCents) * 0.1;
  document.querySelector('.payment-summary')
    .innerHTML = `
    <div class="payment-summary-title">
          Order Summary
        </div>

        <div class="payment-summary-row">
          <div>Items (${totalitems(cart)}):</div>
          <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">$${formatCurrency(shippingPriceCents + productPriceCents)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">$${formatCurrency(taxAmountCents)}</div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money">$${formatCurrency(taxAmountCents + productPriceCents + shippingPriceCents)}</div>
        </div>

        <button class="place-order-button button-primary">
          Place your order
        </button>
    `
}