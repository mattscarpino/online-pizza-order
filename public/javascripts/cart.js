/* eslint-disable no-undef */
// const { default: axios } = require('axios');

// eslint-disable-next-line no-unused-vars
async function addItem(id, itemCount) {
  // eslint-disable-next-line no-unused-vars

  const num = document.getElementById('howMany' + id);
  const { value } = num;

  const result = await axios.post('/api/cart', {
    product_id: id,
    quantity: parseInt(value, 10),
  });

  const del = document.getElementById('cart');
  del.innerHTML = 'View Cart (' + result.data.cartCount + ')';
}

// eslint-disable-next-line no-unused-vars
async function addCustomPizzaToCart() {
  const checkedBoxes = document.querySelectorAll(
    "input[type='checkbox']:checked"
  );
  const checkedValues = Array.from(checkedBoxes).map(
    (checkbox) => checkbox.value
  );
  // console.log(checkedValues); // This will log an array of the checked checkbox values

  const result = await axios.post('/api/cart/custom', {
    customizations: checkedValues,
  });

  const del = document.getElementById('cart');
  del.innerHTML = 'View Cart (' + result.data.cartCount + ')';

  for (let i = 0; checkedBoxes.length; i++) {
    checkedBoxes[i].checked = false;
  }
}

// eslint-disable-next-line no-unused-vars
async function updateAmount(id) {
  const num = document.getElementById('amount' + id);
  const { value } = num;

  const result = await axios.post('/api/update', {
    cart_id: id,
    quantity: value,
  });

  const del = document.getElementById('totalItems');
  del.innerHTML = 'Total Items: ' + result.data.cartCount;

  const btm = document.getElementById('bottom' + id);
  btm.innerHTML = 'Quantity: ' + result.data.quantity;
}
