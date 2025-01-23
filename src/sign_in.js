
const userButton = document.querySelector("#user_button")
userButton.addEventListener('click', ()=> {
    window.location.href = './sign_in.html'
})


const form = document.querySelector('#sign_in_form');


function errorMassage(element, massage) {
    form.classList.remove('was-validated')

    form.classList.add('not-validated')

    // Remove any existing error messages
    const existingError = element.parentElement.querySelector('.invalid-feedback');
    if (existingError) {
        element.parentElement.removeChild(existingError);
    }

    const div = document.createElement('div');
    div.innerText = massage;
    div.classList.add('invalid-feedback');
    element.classList.add('is-invalid');
    element.parentElement.appendChild(div);
}


const profileInnerhtml = (profile) => `
    <p>ID: ${profile.id}</p>
    <p>First Name: ${profile.firstName}</p>
    <p>Last Name: ${profile.lastName}</p>
    <p>Email: ${profile.email}</p>
    <p>Gender: ${profile.gender}</p>
    <p>Username: ${profile.username}</p>
    <img src="${profile.image}" alt="" style="height: 300px;">
    <button id="logOut">Log Out</button>
`;


form.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = form.email.value;
    const password = form.password.value;
    console.log(event);
    


    fetch('https://dummyjson.com/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            
            username: `${email}`,
            password: `${password}`,
            expiresInMins: 30, // optional, defaults to 60
        }),
    })
    .then(response => response.json())
    .then((profile) => {
            console.log(profile)
        
            if (!profile.accessToken) {
                errorMassage(form.email, "please check credentials")
                errorMassage(form.password, "please check credentials")
            } else {
                // console.log(product)
                localStorage.setItem('userProfile', JSON.stringify(profile));

                form.innerHTML = profileInnerhtml(profile);
                
                const storedProfile = localStorage.getItem('userProfile');
                if (storedProfile) {
                    const profile = JSON.parse(storedProfile);
                    form.innerHTML = profileInnerhtml(profile);
                
                    //log out
                    const logOut = document.querySelector('#logOut')
                    logOut.addEventListener('click', () => {
                        localStorage.removeItem('userProfile');
                        window.location.href = './sign_in.html';
                    })
                }
                
            } 
        
        
        
        })
    
});

const storedProfile = localStorage.getItem('userProfile');
if (storedProfile) {
    const profile = JSON.parse(storedProfile);
    form.innerHTML = profileInnerhtml(profile);

    //log out
    const logOut = document.querySelector('#logOut')
    logOut.addEventListener('click', () => {
        localStorage.removeItem('userProfile');
        window.location.href = './sign_in.html';
    })
}




//SignIn page search event listener/////////////////////////////////////////////////////////////////////////////
const searchButtonSignIn = document.getElementById('searchButtonSignIn');
const putProductsSignIn = document.getElementById('putProductsSignIn');
const sign_in_form_sec = document.getElementById('sign_in_form');
const magnifyingGlassSignIn = document.getElementById('magnifyingGlassSignIn');


const searchDivSignIn = document.getElementById('searchDivSignIn');
searchDivSignIn.style.display = 'none'

let searchButtonCountSignIn = 0
function searchButtonSignInListener(event) {
    event.stopPropagation()
    searchButtonCountSignIn += 1

    if (searchButtonCountSignIn % 2 === 1) {
        searchDivSignIn.style.display = 'flex'
        searchButtonSignIn.style.width = '200px'

    }else {
    searchDivSignIn.style.display = 'none'
    searchButtonSignIn.style.width = '40px'
    }

}

magnifyingGlassSignIn.addEventListener('click', searchButtonSignInListener)

const searchInputSignIn = document.getElementById('searchInputSignIn');

let searchValueSignIn = '';

searchInputSignIn.addEventListener('keyup', (event) => {
    
    searchValueSignIn = event.target.value; 
    fetch(`https://dummyjson.com/products/search?q=${searchValueSignIn}`)
        .then(res => res.json())
        .then(data => {
            putProductsSignIn.innerHTML = '';
            // console.log(data); 
            let productCountSignIn = 0
            data.products.forEach(product => {
                productCountSignIn +=1
                if (productCountSignIn < 11){
                    const liProduct = document.createElement('button'); 
                    liProduct.textContent = `${product.title}`;
                    putProductsSignIn.appendChild(liProduct); 

                    liProduct.addEventListener('click', () => {
                        

                        const rating = Math.round(product.rating)
                        const stars = starSOlid.repeat(rating) + starNormal.repeat(5 - rating)



                        sign_in_form_sec.innerHTML = (`
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

                        const minusButtonCart = sign_in_form_sec.querySelector('.minusButtonCart');
        
                        const cartItemsNumberPP = sign_in_form_sec.querySelector('.cartItemsNumberPP')
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
                


                        const addToCartButton1 = sign_in_form_sec.querySelector('.addToCart');
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
                            
                            window.location.href = '../html/sign_in.html'
                            
                           

                        })
                        sign_in_form_sec.appendChild(backButton);
                        

                    })

                    if (searchValueSignIn === ""){
                        putProductsSignIn.innerHTML = '';
        
                    }
                }
                
            });

            
})
});


//old version for verification with created backend check and hash
// const userButton = document.querySelector("#user_button")
// userButton.addEventListener('click', ()=> {
//     window.location.href = './sign_in.html'
// })


// function stringToHash(string) {

//     let hash = 0;

//     if (string.length == 0) return hash;

//     for (i = 0; i < string.length; i++) {
//         char = string.charCodeAt(i);
//         hash = ((hash << 5) - hash) + char;
//         hash = hash & hash;
//     }

//     return hash;
// }

// const form = document.querySelector('#sign_in_form');

// let users = [
//     {
//     email:"io@gmail.com",
//     password: stringToHash("password1")
//     },
//     {
//     email:"io1@gmail.com",
//     password: stringToHash("password1")
//     }
// ]


// function errorMassage(element, massage) {
//     form.classList.remove('was-validated')

//     form.classList.add('not-validated')

//     // Remove any existing error messages
//     const existingError = element.parentElement.querySelector('.invalid-feedback');
//     if (existingError) {
//         element.parentElement.removeChild(existingError);
//     }

//     const div = document.createElement('div');
//     div.innerText = massage;
//     div.classList.add('invalid-feedback');
//     element.classList.add('is-invalid');
//     element.parentElement.appendChild(div);
// }


// form.addEventListener('submit', (event) => {
//     event.preventDefault();
//     const email = form.email.value;
//     const password = stringToHash(form.password.value);
//     console.log(event);
    

//     //server imitation
//     const user = users.find(user => user.email === email)
//     if (!user) {
//         errorMassage(form.email, "please check credentials")
//         errorMassage(form.password, "please check credentials")
//         return;
//     } 
    
//     if (user.password === password){
//         form.classList.remove('not-validated')

//         form.classList.add('was-validated')

//         const existingError = form.email.parentElement.querySelector('.invalid-feedback');
//         if (existingError) {
//             form.email.parentElement.removeChild(existingError);
//         }
//         const existingError1 = form.password.parentElement.querySelector('.invalid-feedback');
//         if (existingError1) {
//             form.password.parentElement.removeChild(existingError1);
//         }
//         return
//     }
    
//     errorMassage(form.email, "please check credentials")
//     errorMassage(form.password, "please check credentials")
// });

