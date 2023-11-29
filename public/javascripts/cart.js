
// eslint-disable-next-line no-unused-vars
async function addItem(id, itemCount) {
    // eslint-disable-next-line no-unused-vars

    let num = document.getElementById('howMany' + id);
    let value = num.value;


    const result = await axios.post('/api/cart', {
        product_id: id,
        quantity: value
    });

    let del = document.getElementById('cart');
    del.innerHTML = 'View Cart (' + result.data.cartCount + ')';

}


async function addCustomPizzaToCart() {
    let checkedBoxes = document.querySelectorAll("input[type='checkbox']:checked");
    let checkedValues = Array.from(checkedBoxes).map(checkbox => checkbox.value);
    // console.log(checkedValues); // This will log an array of the checked checkbox values


    const result = await axios.post('/api/cart/custom', {
        customizations: checkedValues
    });



    for (let i = 0; checkedBoxes.length; i++) {
        checkedBoxes[i].checked = false;
    }


    let del = document.getElementById('cart');
    del.innerHTML = 'View Cart (' + result.data.cartCount + ')';

}