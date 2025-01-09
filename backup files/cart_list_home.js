const cartHome = document.querySelector('#cartHome')
const cartListDivHome = document.createElement('div')
cartListDivHome.style.display = 'flex'
cartListDivHome.style.flexWrap = 'wrap'
cartListDivHome.style.gap = '15px 16px'



  
cartHome.addEventListener('click', (event) => {
  event.stopPropagation();
  productsDivHome.innerHTML=''
  productsDivHome.appendChild(cartListDivHome)

})
