// localStorage.clear();
const cartCatalog = document.querySelector('#cartCatalog')
const cart = document.querySelector('#cart')
const cartListDiv = document.createElement('div')

cartListDiv.style.display = 'flex'
cartListDiv.style.flexWrap = 'wrap'
cartListDiv.style.gap = '15px 16px'


let storedIds = JSON.parse(localStorage.getItem('productIds')) || [];


let cartItemsNumberP = document.querySelector('.cartItemsNumber')

let cartItemsNumberCount = storedIds.length
let numberCartItem = storedIds.length

function updateCartNumber() {
    if (numberCartItem < 1){
        cartItemsNumberP.textContent = 0
    } else {
        cartItemsNumberP.textContent = `+ ${numberCartItem}`
    }
}

updateCartNumber()

function reflectCart() {
    const uniqueIds = [...new Set(storedIds)];
    uniqueIds.forEach(idSingle => {
        // console.log(id)
        fetch(`https://dummyjson.com/products/${idSingle}`)
                      .then(response => response.json())
                      .then((product) =>{
                          const cartItem = document.createElement('div'); // Create an element for each saved item
      
                          const rating = Math.round(product.rating);
                          const stars = starSOlid.repeat(rating) + starNormal.repeat(5 - rating);
                          cartItem.innerHTML = 
                          (`
                            <article class="catalog_sec_sec2_article">
                                <p class="forId" style="display: none;">${product.id}</p>
                                <img id="imagePost" class="catalog_sec_sec2_article_image" src="${product.thumbnail}">
                                <p class="catalog_sec_sec2_article_p">${product.title}</p> 
                                <p class="catalog_sec_sec2_article_p hideDecription">${product.description}</p> 
                                <span class="catalog_sec_sec2_article_span">
                                    <p class="catalog_sec_sec2_article_span_p">${product.price} $</p>
                                    <div class="text-warning">
                                        ${stars}
                                    </div>
                                    <div>
                                        <div class ="cartButtonDiv">
                                            <button class="minusButtonCart">-</button>
                                            <p class="cartItemsNumberPP">${countSingleItem(storedIds, product.id)}</p>
                                        </div>
                                        <i class="fa-sharp fa-solid fa-cart-plus section3_cart addToCart"></i>
                                    </div>
                                </span> 
                            </article>
                        `);
      
                        const minusButtonCart = cartItem.querySelector('.minusButtonCart');
        
                        const cartItemsNumberPP = cartItem.querySelector('.cartItemsNumberPP')
                        let singleCartItemN = countSingleItem(storedIds, product.id)
                        if (singleCartItemN > 0) {
                            minusButtonCart.style.display = 'block'
                        }
                            
                        minusButtonCart.addEventListener('click', (event) => {
                            event.stopPropagation
                
                            let forIdElement = product.id
                            let index = storedIds.indexOf(forIdElement);
                            storedIds = storedIds.slice(0, index)
                            .concat(storedIds.slice(index + 1));
                            localStorage.setItem('productIds', JSON.stringify(storedIds));
                            numberCartItem--
                            updateCartNumber()
                            
                
                            singleCartItemN--
                            cartItemsNumberPP.textContent = singleCartItemN
                            if (singleCartItemN === 0) {
                                minusButtonCart.style.display = 'none'
                                cartCatalog.innerHTML = ''
                                reflectCart()
                            }
                
                        });
                


                        const addToCartButton1 = cartItem.querySelector('.addToCart');
                        addToCartButton1.addEventListener('click', function addToCartButtonEventListener(event){
                            event.stopPropagation();
                
                            let forIdElement = product.id
                            console.log(forIdElement);
                            storedIds.push(forIdElement);  
                            localStorage.setItem('productIds', JSON.stringify(storedIds));
                            numberCartItem ++
                            updateCartNumber()

                            singleCartItemN++

                            minusButtonCart.style.display = 'block'

                            cartItemsNumberPP.textContent = singleCartItemN
    
                        });

                        
    
                        const deleteButton = document.createElement('button')
                        deleteButton.addEventListener('click', () => {
                            storedIds = storedIds.filter(num => num !== idSingle);
                            localStorage.setItem('productIds', JSON.stringify(storedIds));
    
                            cartItem.remove();
    
                            numberCartItem = numberCartItem - singleCartItemN

                            updateCartNumber()
                        })
      
                          deleteButton.style.width = '100%'
                          deleteButton.style.height = '30px'
                          deleteButton.style.cursor = 'pointer'
                          deleteButton.innerHTML = (`
                                    <p>delete</p>
                            `);
      
                          cartItem.appendChild(deleteButton)
      
                          cartCatalog.appendChild(cartItem);
                        });
      
      })
        const backButtonCatalog = document.createElement('button')
        backButtonCatalog.textContent = 'Go Back'
        backButtonCatalog.classList.add('buttons')
        backButtonCatalog.style.cursor = 'pointer'

                                    
        backButtonCatalog.addEventListener("click", () => {
            window.location.href = '../html/catalog.html' 
        })
            
        cartCatalog.appendChild(backButtonCatalog);

}

reflectCart()


function countSingleItem(storage, id) {
    storage = JSON.parse(localStorage.getItem('productIds')) || [];
    let itemCartAmount = storedIds.filter(item => item === id);
    return itemCartAmount.length
}





//Cart search button event listener/////////////////////////////////////////////////////////////////////////////
const searchButtonCart = document.getElementById('searchButtonCart');
const putProductsCart = document.getElementById('putProductsCart');
const magnifyingGlassCart = document.getElementById('magnifyingGlassCart');


const searchDivCart = document.getElementById('searchDivCart');
searchDivCart.style.display = 'none'

let searchButtonCountCart = 0
function searchButtonCartListener(event) {
    event.stopPropagation()
    searchButtonCountCart += 1

    if (searchButtonCountCart % 2 === 1) {
        searchDivCart.style.display = 'flex'
        searchButtonCart.style.width = '200px'

    }else {
    searchDivCart.style.display = 'none'
    searchButtonCart.style.width = '40px'
    }

}

magnifyingGlassCart.addEventListener('click', searchButtonCartListener)


const searchInputCart = document.getElementById('searchInputCart');


let searchValueCart = '';


searchInputCart.addEventListener('keyup', (event) => {
    
    searchValueCart = event.target.value; 
    fetch(`https://dummyjson.com/products/search?q=${searchValueCart}`)
        .then(res => res.json())
        .then(data => {
            putProductsCart.innerHTML = '';
            // console.log(data); 
            let productCountCart = 0
            data.products.forEach(product => {
                productCountCart +=1
                if (productCountCart < 11){
                    const liProduct = document.createElement('button'); 
                    liProduct.textContent = `${product.title}`;
                    putProductsCart.appendChild(liProduct); 

                    liProduct.addEventListener('click', () => {
                        

                        const rating = Math.round(product.rating)
                        const stars = starSOlid.repeat(rating) + starNormal.repeat(5 - rating)


                        cartCatalog.innerHTML = (`
                            <article class="catalog_sec_sec2_article">
                                <p class="forId" style="display: none;">${product.id}</p>
                                <img id="imagePost" class="catalog_sec_sec2_article_image" src="${product.thumbnail}">
                                <p class="catalog_sec_sec2_article_p">${product.title}</p> 
                                <p class="catalog_sec_sec2_article_p hideDecription">${product.description}</p> 
                                <span class="catalog_sec_sec2_article_span">
                                    <p class="catalog_sec_sec2_article_span_p">${product.price} $</p>
                                    <div class="text-warning">
                                        ${stars}
                                    </div>
                                    <div>
                                        <div class ="cartButtonDiv">
                                            <button class="minusButtonCart">-</button>
                                            <p class="cartItemsNumberPP">${countSingleItem(storedIds, product.id)}</p>
                                        </div>
                                        <i class="fa-sharp fa-solid fa-cart-plus section3_cart addToCart"></i>
                                    </div>
                                </span> 
                            </article>
                        `);

                        const minusButtonCart = cartCatalog.querySelector('.minusButtonCart');
        
                        const cartItemsNumberPP = cartCatalog.querySelector('.cartItemsNumberPP')
                        let singleCartItemN = countSingleItem(storedIds, product.id)
                        if (singleCartItemN > 0) {
                            minusButtonCart.style.display = 'block'
                        }
                            
                        minusButtonCart.addEventListener('click', (event) => {
                            event.stopPropagation
                
                            let forIdElement = product.id
                            let index = storedIds.indexOf(forIdElement);
                            storedIds = storedIds.slice(0, index)
                            .concat(storedIds.slice(index + 1));
                            localStorage.setItem('productIds', JSON.stringify(storedIds));
                            numberCartItem--
                            updateCartNumber()
                            
                
                            singleCartItemN--
                            cartItemsNumberPP.textContent = singleCartItemN
                            if (singleCartItemN === 0) {
                                minusButtonCart.style.display = 'none'
                            }
                
                        });
                


                        const addToCartButton1 = cartCatalog.querySelector('.addToCart');
                        addToCartButton1.addEventListener('click', function addToCartButtonEventListener(event){
                            event.stopPropagation();
                
                            let forIdElement = product.id
                            console.log(forIdElement);
                            storedIds.push(forIdElement);  
                            localStorage.setItem('productIds', JSON.stringify(storedIds));
                            numberCartItem ++
                            updateCartNumber()

                            singleCartItemN++

                            minusButtonCart.style.display = 'block'

                            cartItemsNumberPP.textContent = singleCartItemN
    
                        });


                        const backButton = document.createElement('button')
                        backButton.textContent = 'Go Back'
                        backButton.classList.add('buttons')
                        backButton.style.cursor = 'pointer'
    
                                               
                        backButton.addEventListener("click", () => {
                            
                            window.location.href = '../html/cart.html'
                            
                        })
                        cartCatalog.appendChild(backButton);
                        

                    })

                    if (searchValueCart === ""){
                        putProductsCart.innerHTML = '';
        
                    }

                    searchInputCart.addEventListener('input', () => {
                        if (searchInputCart.value === "") {
                            putProductsCart.innerHTML = ''; // Clear the product suggestions
                        }
                    });
                }
                
            });

            
})
});






