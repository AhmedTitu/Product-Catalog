//selector
const filterInput = document.querySelector('#filter');
const productListUL = document.querySelector('.collection');
const msg = document.querySelector('.msg');
const nameInput = document.querySelector('.product-name');
const priceInput = document.querySelector('.product-price');
const addBtn = document.querySelector('.add-product');
const deleteBtn = document.querySelector('.delete-product');

// data or state
let productData = getDataFromLocalStorage();
function getDataFromLocalStorage(){
  let items = '';
  if(localStorage.getItem('productItems') === null){
    items = [];
  }else{
    items = JSON.parse(localStorage.getItem('productItems'));
  }
  return items;
}

function saveDataToLocalStorage(item){
  let items = '';
  if(localStorage.getItem('productItems') === null){
    items = [];
    items.push(item);
    localStorage.setItem('productItems' , JSON.stringify(items));;
  }else{
    items = JSON.parse(localStorage.getItem('productItems'));
    items.push(item);
    localStorage.setItem('productItems' , JSON.stringify(items));
  }
  return items;
}

function deleteItemFromLocalStorage(id){
  const items = JSON.parse(localStorage.getItem('productItems'));

  let result = items.filter(productItem => {
    return productItem.id !== id;
  });
  localStorage.setItem('productItems' , JSON.stringify(result));
  
  if(result.length === 0) location.reload();
}
//load all event listener
function loadEventListener() {
  productListUL.addEventListener('click', deleteProduct);

  addBtn.addEventListener('click', addItem);

  filterInput.addEventListener('keyup', filterProduct);
}

//Getting data from store and populate UI
function getData(productList) {
  if (productData.length > 0) {
    msg.innerHTML = '';
    productList.forEach(({ id, name, price }) => {
      let li = document.createElement('li');
      li.className = 'list-group-item collection-item';
      li.id = `product-${id}`;
      li.innerHTML = `<strong>${name}</strong>-<span class="price">$${price}</span>
    <i class="fa fa-trash float-end delete-product"></i>
      `;
      productListUL.appendChild(li);
    });
  } else {
    // showMessage(true, null);
    showMessage('Please add item to your catalog');
  }
}
getData(productData);

//Handeling Message
function showMessage(message) {
  msg.innerHTML = message;
}

//https://stackoverflow.com/questions/6449611/check-whether-a-value-is-a-number-in-javascript-or-jquery
//!(!isNaN(parseFloat(price)) && isFinite(price))


//Adding item to the productData
const addItem = e => {
  e.preventDefault();
  const name = nameInput.value;
  const price = priceInput.value;
  let id;
  if (productData.length === 0) {
    id = 0;
  } else {
    id = productData[productData.length - 1].id + 1;
  }

  if (
    name === '' ||
    price === '' ||
    !(!isNaN(parseFloat(price)) && isFinite(price))
  ) {
    alert('Please fill up necessary and valid information');
  } else {
    const data = {
      id,
      name,
      price
    };
    productData.push(data);
    saveDataToLocalStorage(data);
    productListUL.innerHTML = '';
    getData(productData);
    nameInput.value = '';
    priceInput.value = '';
  }
};
//Delete item from the UI and store
const deleteProduct = e => {
  if (e.target.classList.contains('delete-product')) {
    // e.target.parentElement.remove();

    //removing target from the UI
    const target = e.target.parentElement;
    e.target.parentElement.parentElement.removeChild(target);
    //removing item from the store
    //Getting id
    const id = parseInt(target.id.split('-')[1]);
    deleteItemFromLocalStorage(id);
    //return result array
    
  }
};
//filter product
const filterProduct = e => {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection .collection-item').forEach(item => {
    const productName = item.firstElementChild.textContent.toLowerCase();
    if (productName.indexOf(text) === -1) {
      // showMessage(null, true);
      showMessage('No item Meet your criteria');
      item.style.display = 'none';
    } else {
      msg.innerHTML = '';
      item.style.display = 'block';
    }
  });
};

loadEventListener();
//function showMessage(fetchMessage, searchMessage) {
// if (fetchMessage) {
//   msg.innerHTML = 'please add Item to your catalog';
// } else if (searchMessage) {
//   msg.innerHTML = 'No item meet your criteria';
// }
//}