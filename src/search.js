////////////////////////////////////////////////////////////

const searchButton = document.getElementById('searchButton');
const putProducts = document.getElementById('putProducts');
const magnifyingGlass = document.getElementById('magnifyingGlass');


let searchButtonCount = 0
function searchButtonListener(event) {
    event.stopPropagation()
    searchButtonCount += 1

    if (searchButtonCount % 2 === 1) {
        searchDiv.style.display = 'flex'
        searchButton.style.width = '200px'

    }else {
    searchDiv.style.display = 'none'
    searchButton.style.width = '40px'
    }

}

magnifyingGlass.addEventListener('click', searchButtonListener)

// const putProducts = document.getElementById('putProducts');
const searchDiv = document.getElementById('searchDiv');
searchDiv.style.display = 'none'

const searchInput = document.getElementById('searchInput');

// Variable to store the input value
let searchValue = '';

//catalog page Listen for the 'input' event  
searchInput.addEventListener('keyup', (event) => {
    
    searchValue = event.target.value; 
    fetch(`https://dummyjson.com/products/search?q=${searchValue}`)
        .then(res => res.json())
        .then(data => {
            putProducts.innerHTML = '';
            // console.log(data); 
            let productCount = 0
            data.products.forEach(product => {
                productCount +=1
                if (productCount < 11){
                    const liProduct = document.createElement('button'); 
                    liProduct.textContent = `${product.title}`;
                    putProducts.appendChild(liProduct); 

                    liProduct.addEventListener('click', () => {


                        buttonSection.style.display = 'none'
                        sortSection.style.display = "none"
                        filter.style.display = "none"

                        const rating = Math.round(product.rating)
                        const stars = starSOlid.repeat(rating) + starNormal.repeat(5 - rating)

                        productsDivCatalog.innerHTML = (`
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

                        const minusButtonCart = productsDivCatalog.querySelector('.minusButtonCart');
        
                        const cartItemsNumberPP = productsDivCatalog.querySelector('.cartItemsNumberPP')
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
                


                        const addToCartButton1 = productsDivCatalog.querySelector('.addToCart');
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
                            
                            sortSection.style.display = "flex"
                            filter.style.display = "flex"
                    
                            if (productsDivCatalog.contains(backButton)){
                                productsDivCatalog.removeChild(backButton);

                            }
                            productsDivCatalog.innerHTML = ('')
                            
                            
                            fetch(`https://dummyjson.com/products/category/${product.category}`)
                            .then(res => res.json())
                            .then(category => {
                                putProducts.innerHTML = '';
                                productsDivCatalog.innerHTML = ''
                                createProduct(category, 0, category.length, productsDivCatalog, api=`${category.category}`)
                                
                            });

                        })
                        productsDivCatalog.appendChild(backButton);
                        searchValue = ""

                    })

                    

                    searchInput.addEventListener('input', () => {
                        if (searchInput.value === "") {
                            putProducts.innerHTML = ''; // Clear the product suggestions
                        }
                    });

                    if (searchValue === ""){
                        putProducts.innerHTML = '';
        
                    }
                }
                
            });            
        })
});




