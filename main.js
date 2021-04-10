
const filterInput = document.querySelector('#filter');
const productListUL = document.querySelector('.collection');
const msg = document.querySelector('.msg');
const nameInput = document.querySelector('.product-name');
const priceInput = document.querySelector('.product-price');
const addBtn = document.querySelector('.add-product');
const deleteBtn = document.querySelector('.delete-product');


let productData = getDataFromLocalStorage();

function getDataFromLocalStorage() {
  let items = '';
  if (localStorage.getItem('productItems') === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem('productItems'));
  }
  return items;
}

function saveDataToLocalStorage(item) {
  let items = '';
  if (localStorage.getItem('productItems') === null) {
    items = [];
    items.push(item);
    localStorage.setItem('productItems', JSON.stringify(items));
  } else {
    items = JSON.parse(localStorage.getItem('productItems'));
    items.push(item);
    localStorage.setItem('productItems', JSON.stringify(items));
  }
}

function deleteItemFromLocalStorage(id) {
  const items = JSON.parse(localStorage.getItem('productItems'));
  let result = items.filter(productItem => {
    return productItem.id !== id;
  });
  localStorage.setItem('productItems', JSON.stringify(result));
  if (result.length === 0) location.reload();
}

function loadEventListener() {
  productListUL.addEventListener('click', deleteProduct);
  window.addEventListener('DOMContentLoaded', getData.bind(null, productData));
  addBtn.addEventListener('click', addItem);
  filterInput.addEventListener('keyup', filterProduct);
}


function getData(productList) {
  productListUL.innerHTML = '';
  if (productData.length > 0) {
    showMessage();
    productList.forEach(({ id, name, price }) => {
      let li = document.createElement('li');
      li.className = 'list-group-item collection-item';
      li.id = `product-${id}`;
      li.innerHTML = `<strong>${name}</strong>-<span class="price">$${price}</span>
    <i class="fa fa-trash float-right delete-product"></i>
      `;
      productListUL.appendChild(li);
    });
  } else {
   
    showMessage('please add item to your catalog');
  }
}


function showMessage(message = '') {
  msg.textContent = message;
}

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
    alert('please fill up necessary and valid information');
  } else {
    const data = {
      id,
      name,
      price
    };
    productData.push(data);
    saveDataToLocalStorage(data);
    getData(productData);
    nameInput.value = '';
    priceInput.value = '';
  }
};

const deleteProduct = e => {
  if (e.target.classList.contains('delete-product')) {
   

   
    const target = e.target.parentElement;
    e.target.parentElement.parentElement.removeChild(target);
    
    const id = parseInt(target.id.split('-')[1]);
    let result = productData.filter(productItem => {
      return productItem.id !== id;
    });
    productData = result;
    deleteItemFromLocalStorage(id);
  }
};

const filterProduct = e => {
  const text = e.target.value.toLowerCase();
  let itemLength = 0;
  document.querySelectorAll('.collection .collection-item').forEach(item => {
    const productName = item.firstElementChild.textContent.toLowerCase();
    if (productName.indexOf(text) === -1) {
      item.style.display = 'none';
    } else {
      item.style.display = 'block';
      ++itemLength;
    }
  });
  itemLength > 0 ? showMessage() : showMessage('No item found');
};

loadEventListener();
