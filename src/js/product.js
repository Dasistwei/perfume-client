const SERVER_URL = '{{SERVER_URL}}'
const CLIENT_URL = '{{CLIENT_URL}}'

const listElement = document.querySelector('.products-list')
const catElement = document.querySelector('.category-list')
const hamMenuElement = document.querySelector('.ham-menu')
const mainMenuElement = document.querySelector('.main-menu')
const subscribeElement = document.querySelector('.subscribe')
subscribeElement.style.backgroundImage =  `url( ${CLIENT_URL}/images/contact.png)`

document.addEventListener('DOMContentLoaded', function () {
  var loader = document.querySelector('.loader');
  loader.style.display = 'block'; // 显示 loading 动画

  // 在加载完成后隐藏 loading 动画
  window.onload = function () {
    loader.style.display = 'none';
  };
});

// console.log('sub',)

hamMenuElement.addEventListener('click', ()=>{
  // mainMenuElement.style.display = mainMenuElement.style.display === 'block'?'none':'block'
  mainMenuElement.classList.toggle('active')
  console.log(mainMenuElement)
})
const getProducts = async() =>{
  try {
    const response = await fetch(SERVER_URL)
    const result = await response.json()
    let products = ''
    let categories = []
    let catList =''
    result.data.forEach((item, i) =>{
      !categories.includes(item.category)&&categories.push(item.category)
      products +=  `
        <div class="product">
          <div class="img" style="background-image: url('${item.image.replace(/w=\d+/, 'w=500')}')"></div>
          <h3>${item.title}</h3>
          <span>${item.category}</span>
          <div class="price">
            <p>NT$${item.price}</p>
            <p>NT$${item.origin_price}</p>
          </div>
          <div class="actions">
            <i class="fa-solid fa-heart"></i>
            <i class="fa-solid fa-cart-shopping"></i>
          </div>
        </div>`
    })
    categories.forEach(category=>{
      catList += `<a href="#">${category}</a>`
    })
    catElement.innerHTML = catList
    listElement.innerHTML = products
  } catch (error) {
    console.log('getProduct', error)
  }
};
getProducts();  
console.log('hiey')