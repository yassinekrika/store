const allProductsUrl = 'https://course-api.com/javascript-store-products'

async function fetchProducts() {
    const response = await fetch(allProductsUrl).catch(console.error())
    if (response){
        return response.json()
    }
    return response
} 

export default fetchProducts