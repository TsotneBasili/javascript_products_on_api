//contact page event listener/////////////////////////////////////////////////////////////////////////////
const searchButtonContact = document.getElementById('searchButtonContact');
const putProductsContact = document.getElementById('putProductsContact');
const contactFormSection = document.getElementById('contactFormSection');
const magnifyingGlassContact = document.getElementById('magnifyingGlassContact');


const searchDivContact = document.getElementById('searchDivContact');
searchDivContact.style.display = 'none'

let searchButtonCountContact = 0
function searchButtonContactListener(event) {
    event.stopPropagation()
    searchButtonCountContact += 1

    if (searchButtonCountContact % 2 === 1) {
        searchDivContact.style.display = 'flex'
        searchButtonContact.style.width = '200px'

    }else {
    searchDivContact.style.display = 'none'
    searchButtonContact.style.width = '40px'
    }

}

magnifyingGlassContact.addEventListener('click', searchButtonContactListener)



const searchInputContact = document.getElementById('searchInputContact');





let searchValueContact = '';




searchInputContact.addEventListener('keyup', (event) => {
    
    searchValueContact = event.target.value; 
    fetch(`https://dummyjson.com/products/search?q=${searchValueContact}`)
        .then(res => res.json())
        .then(data => {
            putProductsContact.innerHTML = '';
            // console.log(data); 
            let productCountContact = 0
            data.products.forEach(product => {
                productCountContact +=1
                if (productCountContact < 11){
                    const liProduct = document.createElement('button'); 
                    liProduct.textContent = `${product.title}`;
                    putProductsContact.appendChild(liProduct); 

                    liProduct.addEventListener('click', () => {
                        const rating = Math.round(product.rating)
                        const stars = starSOlid.repeat(rating) + starNormal.repeat(5 - rating)

                        contactFormSection.innerHTML = (`
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

                        const minusButtonCart = contactFormSection.querySelector('.minusButtonCart');
        
                        const cartItemsNumberPP = contactFormSection.querySelector('.cartItemsNumberPP')
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
                


                        const addToCartButton1 = contactFormSection.querySelector('.addToCart');
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
                        backButton.style.height = '100%'
    
                                               
                        backButton.addEventListener("click", () => {
                            
                            window.location.href = '../html/contact.html'
                            
                           

                        })
                        contactFormSection.appendChild(backButton);
                        

                    })

                    if (searchValueContact === ""){
                        putProductsContact.innerHTML = '';
        
                    }
                }
                
            });

            
})
});


