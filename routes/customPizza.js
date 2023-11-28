document.addEventListener('DOMContentLoaded', () => {
    // Fetch and display customization options
    fetch('/api/customizations')
        .then((response) => response.json())
        .then((data) => displayCustomizations(data));

    // Add event listener for the Add Custom Pizza button
    document
        .getElementById('addCustomPizza')
        .addEventListener('click', addCustomPizzaToCart);
});

function displayCustomizations(data) {
    let content = '';
    data.forEach((c) => {
        content += `<div>
                        <input type="checkbox" id="customization-${c.id}" name="customizations" value="${c.id}">
                        <label for="customization-${c.id}">${c.name}</label>
                    </div>`;
    });
    document.getElementById('customizationOptions').innerHTML = content;
}

function addCustomPizzaToCart() {
    const checkedBoxes = document.querySelectorAll(
        'input[name="customizations"]:checked'
    );
    const customizations = Array.from(checkedBoxes).map((cb) =>
        parseInt(cb.value)
    );

    axios
        .post('/api/cart', {
            product_id: id,
            quantity: 1,
            customizations,
        })
        .then((response) => {
            // Update cart count and reset selections
            document.getElementById(
                'cart'
            ).textContent = `Cart(${response.data.cartCount})`;
            checkedBoxes.forEach((cb) => (cb.checked = false));
        })
        .catch((error) => {
            console.error('Error adding custom pizza to cart:', error);
        });
}
