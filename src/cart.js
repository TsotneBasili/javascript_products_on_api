// localStorage.clear();


const cartCatalog = document.querySelector('#cartCatalog')
const cart = document.querySelector('#cart')
const cartListDiv = document.createElement('div')

cartListDiv.style.display = 'flex'
cartListDiv.style.flexWrap = 'wrap'
cartListDiv.style.gap = '15px 16px'


let storedIds = JSON.parse(localStorage.getItem('productIds')) || [];

// cart item count 
// let storedIds2 = JSON.parse(localStorage.getItem('productIds')) || [];

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
    storedIds.forEach(idSingle => {
        // console.log(id)
        fetch(`https://dummyjson.com/products/${idSingle}`)
                      .then(response => response.json())
                      .then((product) =>{
                          const cartItem = document.createElement('div'); // Create an element for each saved item
      
                          const rating = Math.round(product.rating);
                          const stars = starSOlid.repeat(rating) + starNormal.repeat(5 - rating);
                          cartItem.innerHTML = (`
                            <article class="catalog_sec_sec2_article">
                                <img id="imagePost" class="catalog_sec_sec2_article_image" src="${product.thumbnail}">
                                <p class="catalog_sec_sec2_article_p">${product.title}</p> 
                                <span class="catalog_sec_sec2_article_span">
                                    <p class="catalog_sec_sec2_article_span_p">${product.price} $</p>
                                    <div class="text-warning">
                                        ${stars}
                                    </div>
                                    <i class="fa-sharp fa-solid fa-cart-plus section3_cart addToCart"></i>
                                </span> 
                            </article>
                          `); 
      
      
                          //damushaveba unda cartshi damatebuls ro vamateb kide shignit cartshive mere ertis washlisas meoresac shlis
                          const addToCartButton1 = cartItem.querySelector('.addToCart');
                          addToCartButton1.addEventListener('click', function addToCartButtonEventListener(event){
                              event.stopPropagation();
                  
                              let forIdElement = product.id
                              console.log(forIdElement);
                              storedIds.push(forIdElement);  
                              localStorage.setItem('productIds', JSON.stringify(storedIds));
                              numberCartItem ++
                              updateCartNumber()

                              cartCatalog.innerHTML = ''
                            //   cartCatalog.appendChild(backButtonCatalog);

                              reflectCart()
      
                          });
      
      
                          const deleteButton = document.createElement('button')
                          deleteButton.addEventListener('click', () => {
                              storedIds = storedIds.slice(0, storedIds.indexOf(idSingle))
                              .concat(storedIds.slice(storedIds.indexOf(idSingle) + 1));
                              localStorage.setItem('productIds', JSON.stringify(storedIds));
      
                              // Remove the item from the DOM
                              cartItem.remove();
      
                              numberCartItem --

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
                                <img class="catalog_sec_sec2_article_image" src="${product.thumbnail}">
                                <p class="catalog_sec_sec2_article_p">${product.title}</p> 
                                <span class="catalog_sec_sec2_article_span">
                                    <p class="catalog_sec_sec2_article_span_p">${product.price} $</p>
                                    <div class="text-warning">
                                        ${stars}
                                    </div>
                                    <i class="fa-sharp fa-solid fa-cart-plus section3_cart addToCart"></i>
                                </span> 
                            </article>
                        `);

                        const addToCartButton = cartCatalog.querySelector('.addToCart');
                        addToCartButton.addEventListener('click', function addToCartButtonEventListener(event){
                            // event.stopPropagation();
                
                            let forIdElement = product.id
                            console.log(forIdElement);
                            storedIds.push(forIdElement);  //// aq und agaaketo ro ricxvi moematos ukve damatebuls 
                            localStorage.setItem('productIds', JSON.stringify(storedIds));
                            numberCartItem ++
                            updateCartNumber()
                        });

                        // sign_in_form_sec.style.width = '400px'

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
                }
                
            });

            
})
});


////cart count


  cartItemsNumber111.textContent = (`<p>asdasdasdasd</p>`)


