document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    const titleElement = document.getElementById('product-title');
    const priceElement = document.getElementById('product-price');
    const descriptionElement = document.getElementById('product-description');

    if (productId === null) {
        console.error("No product ID provided in the URL.");
        return;
    }

    fetch(`https://rossthesloth-gym.netlify.app/.netlify/functions/get_product?id=${productId}`)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                const product = data[0];
                titleElement.textContent = product.Name;
                priceElement.textContent = `Price: $${product.Price}`;
                
                // Assuming product.Description is a string like "item1;item2;item3"
                const descriptionItems = product.Description.split('\n'); // replace ';' with your actual delimiter

                // Create an unordered list for the product description
                const descriptionList = document.createElement('ul');

                descriptionItems.forEach(item => {
                    const listItem = document.createElement('li');
                    listItem.textContent = item.trim();
                    descriptionList.appendChild(listItem);
                });

                descriptionElement.innerHTML = '';
                descriptionElement.appendChild(descriptionList);
            } else {
                console.error("No data found for this product ID.");
            }
        })
        .catch(err => {
            console.error("Failed to fetch product:", err);
        });
});





