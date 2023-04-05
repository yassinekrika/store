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
                    <h4 class="product-price">$${price / 100}</h4>
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

// search filter
function setupSearch(store) {
  const form = document.querySelector('.input-form');
  const nameInput = document.querySelector('.search-input');
  form.addEventListener('keyup', function () {
    const value = nameInput.value;
    if (value) {
      const newStore = store.filter((product) => {
        let { name } = product;
        name = name.toLowerCase();
        if (name.startsWith(value)) {
          return product;
        }
      });
      display(newStore, document.querySelector('.products-container'), true);
      if (newStore.length < 1) {
        const products = document.querySelector('.products-container');
        products.innerHTML = `<h3 class="filter-error">
       sorry, no products matched your search
       </h3>`;
      }
    } else {
      display(store, document.querySelector('.products-container'), true);
    }
  });
};

// buttons filter
function setupCompanies(store) {
  let companies = ['all', ...new Set(store.map((product) => product.company))];
  const companiesDOM = document.querySelector('.companies');
  companiesDOM.innerHTML = companies
    .map((company) => {
      return ` <button class="company-btn">${company}</button>`;
    })
    .join('');
  companiesDOM.addEventListener('click', function (e) {
    const element = e.target;
    if (element.classList.contains('company-btn')) {
      let newStore = [];
      if (element.textContent === 'all') {
        newStore = [...store];
      } else {
        newStore = store.filter(
          (product) => product.company === e.target.textContent
        );
      }

      display(newStore, document.querySelector('.products-container'), true);
    }
  });
};

async function init() {
    if(store.length < 1) {
      const products = await fetchProducts()
      setupStore(products)
    }
    
    display(store, document.querySelector('.products-container'))

    setupSearch(store)
    setupCompanies(store)
}

init()