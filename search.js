// fetch('https://dummyjson.com/products/search?q=phone')
// .then(res => res.json())
// .then(console.log);


const searchButton = document.getElementById('searchButton');
const putProducts = document.getElementById('putProducts');
const magnifyingGlass = document.getElementById('magnifyingGlass');


let searchButtonCount = 0
function searchButtonListener() {
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

// Listen for the 'input' event
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
                        console.log(liProduct)

                        buttonSection.style.display = 'none'
                        sortSection.style.display = "none"
                        filter.style.display = "none"

                        const rating = Math.round(product.rating)
                        const stars = starSOlid.repeat(rating) + starNormal.repeat(5 - rating)

                        productsDivCatalog.innerHTML = (`
                            <article class="catalog_sec_sec2_article">
                                <img class="catalog_sec_sec2_article_image" src="${product.thumbnail}">
                                <p class="catalog_sec_sec2_article_p">${product.title}</p> 
                                <span class="catalog_sec_sec2_article_span">
                                    <p class="catalog_sec_sec2_article_span_p">${product.price} $</p>
                                    <div class="text-warning">
                                        ${stars}
                                    </div>
                                    <i class="fa-sharp fa-solid fa-cart-plus section3_cart"></i>
                                </span> 
                            </article>
                        `);

                        const backButton = document.createElement('button')
                        backButton.textContent = 'Go Back'
                        backButton.classList.add('.buttons')
                        backButton.style.cursor = 'pointer'
    
                                               
                        backButton.addEventListener("click", () => {
                            
                            sortSection.style.display = "flex"
                            filter.style.display = "flex"
                                
                            productsDivCatalog.removeChild(backButton);
                            productsDivCatalog.innerHTML = ('')
                            
                            
                            fetch(`https://dummyjson.com/products/category/${product.category}`)
                            .then(res => res.json())
                            .then(category => {
                                productsDivCatalog.innerHTML = ''
                                createProduct(category, 0, category.length, productsDivCatalog, api=`${category.category}`)
                                
                            });

                        })
                        productsDivCatalog.appendChild(backButton);
                        

                    })

                    if (searchValue === ""){
                        putProducts.innerHTML = '';
        
                    }
                }
                
            });

            
})
});

putProducts.innerHTML = '';




