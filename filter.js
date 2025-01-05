// const filter = document.querySelector('#filter')  filtersectionitaa shemoyvanili isedac
const filterCategories = document.querySelector('#filter_image')
const categoriesDiv = document.createElement('div')
categoriesDiv.classList.add('categoriesDiv')

// filterSection.appendChild(categoriesDiv)



let filterCategoriesCount = 0
function filterCategoriesEventListener (){

    filterCategoriesCount += 1

    if (filterCategoriesCount % 2 === 1){
        createFiltercategory()
        filterSection.appendChild(categoriesDiv)


    } else {
        
        filterSection.removeChild(categoriesDiv)

    }
    
}

filterCategories.addEventListener('click', filterCategoriesEventListener)



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
                        ${category}.                     
                `
                function categoryAEventlistener (){
                buttonSection.style.display = 'none'

                    fetch(`https://dummyjson.com/products/category/${category}`)
                    .then(res => res.json())
                    // .then(console.log);
                    .then(category => {
                        productsDivCatalog.innerHTML = ''
                        createProduct(category, 0, category.length, productsDivCatalog)
                    });
                }
                categoryA.addEventListener('click', categoryAEventlistener)
                filterCategories.addEventListener('click', filterCategoriesEventListener)


                categoriesDiv.appendChild(categoryA)
                
            })
        });
}





