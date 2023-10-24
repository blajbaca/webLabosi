// Get elements
const cartButton = document.querySelector('.cart-button');
const cartBadge = document.querySelector('.cart-badge');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.close');
const buyButton = document.querySelector('.buy-btn');
const cartItemsList = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const itemsGrid = document.querySelector('.items-grid');
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');




// Update the cart badge count
function updateCartBadge() {
  // Fetch the cart count from the server
  fetch('getCartCount.php')
    .then(response => response.json())
    .then(data => {
      cartBadge.textContent = data.count;
    })
    .catch(error => console.log(error));
}

// Event listener for add to cart form submission
const addToCartForms = document.querySelectorAll('.add-to-cart-form');
addToCartForms.forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const productId = form.querySelector('input[name="product_id"]').value;
    const quantity = form.querySelector('input[name="quantity"]').value;

    // Send an AJAX request to addToCart.php
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'addToCart.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
      if (xhr.status === 200) {
        // Update the cart badge count
        updateCartBadge();
      }
    };
    xhr.send(`product_id=${productId}&quantity=${quantity}`);
  });
});

// Update the cart badge initially
updateCartBadge();

// An example function that creates HTML elements using the DOM.

// Adding the .show-modal class to an element will make it visible
// because it has the CSS property display: block; (which overrides display: none;)
// See the CSS file for more details.
function toggleModal() {
  modal.classList.toggle('show-modal');
}

// Call fillItemsGrid function when page loads

// Example of DOM methods for adding event handling

modalClose.addEventListener('click', toggleModal);