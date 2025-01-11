//home page event listener/////////////////////////////////////////////////////////////////////////////
const searchButtonHome = document.getElementById('searchButtonHome');
const putProductsHome = document.getElementById('putProductsHome');
const magnifyingGlassHome = document.getElementById('magnifyingGlassHome');


const searchDivHome = document.getElementById('searchDivHome');
searchDivHome.style.display = 'none'

let searchButtonCountHome = 0
function searchButtonHomeListener(event) {
    event.stopPropagation()
    searchButtonCountHome += 1

    if (searchButtonCountHome % 2 === 1) {
        searchDivHome.style.display = 'flex'
        searchButtonHome.style.width = '200px'

    }else {
    searchDivHome.style.display = 'none'
    searchButtonHome.style.width = '40px'
    }

}

magnifyingGlassHome.addEventListener('click', searchButtonHomeListener)

const searchInputHome = document.getElementById('searchInputHome');

let searchValueHome = '';

searchInputHome.addEventListener('keyup', (event) => {
    
    searchValueHome = event.target.value; 
    fetch(`https://dummyjson.com/products/search?q=${searchValueHome}`)
        .then(res => res.json())
        .then(data => {
            putProductsHome.innerHTML = '';
            // console.log(data); 
            let productCountHome = 0
            data.products.forEach(product => {
                productCountHome +=1
                if (productCountHome < 11){
                    const liProduct = document.createElement('button'); 
                    liProduct.textContent = `${product.title}`;
                    putProductsHome.appendChild(liProduct); 

                    liProduct.addEventListener('click', () => {
                        const home_section1 = document.querySelector('.home_section1')
                        home_section1.style.display= 'none'

                        const rating = Math.round(product.rating)
                        const stars = starSOlid.repeat(rating) + starNormal.repeat(5 - rating)

                        productsDivHome.innerHTML = (`
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

                        const addToCartButton = productsDivHome.querySelector('.addToCart');
                        addToCartButton.addEventListener('click', function addToCartButtonEventListener(event){
                            // event.stopPropagation();
                
                            let forIdElement = product.id
                            console.log(forIdElement);
                            storedIds.push(forIdElement);  //// aq und agaaketo ro ricxvi moematos ukve damatebuls 
                            localStorage.setItem('productIds', JSON.stringify(storedIds));
                            numberCartItem ++
                            updateCartNumber()
                        });

                        const backButton = document.createElement('button')
                        backButton.textContent = 'Go Back'
                        backButton.classList.add('buttons')
                        backButton.style.cursor = 'pointer'
    
                                               
                        backButton.addEventListener("click", () => {
                            home_section1.style.display= 'flex'
                            
                            
                            if (productsDivHome.contains(backButton)){
                                productsDivHome.removeChild(backButton);

                            }
                            productsDivHome.innerHTML = ('')
                            
                            
                            fetch(`https://dummyjson.com/products?limit=4`)
                            .then(res => res.json())
                            .then(category => {
                                putProductsHome.innerHTML = '';

                                productsDivHome.innerHTML = ''
                                createProduct(category, 0, 4, productsDivHome, 'default')
                                
                            });

                        })
                        productsDivHome.appendChild(backButton);
                        

                    })

                    if (searchValueHome === ""){
                        putProductsHome.innerHTML = '';
        
                    }
                }
                
            });

            
})
});


