const cartCatalog = document.querySelector('#cartCatalog')
const cart = document.querySelector('#cart')
const cartListDiv = document.createElement('div')

cartListDiv.style.display = 'flex'
cartListDiv.style.flexWrap = 'wrap'
cartListDiv.style.gap = '15px 16px'


let storedIds = JSON.parse(localStorage.getItem('productIds')) || [];

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

                    const deleteButton = document.createElement('button')
                    deleteButton.addEventListener('click', () => {
                      storedIds = storedIds.filter((id) => id !== idSingle);
                      localStorage.setItem('productIds', JSON.stringify(storedIds));

                          // Remove the item from the DOM
                          cartItem.remove();
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
  
    
    
    if (productsDivCatalog.contains(backButtonCatalog)){
      productsDivCatalog.removeChild(backButtonCatalog);

    }
    
    window.location.href = '../html/catalog.html' 
    
    

})
      
cartCatalog.appendChild(backButtonCatalog);











  


