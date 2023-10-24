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

let items = [
    {
        name: 'Apple',
        price: 2,
        imagePath: "assets/apple.png"
    },
    {
        name: 'Banana',
        price: 1,
        imagePath: "assets/banana.png"
    },
    {
        name: 'Pineapple',
        price: 3,
        imagePath: "assets/pineapple.jpg"
    },
    {
        name: 'Kiwi',
        price: 0.5,
        imagePath: "assets/kiwi.jpg"
    },
    {
        name: 'Orange',
        price: 2,
        imagePath: "assets/orange.jpg"
    },
    {
        name: 'Pear',
        price: 4,
        imagePath: "assets/pear.jfif"
    },
    {
        name: 'Fig',
        price: 5,
        imagePath: "assets/fig.jpg"
    },
    {
        name: 'Plum',
        price: 3,
        imagePath: "assets/plum.jpg"
    },
    {
        name: 'Avocado',
        price: 6,
        imagePath: "assets/avocado.png"
    },
    {
        name: 'Grapefruit',
        price: 4,
        imagePath: "assets/grapefruit.jpg"
    }
];

let cart = [];
let cartPrice = 0;

// An example function that creates HTML elements using the DOM.
function fillItemsGrid() {
    for (const item of items) {
        let itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.innerHTML = `
            <img src="${item.imagePath}" alt="${item.name}">
            <h2>${item.name}</h2>
            <p>$${item.price}</p>
            <button class="add-to-cart-btn" data-id="${item.id}">Add to cart</button>
        `;
        itemsGrid.appendChild(itemElement);
    }
}


function toggleModal() {
    const cartModal = document.querySelector('.modal');
    const notificationModal = document.getElementById('notification-modal');
  
    if (cartModal.style.display === 'block') {
      cartModal.style.display = 'none';
    } else {

      notificationModal.style.display = 'none';
      cartModal.style.display = 'block';
    }
  }

function toggleNotificationModal() {
    const notificationModal = document.getElementById('notification-modal');
    const cartModal = document.querySelector('.modal');
    if (cartModal.classList.contains('show-modal')) {
      toggleModal(); 
    }
    notificationModal.classList.toggle('show-modal');
  }

function addToCartClicked(event) {
    var addToCartButton = event.target;
    var shopItem = addToCartButton.parentElement;
    var itemToAdd = shopItem.querySelector("h2").innerHTML;
    console.log(itemToAdd);
}

fillItemsGrid();



function addToCartClicked(event) {
    const clickedElement = event.target;
    if (clickedElement.classList.contains("add-to-cart-btn")) {
        const shopItem = clickedElement.parentElement;
        const itemName = shopItem.querySelector("h2").innerHTML;
        const itemPrice = parseFloat(shopItem.querySelector("p").innerHTML.slice(1));
        const itemImagePath = shopItem.querySelector("img").getAttribute("src");
        addItemToCart(itemName, itemPrice, itemImagePath);
    }
    updateCartBadge();
}

function renderCartItems() {
    cartItemsList.innerHTML = "";
    let total = 0;

    for (const item of cart) {
        let cartItemElement = document.createElement("li");
        cartItemElement.innerHTML = `
        <div class="cart-item">
            <img src="${item.imagePath}" alt="${item.name}">
            <div class="item-details">
                <h2>${item.name}</h2>
                <p>$${item.price}</p>
            </div>
        <div class="quantity">
            <input type="number" class="quantity-input" min="1" value="${item.quantity}">
            <button class="remove-from-cart">Remove</button>
        </div>
        </div>
        `;
        cartItemsList.appendChild(cartItemElement);
        total += item.price * item.quantity;
    }

    cartTotal.textContent = `$${total.toFixed(2)}`;
    attachQuantityChangeListeners(); 
}


function updateCartBadge() {
    let totalQuantity = 0;

    for (const item of cart) {
        totalQuantity += item.quantity;
    }

    cartBadge.innerHTML = totalQuantity;
}


function addItemToCart(name, price, imagePath) {
    const existingItem = cart.find((item) => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        const newItem = {
            name: name,
            price: price,
            quantity: 1,
            imagePath: imagePath,
        };
        cart.push(newItem);
    }
    renderCartItems();
}

function handleQuantityChange(event) {
    const input = event.target;
    const cartItem = input.closest(".cart-item");
    const itemName = cartItem.querySelector("h2").textContent;
    const item = cart.find((item) => item.name === itemName);

    if (item) {
        const newQuantity = parseInt(input.value);
        item.quantity = newQuantity;
        renderCartItems();
    }
}


function attachQuantityChangeListeners() {
    const quantityInputs = document.querySelectorAll(".quantity-input");
    const removeButtons = document.querySelectorAll(".remove-from-cart");

    quantityInputs.forEach((input) => {
        input.addEventListener("change", handleQuantityChange);
    });

    removeButtons.forEach((button) => {
        button.addEventListener("click", handleRemoveFromCart);
    });
}

function handleRemoveFromCart(event) {
    const button = event.target;
    const cartItem = button.closest(".cart-item");
    const itemName = cartItem.querySelector("h2").textContent;
    const itemIndex = cart.findIndex((item) => item.name === itemName);

    if (itemIndex !== -1) {
        cart.splice(itemIndex, 1);
        renderCartItems();
    }
}

function handleBuyButtonClick() {
    if (cart.length === 0) {
        displayNotification("Cart is empty");
    } else {
        displayNotification("Purchase successful");
        emptyCart();
        renderCartItems();
    }
}

function displayNotification(message) {
    const modal = document.getElementById("notification-modal");
    const notificationMessage = document.getElementById("notification-message");

    const cartModal = document.querySelector(".modal.show-modal");
    if (cartModal) {
        cartModal.style.display = "none";
    }

    notificationMessage.textContent = message;
    modal.style.display = "block";

    const closeButton = modal.querySelector(".close");
    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
    });
}

function emptyCart() {
    cart = [];
    updateCartBadge();
}


// Example of DOM methods for adding event handling
cartButton.addEventListener('click', toggleModal);
modalClose.addEventListener('click', toggleModal);
itemsGrid.addEventListener('click', addToCartClicked);
cartItemsList.addEventListener("click", handleQuantityChange);
buyButton.addEventListener('click', handleBuyButtonClick);

