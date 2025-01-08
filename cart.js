




const cart = document.querySelector('#cart')
const cartListDiv = document.createElement('div')

cartListDiv.style.display = 'flex'
cartListDiv.style.flexWrap = 'wrap'
cartListDiv.style.gap = '15px 16px'

if (cartListDiv.innerHTML.trim() === '') {
    cart.addEventListener('click', (event) => {
      event.stopPropagation();
      productsDivCatalog.innerHTML=''
      productsDivCatalog.appendChild(cartListDiv)
    
      buttonSection.style.display = "none";
      sortSection.style.display = "none";
      filterSection.style.display = "none";
    
    
    })
  
}
  


