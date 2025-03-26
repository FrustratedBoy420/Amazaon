import { cart, removeCartItems, updateCartQuantity, updateDeliveryOption } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatCurrency, totalitems } from "../utils/utils.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions } from "../../data/delivery.js";

export function renderOrderSummary() {
    let htmlCode = ''
    cart.forEach((cartItems) => {
        const productID = cartItems.id
        let matchingProduct;
        products.forEach((product) => {
            if (product.id === productID) {
                matchingProduct = product
            }
        })
        const deliveryOptionId = cartItems.deliveryOptionId
        let deliveryOption;
        deliveryOptions.forEach((option) => {
            if (option.id === deliveryOptionId) {
                deliveryOption = option;
            }
        })
        const today = dayjs()
        const addingdays = today.add(deliveryOption.deliverDay, 'day')
        const shippingDays = addingdays.format('dddd, MMMM D')

        htmlCode += `
        <div class="cart-item-container 
        js-cart-container-${matchingProduct.id}">
              <div class="delivery-date">
                Delivery date: ${shippingDays}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image" src="${matchingProduct.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingProduct.name}
                  </div>
                  <div class="product-price">
                    $${formatCurrency(matchingProduct.priceCents)}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItems.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-quantity"
                    data-product-id="${matchingProduct.id}">
                      Update
                    </span>
                    <input class="quantity-input quantity-input-${matchingProduct.id}">
                <span class="save-quantity-link link-primary js-save-link"
                  data-product-id="${matchingProduct.id}">
                  Save
                </span>
                    <span class="delete-quantity-link link-primary js-delete-links"
                    
                    data-product-id="${matchingProduct.id}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryOptionHtml(matchingProduct, cartItems)}
                </div>
              </div>
            </div>
    `
    })
    document.querySelector('.order-summary')
        .innerHTML = htmlCode

    document.querySelectorAll('.js-delete-links')
        .forEach((link) => {
            link.addEventListener('click', () => {
                const productID = link.dataset.productId
                removeCartItems(productID)
                const element = document.querySelector(`.js-cart-container-${productID}`)
                element.remove()
                document.querySelector('.js-checkout-header-middle-section')
                    .innerHTML = `Checkout (<a class="return-to-home-link" href="amazon.html">${totalitems(cart)} items</a>)`
            })
        })
    document.querySelector('.js-checkout-header-middle-section')
        .innerHTML = `Checkout (<a class="return-to-home-link" href="amazon.html">${totalitems(cart)} items</a>)`

    document.querySelectorAll('.js-update-quantity')
        .forEach((updatelinks) => {
            updatelinks.addEventListener('click', () => {
                const productID = updatelinks.dataset.productId
                const container = document.querySelector(`.js-cart-container-${productID}`)
                container.classList.add('is-editing-quantity')
            })
        })
    document.querySelectorAll('.js-save-link')
        .forEach((link) => {
            link.addEventListener('click', () => {
                const productId = link.dataset.productId;
                ;
                const newQuantity = Number(document.querySelector(`.quantity-input-${productId}`).value)

                updateCartQuantity(productId, newQuantity)
                if (newQuantity < 0 || newQuantity > 1000) {
                    alert(`Quantity must be at least 0 and less than 1000`)
                    return;
                }
                const container = document.querySelector(`.js-cart-container-${productId}`);
                container.classList.remove('is-editing-quantity')
                cart.forEach((cartItems) => {
                    if (productId === cartItems.id) {
                        document.querySelector(`.js-quantity-label-${productId}`)
                            .innerHTML = cartItems.quantity
                        document.querySelector('.js-checkout-header-middle-section')
                            .innerHTML = `Checkout (<a class="return-to-home-link" href="amazon.html">${totalitems(cart)} items</a>)`
                    }
                })


            });
        });
    function deliveryOptionHtml(matchingProduct, cartItems) {
        let htmlCode = ''
        deliveryOptions.forEach((deliveryOption) => {
            const today = dayjs()
            const addingdays = today.add(deliveryOption.deliverDay, 'day')
            const shippingDays = addingdays.format('dddd, MMMM D')
            const shippingPrice = deliveryOption.priceCents === 0 ? "FREE " : `$${formatCurrency(deliveryOption.priceCents)} - `
            const isChecked = deliveryOption.id === cartItems.deliveryOptionId
            htmlCode += `
        <div class="delivery-option js-delivery-option"data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
          <input type="radio" 
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
          <div>
              <div class="delivery-option-date">
                  ${shippingDays}
              </div>
              <div class="delivery-option-price">
                ${shippingPrice}Shipping
            </div>
          </div>
        </div>
        `
        })
        return htmlCode;
    }
    document.querySelectorAll('.js-delivery-option')
        .forEach((element) => {
            element.addEventListener('click', () => {
                const { productId, deliveryOptionId } = element.dataset
                updateDeliveryOption(productId, deliveryOptionId)
                renderOrderSummary()
            })
        })
}


