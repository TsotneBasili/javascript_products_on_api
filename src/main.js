const starSOlid = `<i class="fa-solid fa-star"></i>`;
const starNormal = `<i class="fa-regular fa-star"></i>`;

const pageCount = document.querySelector('#pageCount')

// sort_filter_sections
const sortSection = document.querySelector('#sort_by')
const filterSection = document.querySelector('#filter')


//buttonsection
const buttonSection = document.querySelector('#buttonSection')
const prevButtonSection = document.querySelector('#prevButtonSection')

//popular
const next = document.querySelector('#nextButton')


// asc button
const nextAsc = document.createElement('button')
nextAsc.id ='nextAsc'
nextAsc.classList.add('catalog_sec_sec3_button2')
nextAsc.innerHTML = `
    <span class = "catalog_next_prev_none">Next</span>
    <img src="../images/catalog_images/iconamoon_arrow-right-2-duotone.svg" alt="">
`;

const prevAsc = document.createElement('button')
prevAsc.id ='prevAsc'
prevAsc.classList.add('catalog_sec_sec3_button1')
prevAsc.innerHTML = `
    <img src="../images/catalog_images/iconamoon_arrow-left-2-duotone.svg" alt="">
    <span class = "catalog_next_prev_none">Previous</span>
`;


//desc
const nextDesc = document.createElement('button')
nextDesc.id ='nextDesc'
nextDesc.classList.add('catalog_sec_sec3_button2')
nextDesc.innerHTML = `
    <span class = "catalog_next_prev_none">Next</span>
    <img src="../images/catalog_images/iconamoon_arrow-right-2-duotone.svg" alt="">
`;

const prevDesc = document.createElement('button')
prevDesc.id ='prevDesc'
prevDesc.classList.add('catalog_sec_sec3_button1')
prevDesc.innerHTML = `
    <img src="../images/catalog_images/iconamoon_arrow-left-2-duotone.svg" alt="">
    <span class = "catalog_next_prev_none">Previous</span>
`;


// creating product div
function createProduct1(div, product1) {
    const rating = Math.round(product1.rating);
    const stars = starSOlid.repeat(rating) + starNormal.repeat(5 - rating);
    div.innerHTML = (`
        <article class="catalog_sec_sec2_article">
            <p class="forId" style="display: none;">${product1.id}</p>
            <img id="imagePost" class="catalog_sec_sec2_article_image" src="${product1.thumbnail}">
            <p class="catalog_sec_sec2_article_p">${product1.title}</p> 
            <p class="catalog_sec_sec2_article_p hideDecription">${product1.description}</p> 
            <span class="catalog_sec_sec2_article_span">
                <p class="catalog_sec_sec2_article_span_p">${product1.price} $</p>
                <div class="text-warning">
                    ${stars}
                </div>
                <div>
                    <div class ="cartButtonDiv">
                        <button class="minusButtonCart">-</button>
                        <p class="cartItemsNumberPP">${countSingleItem(storedIds, product1.id)}</p>
                    </div>
                    <i class="fa-sharp fa-solid fa-cart-plus section3_cart addToCart"></i>
                </div>
            </span> 
        </article>
    `);
    
}


function createProduct(dataPassed, page, productPerPage, div, api = 'default') {
    let cartHovered = false; // Flag to track if the cart is being hovered

    dataPassed.products.forEach(product => {
        const productDiv = document.createElement('div');

        createProduct1(productDiv, product)

        function productDiveventListener(event) {
            if (cartHovered) return; // If cart is hovered, block interaction
            if (div === productsDivCatalog) {
                buttonSection.style.display = "none";
                sortSection.style.display = "none";
                filterSection.style.display = "none";
            }
            fetch(`https://dummyjson.com/products/${product.id}`)
                .then(response => response.json())
                .then((product) => {
                    const backButton = document.createElement('button');
                    backButton.textContent = 'Go Back';
                    backButton.classList.add('buttons');
                    backButton.style.cursor = 'pointer';

                    if (api !== 'default' && api !== 'asc' && api !== 'desc' && api !== "popular") {
                        backButton.addEventListener("click", () => {
                            if (div === productsDivCatalog) {
                                sortSection.style.display = "flex";
                                filter.style.display = "flex";
                            }
                            div.removeChild(backButton);
                            div.innerHTML = '';

                            fetch(`https://dummyjson.com/products/category/${product.category}`)
                                .then(res => res.json())
                                .then(category => {
                                    div.innerHTML = '';
                                    createProduct(category, 0, category.length, div, api = `${category.category}`);
                                });
                        });
                    } else {
                        backButton.addEventListener("click", () => {
                            if (div === productsDivCatalog) {
                                buttonSection.style.display = "flex";
                                sortSection.style.display = "flex";
                                filter.style.display = "flex";
                            }
                            div.removeChild(backButton);
                            div.innerHTML = '';

                            if (api === 'default' || api === 'asc' || api === 'desc') {
                                fetchFunction(page, productPerPage, div, api);
                            } else {
                                fetchFunction(0, (page + 1) * productPerPage, div, api);
                            }
                        });
                    }

                    createProduct1(div, product)

                    const element = document.querySelector('.hideDecription');
                    element.style.display = 'block';

                    const minusButtonCart = document.querySelector('.minusButtonCart');
        
                    const cartItemsNumberPP = document.querySelector('.cartItemsNumberPP')
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

                    const addToCartButton = document.querySelector('.addToCart');
                    addToCartButton.addEventListener('click', function addToCartButtonEventListener(event){

                        let forIdElement = product.id
                        console.log(forIdElement);
                        storedIds.push(forIdElement);  //// aq und agaaketo ro ricxvi moematos ukve damatebuls 
                        localStorage.setItem('productIds', JSON.stringify(storedIds));
                        numberCartItem ++
                        updateCartNumber()

                        singleCartItemN++
                        minusButtonCart.style.display = 'block'
                        cartItemsNumberPP.textContent = singleCartItemN
                    });

                    div.appendChild(backButton);
                });
        }

        productDiv.addEventListener('click', productDiveventListener);
        
   
        const minusButtonCart = productDiv.querySelector('.minusButtonCart');
        
        const cartItemsNumberPP = productDiv.querySelector('.cartItemsNumberPP')
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

        minusButtonCart.addEventListener('mouseenter', () => {
            cartHovered = true; 
        });
        minusButtonCart.addEventListener('mouseleave', () => {
            cartHovered = false; 
        });

        const addToCartButton = productDiv.querySelector('.addToCart');

        addToCartButton.addEventListener('click', function addToCartButtonEventListener(event){
            event.stopPropagation

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

        addToCartButton.addEventListener('mouseenter', () => {
            cartHovered = true; 
        });
        addToCartButton.addEventListener('mouseleave', () => {
            cartHovered = false; // Re-enable interactions when mouse leaves cart
            console.log('Mouse left cart, product divs enabled.');
        });

        
        div.appendChild(productDiv);
    });
}



function fetchFunction(page, productPerPage, div, api='default') {
    function random (){
        fetch(`https://dummyjson.com/products?limit=${productPerPage}&skip=${page * productPerPage}`)
            .then(Response => Response.json())
            .then(data => {
                function one() {
                    createProduct(data, page, productPerPage, div)                    
                }

                ///function two
                function two() {
                    const totalPages = Math.ceil(data.total / productPerPage)
                    pageCount.style.display = 'none'

                    createProduct(data, page, productPerPage, div, api)

                    //next for load
                    if (page === Math.ceil(data.total / productPerPage)) {
                        buttonSection.removeChild(next)
                    } else if (page < Math.ceil(data.total / productPerPage) - 1) {
                        buttonSection.appendChild(next)
                    }

                    function handleNextClick() {
                        page += 1;
                        buttonSection.removeChild(next);
                        fetchFunction(page, productPerPage, div, "popular");
                    }

                    next.addEventListener('click', handleNextClick);


                    //sorting
                    //popular
                    function sortByPopularEventListener() {
                        buttonSection.style.display = 'flex'
                        
                        window.location.href = './catalog.html'
        
                    };
                    sortByPopular.addEventListener('click', sortByPopularEventListener)


  /////////////////////////////////////////////////////////////////////////////////////////                  
                    //asc
                    function sortOptionAscEventListener() {
                        buttonSection.style.display = 'flex'
                        pageCount.style.display = 'flex'
                        
                        arrowDown.style.transform = 'rotate(0deg)';      
                        catalogSecButton2.removeChild(sortOptionDesc);
                        catalogSecButton2.removeChild(sortByPopular);

                        ascPage = 0
                        
                        if (prevButtonSection.contains(prevDesc)) {
                            prevButtonSection.removeChild(prevDesc);
                        }
                       //prevAsc                   
                        function prevAscEventListener() {
                            prevButtonSection.removeChild(prevAsc)
                            ascPage -= 1
                            pageCount.textContent = `Page ${ascPage} of ${totalPages}`;
                            div.innerHTML = (`
                                `);

                            fetchFunction(ascPage, productPerPageCatalogAsc, productsDivCatalog, 'asc')
    
                        }
    
                        prevAsc.addEventListener('click', prevAscEventListener)

                        //next
                        if (buttonSection.contains(next)) {
                            buttonSection.removeChild(next);
                        }
                        if (buttonSection.contains(nextDesc)) {
                            buttonSection.removeChild(nextDesc);
                        }


                        function nextAscEventListener()  {
                            buttonSection.removeChild(nextAsc);

                            ascPage += 1
                            pageCount.textContent = `Page ${ascPage} of ${totalPages}`;
                            div.innerHTML = (`
                            `);

                            fetchFunction(ascPage, productPerPageCatalogAsc, productsDivCatalog, 'asc')
                        }
                        nextAsc.addEventListener('click', nextAscEventListener)

                        // sortOptionAsc.addEventListener('click', sortOptionAscEventListener)

                        fetchFunction(ascPage, productPerPageCatalogAsc, productsDivCatalog, 'asc')     

                    }
                    sortOptionAsc.addEventListener('click', sortOptionAscEventListener)
  /////////////////////////////////////////////////////////////////////////////////////////                  

                    //desk
                    function sortOptionDescEventListener() {
                        buttonSection.style.display = 'flex'
                        pageCount.style.display = 'flex'

                        arrowDown.style.transform = 'rotate(0deg)';     
                        catalogSecButton2.removeChild(sortOptionAsc);
                        catalogSecButton2.removeChild(sortByPopular);

                        descPage = 0

                        if (prevButtonSection.contains(prevAsc)) {
                            prevButtonSection.removeChild(prevAsc);
                        }

                       //prevDesc                   
                        function prevDescEventListener() {
                            prevButtonSection.removeChild(prevDesc)

                            descPage -= 1
                            pageCount.textContent = `Page ${descPage} of ${totalPages}`;
                            div.innerHTML = (`
                                `);

                            fetchFunction(descPage, productPerPageCatalogDesc, productsDivCatalog, 'desc')
    
                        }
    
                        prevDesc.addEventListener('click', prevDescEventListener)

                        //next
                        if (buttonSection.contains(next)) {
                            buttonSection.removeChild(next);
                        }
                        if (buttonSection.contains(nextAsc)) {
                            buttonSection.removeChild(nextAsc);
                        }

                        function nextDescEventListener()  {  
                            buttonSection.removeChild(nextDesc);

                            descPage += 1
                            pageCount.textContent = `Page ${descPage} of ${totalPages}`;
                            div.innerHTML = (`
                            `);

                            fetchFunction(descPage, productPerPageCatalogDesc, productsDivCatalog, 'desc')
                        }
                        nextDesc.addEventListener('click', nextDescEventListener)

                        // sortOptionDesc.addEventListener('click', sortOptionDescEventListener)

                        fetchFunction(descPage, productPerPageCatalogDesc, productsDivCatalog, 'desc') 

                    }
                    sortOptionDesc.addEventListener('click', sortOptionDescEventListener)
                    

                }

                if (div === productsDivHome) {
                    one()
                } else if (div === productsDivCatalog) {
                    two()
                } 

            })
    }


    function fetchFunctionasc(){
        div.innerHTML = ''
        fetch(`https://dummyjson.com/products?sortBy=title&order=asc&limit=${productPerPage}&skip=${page * productPerPage}`)
            .then(res => res.json())
            .then(data => {
                
                
                    const totalPages = Math.ceil(data.total / productPerPage)
                    pageCount.textContent = `Page ${page + 1} of ${totalPages}`;

                    createProduct(data, page, productPerPage, div, api)

                    if (page != 0) {
                        prevButtonSection.appendChild(prevAsc)
                    } else if (page === 0 ) {
                        if (prevButtonSection.contains(prevAsc)) {
                            prevButtonSection.removeChild(prevAsc);
                        }
                    }

                    if (page === Math.ceil(data.total / productPerPage)) {
                        buttonSection.removeChild(nextAsc)
                    } else if (page < Math.ceil(data.total / productPerPage) - 1) {
                        buttonSection.appendChild(nextAsc)
                    } 

            })
    } 

    function fetchFunctiondesc(){
        div.innerHTML = ''

        fetch(`https://dummyjson.com/products?sortBy=title&order=desc&limit=${productPerPage}&skip=${page * productPerPage}`)
            .then(res => res.json())
            .then(data => {
                
                
                    const totalPages = Math.ceil(data.total / productPerPage)
                    pageCount.textContent = `Page ${page + 1} of ${totalPages}`;

                    createProduct(data, page, productPerPage, div, api)

                    
                    //desc
                    if (page >= 1 ) {
                        prevButtonSection.appendChild(prevDesc)
                    } else if (page < 1) {
                        if (prevButtonSection.contains(prevDesc)) {
                            prevButtonSection.removeChild(prevDesc);
                        }
                    }


                    if (page === Math.ceil(data.total / productPerPage)) {
                        buttonSection.removeChild(nextDesc)
                    } else if (page < Math.ceil(data.total / productPerPage) - 1 ) {
                        buttonSection.appendChild(nextDesc)
                    }
                    
                    

            })
    }

    if (div === productsDivHome) {
        random()
    } else if (div === productsDivCatalog && api === "popular") {
        random()
    } else if(div === productsDivCatalog && api === 'asc'){
        fetchFunctionasc()
    }  else if(div === productsDivCatalog && api === 'desc'){
        fetchFunctiondesc()
    } 
}


///homepage
const productsDivHome = document.querySelector('#homeCatalog')
let homeCurrentPage = 0
let productPerpageHome = 4;

fetchFunction(homeCurrentPage, productPerpageHome, productsDivHome)


//catalog
const productsDivCatalog = document.querySelector('.catalog_sec_sec2')
const catalogCurrentPage = 0;
const productPerPageCatalog = 4;

fetchFunction(catalogCurrentPage, productPerPageCatalog, productsDivCatalog, "popular")

//catalog asc
let ascPage = 0
const productPerPageCatalogAsc = 8;


//catalog desc
let descPage = 0
const productPerPageCatalogDesc = 4;


///sorting
const catalogSecButton2 = document.querySelector('.catalog_sec_button2');
const arrowDown = document.querySelector('#arrowDown');
const sortByPopular = document.querySelector('#sortByPopular')
const sortOptionAsc = document.createElement('span')
const sortOptionDesc = document.createElement('span')
sortOptionAsc.textContent = (`
    Sort By asc
`)
sortOptionDesc.textContent = (`
    Sort By desc
`)
sortOptionAsc.classList.add('catalog_span')
sortOptionDesc.classList.add('catalog_span')


//sorting
//catalog eventlistener
let clickCount = 0;

function handleCatalogClick() {
    page = 0
    clickCount += 1
    if (clickCount > 1){
        catalogSecButton2.removeEventListener('click', handleCatalogClick)
        catalogSecButton2.addEventListener('click', handleCatalogClick)
     }

    if (clickCount % 2 === 1){
        catalogSecButton2.style.display = 'flex'

        catalogSecButton2.appendChild(sortByPopular);
        catalogSecButton2.appendChild(sortOptionAsc);
        catalogSecButton2.appendChild(sortOptionDesc);

        catalogSecButton2.removeChild(arrowDown);
        catalogSecButton2.appendChild(arrowDown);
        arrowDown.style.transform = 'rotate(180deg)';
    } else {
        catalogSecButton2.removeChild(sortByPopular);
        catalogSecButton2.removeChild(sortOptionAsc);
        catalogSecButton2.removeChild(sortOptionDesc);  
        arrowDown.style.transform = 'rotate(0deg)';     
    }

}

catalogSecButton2.addEventListener('click', handleCatalogClick);


