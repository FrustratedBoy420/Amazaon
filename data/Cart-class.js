class Cart {
    cartItems = undefined;

    storageName = undefined

    loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.storageName))
        if (!this.cartItems) {

            this.cartItems = [{
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
        return this.cartItems;
    }

    savetostorage() {
        localStorage.setItem(this.storageName, JSON.stringify(this.cartItems))
    }

    addtocart(productId) {
        const cartQuantity = Number(document.querySelector(`.js-product-quantity-${productId}`).value)
        let matchingItem;
        this.cartItems.forEach((item, index) => {
            if (productId === item.id) {
                matchingItem = item
            }
        })

        if (matchingItem) {
            matchingItem.quantity += cartQuantity;
        }
        else {
            this.cartItems.push({
                id: productId,
                quantity: cartQuantity,
                deliveryOptionId: '1'
            })

        }
        this.savetostorage()

    }


    addtocarpopup(productId) {
        document.querySelector(`.js-added-to-this.cartItems-${productId}`)
            .innerHTML = `
          <img src="images/icons/checkmark.png">
              Added
          `
        function clearTimeout() {
            clearTimeout(SetID)
        }
        let SetID = setTimeout(() => {
            document.querySelector(`.js-added-to-this.cartItems-${productId}`)
                .innerHTML = ``
        }, 2000)
    }

    updateCart(productId) {
        const cartQuantity = Number(document.querySelector(`.js-product-quantity-${productId}`).value)
        let totalQuantity = 0
        this.cartItems.forEach((value) => {
            totalQuantity += value.quantity
        })
        document.querySelector('.this.cartItems-quantity')
            .innerHTML = `${totalQuantity}`
    }

    removeCartItems(productID) {
        let newCart = []
        this.cartItems.forEach((cartItems) => {
            if (cartItems.id !== productID) {
                newCart.push(cartItems)
            }
        })
        this.cartItems = newCart
        this.savetostorage()
    }

    updateCartQuantity(productID, newQuantity) {
        this.cartItems.forEach((cartItems) => {
            if (productID === cartItems.id) {
                cartItems.quantity = newQuantity
            }
        })
        this.savetostorage()
    }

    updateDeliveryOption(productID, deliveryOptionId) {
        let matchingItem;
        this.cartItems.forEach((cartItems) => {
            if (productID === cartItems.id) {
                matchingItem = cartItems
            }
        })
        matchingItem.deliveryOptionId = deliveryOptionId;
        this.savetostorage()
    }
};

const cart = new Cart()

const BuisnessCart = new Cart()

cart.loadFromStorage()
BuisnessCart.loadFromStorage()
cart.storageName = 'cart'
BuisnessCart.storageName = 'buisinessCart'
console.log(cart)
console.log(BuisnessCart)