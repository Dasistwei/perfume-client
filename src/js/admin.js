const SERVER_URL = '{{SERVER_URL}}'
const table = document.querySelector('table')
const btn = document.querySelector('button')
const Xbtn = document.querySelector('.X')
const xbtn = document.querySelector('.x')
const createDiv = document.querySelector('.create')
const updateDiv = document.querySelector('.update')
const create_form = document.querySelector('#create_form')
const update_form = document.getElementById('update_form');

document.addEventListener('DOMContentLoaded', function () {
  var loader = document.querySelector('.loader');
  loader.style.display = 'block'; // 显示 loading 动画

  // 在加载完成后隐藏 loading 动画
  window.onload = function () {
    loader.style.display = 'none';
  };
});

// create form
// toggle
btn.addEventListener('click', ()=>{
  createDiv.style.display ='block'
})
Xbtn.addEventListener('click', ()=>{
  Xbtn.parentElement.style.display = 'none'
})
xbtn.addEventListener('click', ()=>{
  xbtn.parentElement.style.display = 'none'
})
//create product 
create_form.addEventListener('submit', function(event) {
  event.preventDefault(); // 阻止表單的默認提交行為
  console.log('submit')
  let data = {}
  create_form.querySelectorAll('input').forEach(input => {
    data[input.name] = input.value
  })
  console.log(data)
  createProduct(data);
})
//update product 
update_form.addEventListener('submit', function(event) {
  event.preventDefault(); // 阻止表單的默認提交行為
  console.log('submit')
  let data = {}
  update_form.querySelectorAll('input').forEach(input => {
    data[input.name] = input.value
  })
  data.id = update_form.getAttribute('data-id')
  // console.log('update', data)
  updateProduct(data)
})

table.addEventListener('click', (event)=>{
  const trNode = event.target.parentNode.parentNode
  const productId= event.target.parentNode.parentNode.getAttribute('data-id')
  const action = event.target.getAttribute('data-action')
  const trData ={}

  if(action==='update'){
    updateDiv.style.display='block'
    trNode.querySelectorAll('td').forEach(td =>{
    if(td.dataset!==undefined && td.dataset.src){
      trData[td.dataset.name] = td.dataset.src
    }else if(td.dataset!==undefined){
      trData[td.dataset.name] = td.textContent
    } 
  })        
    update_form.querySelectorAll('input').forEach(input=>{
      if(trData[input.name]!==undefined){
        input.value = trData[input.name]
      }
    })
    update_form.setAttribute('data-id', productId)
    // console.log(update_form)
  }

  if(action==='delete'){
    deleteProduct(productId)
  }
  // deleteProduct(productId)
})
const getProducts = async() =>{
  try {
    const response = await fetch(SERVER_URL)
    const result = await response.json()
    let datas = ''
    result.data.forEach((item, i) =>{
      // const newRow = table.insertRow(i + 1); // 插入在第一個 tr 的後面
      const newTr= document.createElement('tr')
      newTr.setAttribute('data-id', item._id)
      newTr.innerHTML = `
        <td>${i+1}.</td>
        <td data-name='category' >${item.category}</td>
        <td data-name='image' data-src=${item.image}><img src=${item.image} alt="" width= "100px" height="100px"></td>
        <td data-name='is_enabled' >${item.is_enabled === 1?true:false}</td>
        <td data-name='origin_price' >${item.origin_price}</td>
        <td data-name='price' >${item.price}</td>
        <td data-name='title' >${item.title}</td>
        <td data-name='unit' >${item.unit}</td>
        <td>
          <button data-action='update' class='update-btn'>修改</button>
          <button data-action='delete'>刪除</button>
        </td>
      `
      // console.log(newTr)          
      // console.log(item._id)
      table.appendChild(newTr) 
    })
  } catch (error) {
    console.log('getProduct', error)
  }
}
getProducts();

const createProduct = async(data) =>{
  try {
    console.log('SERVER_URL', SERVER_URL)
    const result = await fetch(SERVER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // 如果你使用 JSON 格式的請求主體
      },
      body: JSON.stringify({
        "category": data.category,
        "image": data.image,
        "is_enabled": data.is_enabled,
        "origin_price": data.origin_price,
        "price": data.price,
        "title": data.title,
        "unit": data.unit,
    }) // 或者使用 formData，如果你在前端使用 FormData 對象
    })
    console.log(result)
    window.location.reload()
  } catch (error) {
    console.log('createProduct', error)
  }
};

const updateProduct = async(data) =>{
  try {
    const result = await fetch(SERVER_URL+`/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', // 如果你使用 JSON 格式的請求主體
      },
      body: JSON.stringify({
        "category": data.category,
        "image": data.image,
        "is_enabled": data.is_enabled==='true'?1:0,
        "origin_price": data.origin_price,
        "price": data.price,
        "title": data.title,
        "unit": data.unit,
    }) // 或者使用 formData，如果你在前端使用 FormData 對象
    })
    console.log(result)
    window.location.reload()
  } catch (error) {
    console.log('createProduct', error)
  }
};
// updateProduct(data)

const deleteProduct = async(productId) =>{
  try {
    // let id = '661fb01d12589692dc2f5010'
    await fetch(`${SERVER_URL}/${productId}`, {
      method: 'DELETE'
    })
    window.location.reload()
  } catch (error) {
    console.log('createProduct', error)
  }
};
// deleteProduct(productId);
console.log('admin')