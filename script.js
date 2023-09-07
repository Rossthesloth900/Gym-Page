// Card Animation
AOS.init({
    once: true,
    duration: 1000,
    delay: 200,
});

// Function to fetch multiple products based on a list of product IDs
async function fetchProductDetails(productIds) {
  const productDetails = {};
  for (let id of productIds) {
    const response = await fetch(`https://rossthesloth-gym.netlify.app/.netlify/functions/get_product?id=${id}`);
    const data = await response.json();
    if (data && data.length > 0) {
      productDetails[id] = data[0];
    }
  }
  return productDetails;
}

// Function to update the cart count displayed
function updateCartCount() {
  const cart = getCartItems();
  const cartCountElement = document.getElementById('cart-count');
  if (cartCountElement) {
    cartCountElement.innerText = cart.length;
  }
}


// Function to change image on click
function changeImage(newSrc, clickedThumbnail) {
  document.getElementById('mainImage').src = newSrc;
  const thumbnails = document.querySelectorAll('.thumbnail');
  thumbnails.forEach((thumb) => {
    thumb.classList.remove('thumbnail-active');
  });
  clickedThumbnail.classList.add('thumbnail-active');
}

// Makes the navbar transparent/white on scroll
$(document).on('scroll', function() {
  if ($(window).scrollTop() > 50) {
    $('.transparent-nav').addClass('navbar-scrolled');
    $('.cart-icon').removeClass('cart-icon-white').addClass('cart-icon-black');
  } else {
    $('.transparent-nav').removeClass('navbar-scrolled');
    $('.cart-icon').removeClass('cart-icon-black').addClass('cart-icon-white');
  }
});

// Function to render the cart
function renderCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';  // Clear existing items

    const cartItems = getCartItems();
    cartItems.forEach((item, index) => {
        const productDetails = fetchedProductDetails[item.id];
        if (productDetails) {
            cartItemsDiv.innerHTML += `
            <div class="product-container">
              <img src="${productDetails.Images.split(';')[0].trim()}" alt="${productDetails.Name}" />
              ${productDetails.Name} - $${productDetails.Price}
              <i class="bi bi-x-lg" onclick="removeFromCart(${index})" style="cursor:pointer;"></i>
            </div>`;
        }
    });
}

// Function to toggle the slide-in cart
async function toggleCart() {
    const cart = document.getElementById('slide-in-cart');
    cart.classList.toggle('show');
  
    // Fetch items from local storage
    const cartItems = getCartItems();
  
    // Fetch details for all product IDs in the cart
    const productIds = cartItems.map(item => item.id);
    fetchedProductDetails = await fetchProductDetails(productIds);
  
    // Render the cart items
    renderCart();
}

// Function to remove an item from the cart by index
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.splice(index, 1); // Remove item at the given index
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update the cart count and re-render the cart directly
    updateCartCount();
    renderCart();
}

$(document).ready(function(){
  // Initialize cart count
  updateCartCount();

  // Attach event listeners related to the cart
  document.querySelector('.cart').addEventListener('click', toggleCart);
  document.getElementById('close-cart').addEventListener('click', toggleCart);

  $("#mainImage").click(function(){
    let imgSrc = $(this).attr("src");
    $("#popupImage").attr("src", imgSrc);
  });

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  // Attach addToCart function to "Add to Cart" button
  const addToCartButton = document.getElementById('addToCartButton');
  if (addToCartButton) {
    addToCartButton.addEventListener('click', function() {
      const product = {
        id: productId,
        name: 'Product Name based on productId',
        price: 10
      };

      addToCart(product);
      alert('Product added to cart');
    });
  }
});

// Function to add an item to the cart
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

// Function to get all items from the cart
function getCartItems() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}

// Function to clear the entire cart
function clearCart() {
  localStorage.removeItem('cart');
  updateCartCount();
}
