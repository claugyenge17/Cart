const products = [
    {
        'id': 1,
        'img':'https://cdn.dodostatic.net/static/Img/Products/c4bb774e6f654f239b79032c60e8fcd4_292x292.jpeg',
        'nume': 'Fiesta',
        'continut': 'Piept de pui, mozzarella, ceapă roșie, ardei gras, roșii proaspete, salam chorizo, sos chipotle, sos ranch, usturoi granulat',
        'pret': 29.9,
        'qty' : 1
    },
    {
        'id': 2,
        'img':'https://cdn.dodostatic.net/static/Img/Products/c4bb774e6f654f239b79032c60e8fcd4_292x292.jpeg',
        'nume': 'Margherita Classic',
        'continut': 'Mozzarella, sos de roșii',
        'pret': 29.9,
        'qty' : 1
    },
    {
        'id': 3,
        'img':'https://cdn.dodostatic.net/static/Img/Products/c4bb774e6f654f239b79032c60e8fcd4_292x292.jpeg',
        'nume': 'Dracula',
        'continut': 'Sos de roșii, salam chorizo, ardei jalapeno, salam pepperoni, mozzarella, sos chipotle',
        'pret': 29.9,
        'qty' : 1
    },
    {
        'id': 4,
        'img':'https://cdn.dodostatic.net/static/Img/Products/c4bb774e6f654f239b79032c60e8fcd4_292x292.jpeg',
        'nume': 'Quattro',
        'continut': 'Piept de pui, șuncă, ceapă roșie, mozzarella, ardei gras, sos de roșii, porumb',
        'pret': 29.9,
        'qty' : 1
    },
    /////////////////test overflow
    // {
    //     'id': 5,
    //     'img':'https://cdn.dodostatic.net/static/Img/Products/c4bb774e6f654f239b79032c60e8fcd4_292x292.jpeg',
    //     'nume': 'Hawaii',
    //     'continut': 'Piept de pui, șuncă, ceapă roșie, mozzarella, ardei gras, sos de roșii, porumb',
    //     'pret': 41.9,
    //     'qty' : 1
    // },
    // {
    //     'id': 6,
    //     'img':'https://cdn.dodostatic.net/static/Img/Products/c4bb774e6f654f239b79032c60e8fcd4_292x292.jpeg',
    //     'nume': 'Rustica HOT',
    //     'continut': 'Piept de pui, șuncă, ceapă roșie, mozzarella, ardei gras, sos de roșii, porumb',
    //     'pret': 27.54,
    //     'qty' : 1
    // }
];

const recommendedProducts = [
    {
        'id': 1,
        'img':'	https://cdn.dodostatic.net/static/Img/Products/56cd0d182ef64b9aab195324f35a4928_138x138.png',
        'nume': 'BBQ Dodster',
        'pret': 14.9,
     
    },
    {
        'id': 2,
        'img':'https://cdn.dodostatic.net/static/Img/Products/6c76c8795f4e443399549cc9d11677f3_138x138.png',
        'nume': 'Latte 200ml',
        'pret': 5.9,
    },
    {
        'id': 3,
        'img':'https://cdn.dodostatic.net/static/Img/Products/1e51b265b34a4271988f7a34bc96fdcc_138x138.png',
        'nume': 'Starter Carne',
        'pret': 13.9,
    },
    {
        'id': 4,
        'img':'https://cdn.dodostatic.net/static/Img/Products/c720c5cc73134fbe9855741eaf29e238_138x138.png',
        'nume': 'Lava Cake',
        'pret': 18.9,
    }
];

function openCart() {
    getProductDetails()
    numberOfProducts()
    getRecommendedProducts()
    const cart = document.querySelector("#myCart");
    const cartOverlay = document.querySelector("#cartOverlay");
    const closeBtn = document.querySelector(".close-btn")
    if(cart.style.transform === 'translateX(430px)'){
        closeBtn.style.display = 'block'
        cart.style.transform = 'translateX(0px)'
        cartOverlay.classList.replace("overlay-hide", "overlay-show")
    }
}

function closeCart() {
    const emptyCart = document.querySelector("#empty")
    emptyCart.classList.remove('empty-cart-hide')
    emptyCart.innerHTML=""
    cartBtnInfo()
    const cart = document.querySelector("#myCart");
    const cartOverlay = document.querySelector("#cartOverlay");
    const closeBtn = document.querySelector(".close-btn")
    if(cart.style.transform === 'translateX(0px)'){
        closeBtn.style.display = 'none'
        cart.style.transform = 'translateX(430px)'
        cartOverlay.classList.replace("overlay-show", "overlay-hide")
    }
}

function addToCart(){
    const emptyCart = document.querySelector("#empty")
    emptyCart.classList.remove('empty-cart-shown')
    emptyCart.innerHTML = ""
    const productsInCart = products.slice(0, 3);
    // const productsInCart = products.slice(0, 5); test overflow
    localStorage.setItem('cart', JSON.stringify(productsInCart))
}

function removeFromCart(){
    const emptyCart = document.querySelector("#empty")
    emptyCart.classList.remove('empty-cart-hide')
    emptyCart.innerHTML= ""
    localStorage.removeItem('cart')
    cartBtnInfo()
}

const CURRENCY_FORMATTER = new Intl.NumberFormat('RO', { 
    style: 'currency',
    currency: 'lei'
})

const DODO_FORMATTER = new Intl.NumberFormat('RO', { 
    style: 'currency',
    currency: 'lei',
    currencyDisplay: 'code'
})

function minimumOrderAmount(amount){
    return document.querySelector("#minimumAmount").innerHTML = CURRENCY_FORMATTER.format(amount)
}

function increaseProdQty(id){
    const productsInCart = localStorage.getItem('cart') != null ? JSON.parse(localStorage.getItem('cart')) : []
    if(productsInCart.find(item => item.id === id) == null){
        return localStorage.setItem('cart', JSON.stringify([...productsInCart, { id, qty: 1 }]))
    } else {
        const updatedProductsInCart = productsInCart.map(item => {
            if(item.id === id) {
                numberOfProducts()
                return {...item, qty: item.qty + 1}
            } else {
                return item
            }
        })
        return localStorage.setItem('cart', JSON.stringify(updatedProductsInCart)) && getProductDetails()
    }
}

function decreaseProdQty(id){
    const productsInCart = localStorage.getItem('cart') != null ? JSON.parse(localStorage.getItem('cart')) : []
    if(productsInCart.find(item => item.id === id).qty === 1){
        numberOfProducts()
        return localStorage.setItem('cart', JSON.stringify(productsInCart.filter(item => item.id !== id)))
    } else {
        const updatedProductsInCart = productsInCart.map(item => {
            if(item.id === id) {
                numberOfProducts()
                return {...item, qty: item.qty - 1}
            } else {
                return item
            }
        })
        return localStorage.setItem('cart', JSON.stringify(updatedProductsInCart)) && getProductDetails()
    }
}

function removeIndividualProdFromCart(id){
    const productsInCart = localStorage.getItem('cart') != null ? JSON.parse(localStorage.getItem('cart')) : []
    const updatedProductsInCart = productsInCart.filter(item => item.id !== id)
    numberOfProducts()
    return localStorage.setItem('cart', JSON.stringify(updatedProductsInCart)) && getProductDetails()
}

function numberOfProducts(){
    const productsInCart = localStorage.getItem('cart') != null ? JSON.parse(localStorage.getItem('cart')) : []
    if(productsInCart.length > 0) {
        const numberOfProductsInCart = productsInCart.reduce((qty, product) => product.qty + qty, 0)
        const cartTitle = document.querySelector('.cart-title-info')
        const productsInCartSpan = document.querySelector('#productsInCart')
        const cartSubtotal = document.querySelector('#productsInCartSubtotal')
        const dodoCoins = document.querySelector('#dodoCoins')
        const totalDiv = document.querySelector('#totalCart')
        const deliveryCost = document.querySelector('#cartDeliveryPrice')
        const prod = productsInCart.length >= 1 ? ' produse'  : ' produs'
        cartTitle.innerHTML = numberOfProductsInCart + ' produse în valoare de '+ CURRENCY_FORMATTER.format(subtotal()).replace('LEI', 'lei').trim()
        productsInCartSpan.innerHTML = numberOfProductsInCart + prod
        cartSubtotal.innerHTML = CURRENCY_FORMATTER.format(subtotal()).replace('LEI', 'lei').trim()
        dodoCoins.innerHTML = '+' + DODO_FORMATTER.format(numberOfProductsInCart * 2).replace('LEI', '').trim()
        deliveryCost.innerHTML = CURRENCY_FORMATTER.format(4.90).replace('LEI', 'lei').trim()
        totalDiv.innerHTML = total()
    }
}
function subtotal(){
    const productsInCart = localStorage.getItem('cart') != null ? JSON.parse(localStorage.getItem('cart')) : []
    return productsInCart.reduce((pret, product) => product.pret * product.qty + pret, 0)
}

function total(){
    const total = document.querySelector('#totalCart')
    const totalPriceInCart = CURRENCY_FORMATTER.format(subtotal() + 4.90).replace('LEI', 'lei').trim()
    return total.innerHTML = totalPriceInCart
}

function individualProdPrice(id){
    const cartProducts = localStorage.getItem('cart') !== null ? JSON.parse(localStorage.getItem("cart")) : []
    const individualProd = cartProducts.find(item => item.id === id)
    if(individualProd){
        return individualProd.qty * individualProd.pret
    }
}

function getRecommendedProducts(){
    const productsInCart = localStorage.getItem('cart') != null ? JSON.parse(localStorage.getItem('cart')) : []
    const recommendedProductContainer = document.querySelector("#recommendedSlider")
    if(productsInCart.length > 0) {
        const mappedRecommendedProducts = recommendedProducts.map((product) => {
            return`<div class="recommended-slider-product-container" id="slider-${product.id}" key=${product.id}>
                        <div class="recommended-slider-product-container-info">
                            <div class="recommended-slider-product-img-container">
                                <div class="recommended-slider-product-img">
                                    <img src=${product.img} alt=${product.nume}/>
                                </div>
                            </div>
                            <div class="recommended-slider-product-title-price-container">
                                <h2 class="recommended-slider-product-title">${product.nume}</h2>
                                <div class="recommended-slider-product-price">${CURRENCY_FORMATTER.format(product.pret).replace('LEI', 'lei').trim()}</div>
                            </div>
                        </div>
                    </div>`
        }).join('')

        recommendedProductContainer.innerHTML = mappedRecommendedProducts
    }
}

    document.addEventListener('DOMContentLoaded', ()=>{
        cartBtnInfo()
    })

    function cartBtnInfo(){
        const cartProducts = localStorage.getItem('cart') !== null ? JSON.parse(localStorage.getItem("cart")) : []
        const cartOpenBtn = document.querySelector('.open-cart-btn')
        const cartBtnQty = document.querySelector('#cartBtnQty')
        const cartBtnArrow = document.querySelector('.cart-btn-qty-info-hide')
        const numberOfProductsInCart = cartProducts.reduce((qty, product) => product.qty + qty, 0)
        cartBtnQty.innerHTML = numberOfProductsInCart

        cartOpenBtn.addEventListener('mouseover', ()=>{
            if(cartBtnQty.classList.contains('cart-btn-qty')){
                cartBtnQty.classList.remove('cart-btn-qty')
                cartBtnQty.classList.add('cart-btn-qty-hide')
                cartBtnArrow.classList.remove('cart-btn-qty-info-hide')
                cartBtnArrow.classList.add('cart-btn-qty-info')
            } 
        })

        cartOpenBtn.addEventListener('mouseleave', ()=>{
            if(cartBtnArrow.classList.contains('cart-btn-qty-info')){
                cartBtnArrow.classList.remove('cart-btn-qty-info')
                cartBtnArrow.classList.add('cart-btn-qty-info-hide')
                cartBtnQty.classList.remove('cart-btn-qty-hide')
                cartBtnQty.classList.add('cart-btn-qty')
                
            }
        })
    }


function getProductDetails(){
    const cartProducts = localStorage.getItem('cart') !== null ? JSON.parse(localStorage.getItem("cart")) : []
    const emptyCart = document.querySelector("#empty")
    const notEmpty = document.querySelector("#notEmpty")
    const productContainer = document.querySelector("#product")

    if(cartProducts.length > 0){
        emptyCart.classList.remove('empty-cart-shown')
        emptyCart.classList.add('empty-cart-hide')
        notEmpty.classList.remove('noEmpty-hide')
        notEmpty.classList.add('noEmpty-shown')
    
        const mappedCartProducts = cartProducts.map((product) => {
            return `<div class="cart-product" key=${product.id}>
                        <div class="cart-prod-upper">
                            <div class="product-image">
                                <img src=${product.img} alt=${product.nume}/>
                            </div>
                            <div class="prod-info-text">
                                <div class="product-name">${product.nume}</div>
                                <div class="product-description"><span>${product.continut}</span></div>
                            </div>
                            <button class="remove-prod-btn" onclick=removeIndividualProdFromCart(${product.id})></button>
                        </div>
                        <div class="prod-info-price-qty">
                            <div class="product-price">${CURRENCY_FORMATTER.format(individualProdPrice(product.id)).replace('LEI', 'lei').trim()}</div>
                            <div class="product-qty-container">
                                <div class="product-quantity">
                                    <button class="decrease-qty" onclick=decreaseProdQty(${product.id})></button>
                                    <span id="product-quantity" class="qty">${product.qty}</span>
                                    <button class="increase-qty" onclick=increaseProdQty(${product.id})></button>
                                </div>
                            </div>
                        </div>
                    </div>`
        }).join('')

        productContainer.innerHTML = mappedCartProducts
        
    } else {
        emptyCart.innerHTML=""
        notEmpty.classList.remove('noEmpty-shown')
        notEmpty.classList.add('noEmpty-hide')
        emptyCart.classList.remove('empty-cart-hide')
        emptyCart.classList.add('empty-cart-shown')
        if(emptyCart.classList.contains('empty-cart-shown')){
            const emptyCartDiv = document.createElement("div")
            const emptyCartImgDiv = document.createElement("div")
            const h2 = document.createElement("h2")
            const emptyCartInfoDiv = document.createElement("div")
            const firstSpan = document.createElement("span")
            const secondSpan = document.createElement("span")
            
            emptyCartDiv.classList.add("empty-cart")
            emptyCartImgDiv.classList.add("empty-cart-img")
            emptyCartInfoDiv.classList.add("empty-cart-info")
            h2.textContent = "Of, e gol!"
            firstSpan.textContent = "Pentru livrare, comanda minimă este "
            secondSpan.setAttribute("id", "minimumAmount")
            secondSpan.classList.add("suma-minima")
            emptyCartInfoDiv.appendChild(firstSpan)
            emptyCartInfoDiv.appendChild(secondSpan)
            emptyCartDiv.appendChild(emptyCartImgDiv)
            emptyCartDiv.appendChild(h2)
            emptyCartDiv.appendChild(emptyCartInfoDiv)

            return emptyCart.appendChild(emptyCartDiv) && minimumOrderAmount(34.90)
        }
        
    }
}


document.addEventListener('click', event => {
    const notEmpty = document.querySelector("#notEmpty")
    const cart = document.querySelector("#myCart");
    const dodoTooltipBtn = document.querySelector("#dodoCoinsTooltipBtn")
    const dodoTooltipDiv = document.querySelector("#dodoCoinsTooltip")
    const deliveryTooltipBtn = document.querySelector("#deliveryTooltipBtn")
    const deliveryTooltipDiv = document.querySelector("#deliveryTooltip")
    const promoInput = document.querySelector("#inputPromo")
    const promoInputContainer = document.querySelector('.promo-input-container')
    const addProducts = document.querySelector('.load-prods-btn')
    const slider = document.querySelector('.recommended-slider-container');
    const leftSliderArrow = document.querySelector('#leftSlide')
    const rightSliderArrow = document.querySelector('#rightSlide')
    const isFocused = promoInput?.contains(event.target)
    const isClickedInDodoTooltipBtn = dodoTooltipBtn?.contains(event.target)
    const isClickedInDeliveryTooltipBtn = deliveryTooltipBtn?.contains(event.target)
    const isClickedInCart = cart.contains(event.target)
    const isClickedLoadProducts = addProducts.contains(event.target)
    
    if(isClickedInCart && notEmpty.classList.contains('noEmpty-shown')){
        getProductDetails()
        numberOfProducts()
        cartBtnInfo()
        
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
        });

        slider.addEventListener('mousemove', (e) => {
            if(!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX); //scroll-fast
            var prevScrollLeft = slider.scrollLeft;
            slider.scrollLeft = scrollLeft - walk;
            velX = slider.scrollLeft - prevScrollLeft;
        });
        
        leftSliderArrow.addEventListener("mousedown", () => {
            window.requestAnimationFrame(() => {
                slider.scrollTo({ top: 0, left: slider.scrollLeft - 259, behavior: "smooth" });
            });
        });

        rightSliderArrow.addEventListener("mousedown", () => {
            window.requestAnimationFrame(() => {
                slider.scrollTo({ top: 0, left: slider.scrollLeft + 259, behavior: "smooth" });
            });
        });
    }
    
    if(isClickedLoadProducts){
        cartBtnInfo()
    }

    if(isClickedInDodoTooltipBtn){
        if(dodoTooltipDiv.classList.contains('dodo-tooltip-shown')){
            dodoTooltipDiv.classList.remove('dodo-tooltip-shown')
        } else {
            dodoTooltipDiv.classList.add('dodo-tooltip-shown')
        }
    } else {
        dodoTooltipDiv?.classList.remove('dodo-tooltip-shown')
    }

    if(isClickedInDeliveryTooltipBtn){
        if(deliveryTooltipDiv.classList.contains('delivery-tooltip-shown')){
            deliveryTooltipDiv.classList.remove('delivery-tooltip-shown')
        } else {
            deliveryTooltipDiv.classList.add('delivery-tooltip-shown')
        }
    } else {
        deliveryTooltipDiv?.classList.remove('delivery-tooltip-shown')
    }

    
    if(isFocused){
        const applyPromoBtn = document.createElement('a')
        applyPromoBtn.classList.add('apply-btn-shown')
        applyPromoBtn.innerText = "Aplică"
        return promoInputContainer.appendChild(applyPromoBtn)
    } 
    else {
        const applyPromoBtn = document.querySelector('.apply-btn-shown')
        if(applyPromoBtn){
            return applyPromoBtn.remove()
        }
    } 
})