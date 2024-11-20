const productContainer = document.getElementById('product-container');
const productModal = document.getElementById('productModal');
const productTitle = document.getElementById('productTitle');
const productImage = document.getElementById('productImage');
const productDescription = document.getElementById('productDescription');
const productPrice = document.getElementById('productPrice');

let products = [];

async function fetchProducts() {
    const response = await fetch('https://fakestoreapi.com/products');
    products = await response.json();
    displayProducts(products);
}

function displayProducts(productsToDisplay) {
    productContainer.innerHTML = '';
    productsToDisplay.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${formatPrice(product.price)}</p>  <!-- Display price with dollar format -->
            <button onclick="openModal(${product.id})">View Details</button>
        `;
        productContainer.appendChild(productElement);
    });
}

function formatPrice(price) {
    return `$${price.toFixed(2)}`;
}

function openModal(productId) {
    const product = products.find(p => p.id === productId);
    productTitle.textContent = product.title;
    productImage.src = product.image;
    productDescription.textContent = product.description;
    productPrice.textContent = formatPrice(product.price);  
    productModal.style.display = 'flex';
}

productModal.addEventListener('click', function(e) {
    if (e.target === productModal) {
        closeModal();
    }
});

function closeModal() {
    productModal.style.display = 'none';
}

function sortProducts() {
    const sortBy = document.getElementById('sort').value;
    if (sortBy === 'price_asc') {
        products.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_desc') {
        products.sort((a, b) => b.price - a.price);
    }
    displayProducts(products);
}

function filterProducts() {
    const category = document.getElementById('category').value;
    let filteredProducts = products;

    if (category !== 'all') {
        filteredProducts = products.filter(product => product.category === category);
    }
    displayProducts(filteredProducts);
}

fetchProducts();
