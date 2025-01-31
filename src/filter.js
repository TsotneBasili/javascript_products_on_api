// const filter = document.querySelector('#filter')  filtersectionitaa shemoyvanili isedac
const filterCategories = document.querySelector('#filter_image')
const categoriesDiv = document.createElement('div')
categoriesDiv.classList.add('categoriesDiv')


let filterCategoriesCount = 0


function filterCategoriesEventListener(event) {
    event.stopPropagation(); // Prevents the document click event from firing immediately

    filterCategoriesCount += 1;

    if (filterCategoriesCount % 2 === 1) {
        createFiltercategory(); // Ensure this function exists
        filterSection.appendChild(categoriesDiv);
    } else {
        filterSection.removeChild(categoriesDiv);
    }
}

filterCategories.addEventListener('click', filterCategoriesEventListener);

// Close the filter when clicking outside
document.addEventListener("click", (event) => {
    if (!filterSection.contains(event.target) && filterCategoriesCount % 2 === 1) {
        filterCategoriesCount = 0; // Reset count to avoid errors
        filterSection.removeChild(categoriesDiv);
    }
});



function createFiltercategory() {
    categoriesDiv.innerHTML = '';

    fetch('https://dummyjson.com/products/category-list')
        .then(res => res.json())
        // .then(console.log)
        .then(data => {
            data.forEach(category => {
                const categoryA = document.createElement('button')
                categoryA.href = '';
                categoryA.classList.add('delete')
                categoryA.innerHTML = `      
                        ${category}                     
                `
                function categoryAEventlistener (){
                buttonSection.style.display = 'none'

                    fetch(`https://dummyjson.com/products/category/${category}`)
                    .then(res => res.json())
                    // .then(console.log);
                    .then(category => {
                        productsDivCatalog.innerHTML = ''
                        createProduct(category, 0, category.length, productsDivCatalog, api=`${category}`)
                        

                    });
                }
                categoryA.addEventListener('click', categoryAEventlistener)
                filterCategories.addEventListener('click', filterCategoriesEventListener)


                categoriesDiv.appendChild(categoryA)
                
            })
        });
}





