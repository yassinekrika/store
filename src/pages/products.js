// toggle side bar
const toggleNav = document.querySelector('.toggle-nav');
const sidebarOverlay = document.querySelector('.sidebar-overlay');
const closeBtn = document.querySelector('.sidebar-close');

toggleNav.addEventListener('click', () => {
  sidebarOverlay.classList.add('show');
});
closeBtn.addEventListener('click', () => {
  sidebarOverlay.classList.remove('show');
});
// toggle cart
const cartOverlay = document.querySelector('.cart-overlay');
const closeCartBtn = document.querySelector('.cart-close');
const toggleCartBtn = document.querySelector('.toggle-cart');

toggleCartBtn.addEventListener('click', () => {
  cartOverlay.classList.add('show');
});
closeCartBtn.addEventListener('click', () => {
  cartOverlay.classList.remove('show');
});
export const openCart = () => {
  cartOverlay.classList.add('show');
};

// import fetch products from api
import fetchProducts from '../api/fetchProducts.js';

// display
function display(products, element, filters) {
    element.innerHTML = products.map((product) => {
        const { id, name, image, price } = product
        return `<article class="product">
                    <div class="product-container">
                    <img src="${image}" class="product-img img" alt="${name}" />
                    
                    <div class="product-icons">
                        <a href="product.html?id=${id}" class="product-icon">
                        <i class="fas fa-search"></i>
                        </a>
                        <button class="product-cart-btn product-icon" data-id="${id}">
                        <i class="fas fa-shopping-cart"></i>
                        </button>
                    </div>
                    </div>
                    <footer>
                    <p class="product-name">${name}</p>
                    <h4 class="product-price">${formatPrice(price)}</h4>
                    </footer>
                </article>`
    }).join('')

    if (filters) return;

    element.addEventListener('click', (e) => {
        const parent = e.target.parentElement
        if (parent.classList.contains('product-cart-btn')){
            addToCart(parent.dataset.id)
        }
    })
}
import { setupStore, store } from '../db.js'

async function init() {
    if(store.length < 1) {
        const products = await fetchProducts()
        setupStore(products)
    }
    display(store, document.querySelector('.products-container'))
}
