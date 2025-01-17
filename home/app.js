// Select HTML elements
let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let btnAddProd = document.querySelector('#btnAddProd');
let products = [];
let cart = [];

// Toggle cart visibility
iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

// Populate products into HTML
const addDataToHTML = () => {
    listProductHTML.innerHTML = ''; 

    if (products.length > 0) {
        products.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.dataset.id = product.id;
            newProduct.classList.add('item');
            newProduct.innerHTML = `
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button class="addCart">Add To Cart</button>`;
            listProductHTML.appendChild(newProduct);
        });
    }
};

// Handle adding products to the cart
listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('addCart')) {
        let id_product = positionClick.parentElement.dataset.id;
        addToCart(id_product);
    }
});

const addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);

    if (cart.length <= 0) {
        cart = [{
            product_id: product_id,
            quantity: 1
        }];
    } else if (positionThisProductInCart < 0) {
        cart.push({
            product_id: product_id,
            quantity: 1
        });
    } else {
        cart[positionThisProductInCart].quantity += 1;
    }

    showNotification('Product added to cart!');
    addCartToHTML();
    addCartToMemory();
};

// Display a notification message
const showNotification = (message) => {
    const notification = document.getElementById('notification');
    notification.innerText = message;
    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.display = 'none';
    }, 2000);
};

// Save cart to local storage
const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

// Render cart items in HTML
const addCartToHTML = () => {
    listCartHTML.innerHTML = ''; // Clear cart before rendering
    let totalQuantity = 0;

    if (cart.length > 0) {
        cart.forEach(item => {
            totalQuantity += item.quantity;

            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;

            let positionProduct = products.findIndex((value) => value.id == item.product_id);
            let info = products[positionProduct];

            newItem.innerHTML = `
                <div class="image">
                    <img src="${info.image}" alt="${info.name}">
                </div>
                <div class="name">
                    ${info.name}
                </div>
                <div class="totalPrice">$${(info.price * item.quantity).toFixed(2)}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${item.quantity}</span>
                    <span class="plus">></span>
                </div>
            `;
            listCartHTML.appendChild(newItem);
        });
    }

    iconCartSpan.innerText = totalQuantity; // Update cart quantity icon
};

// Handle quantity changes in the cart
listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;

    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = positionClick.classList.contains('plus') ? 'plus' : 'minus';

        changeQuantityCart(product_id, type);
    }
});

const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);

    if (positionItemInCart >= 0) {
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity += 1;
                break;

            case 'minus':
                cart[positionItemInCart].quantity -= 1;
                if (cart[positionItemInCart].quantity <= 0) {
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }

    addCartToHTML();
    addCartToMemory();
};

// Initialize the application
const initApp = () => {
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            addDataToHTML();

            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'));
                addCartToHTML();
            }
        });
};

// Optional: Redirect to add product page
/*btnAddProd.addEventListener('click', () => {
    window.location.href = 'addProduct.html';
});*/

initApp();
