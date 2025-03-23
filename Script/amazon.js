let htmlCodeFroPoduct = ""
products.forEach((product) => {
    htmlCodeFroPoduct += `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src=${product.image}>
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select classs="js-product-quantity-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>
            <div>Added to Card</div>
          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
    `
})
let cartQuantity = 0
document.querySelector('.js-product-grid')
    .innerHTML = htmlCodeFroPoduct
let adddedToCartProduct = []
document.querySelectorAll('.js-add-to-cart')
    .forEach((button, index) => {
        button.addEventListener("click", () => {
            const productId = button.dataset.productId
            let matchingItem;
            cart.forEach((item, index) => {
                if (productId === item.id) {
                    matchingItem = item
                }
            })

            if (matchingItem) {
                matchingItem.quantity++;
                cartQuantity++;
            }
            else {
                cartQuantity++;
                cart.push({
                    id: productId,
                    quantit: 1
                }

                )

            }

            document.querySelector('.cart-quantity')
                .innerHTML = `${cartQuantity}`

        })
    })

