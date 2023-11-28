
// eslint-disable-next-line no-unused-vars
async function addItem(id, itemCount) {
    // eslint-disable-next-line no-unused-vars
    const result = await axios.post('/api/cart', {
        product_id: id,
        quantity: 1
    });
    itemCount = req.data.cartCount;
    return itemCount;
}
