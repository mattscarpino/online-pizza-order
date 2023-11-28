
// eslint-disable-next-line no-unused-vars
async function addItem(id, itemCount) {
    // eslint-disable-next-line no-unused-vars

    let num = document.getElementById('howMany' + id);
    let value = num.value;


    const result = await axios.post('/api/cart', {
        product_id: id,
        quantity: value
    });
    itemCount = req.data.cartCount;
    return itemCount;
}
