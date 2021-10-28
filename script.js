const booksContainer = document.querySelector('.books-container')
const cartContainer = document.querySelector('.cart-container')

const shoppingCart = {
    quantity: 0,
    items: []
}

const addToCartBtn = () => {
    const addToCartBtn = document.querySelectorAll('.addToCart')
    addToCartBtn.forEach(btn => btn.addEventListener('click', e => {
        addToCart(e)
    })
    )
}

const fetchBooks = () => {
    fetch('https://striveschool-api.herokuapp.com/books')
    .then(response => response.json())
    .then(data => booksContainer.innerHTML = data.map(book => `
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 py-2">
        <div class="card">
            <img src=${book.img} class="card-img-top book-image" alt="...">
            <div class="card-body">
                <p class="card-text font-weight-bold">${book.title}</p>
                <p class="card-text">${book.price}</p>
                <button class="btn btn-success addToCart">Add To cart</button>
            </div>
        </div>
    </div>
    `).join(''))
    .then(addToCartBtn)
    .catch(err => err)
}

fetchBooks()

const addToCart = e => {
    const btn = e.target
    btn.className = 'btn btn-outline-success'
    btn.innerText = 'Added'
    const price = btn.previousElementSibling.innerText
    const title = btn.previousElementSibling.previousElementSibling.innerText
    const image = btn.parentElement.previousElementSibling.src
    shoppingCart.quantity++
    shoppingCart.items.push({title, price, image})
    console.log(shoppingCart)
    updateCartNavbarDisplay()
    updateCartSection()
}

const updateCartNavbarDisplay = () => {
    const cartTotal = document.querySelector('.bag-total')
    cartTotal.innerText = shoppingCart.quantity
}
    
const updateCartSection = () => {
    const cartHeading = document.querySelector('.cart-heading')
    if (shoppingCart.quantity === 0) {
        cartHeading.innerText = 'Your Cart Is Empty'
    } else {
        cartHeading.innerText = `Your Cart Has ${shoppingCart.quantity} Item`
        cartContainer.innerHTML = shoppingCart.items.map(item => `
        <div class="col-12 d-flex justify-content-between">
            <p>${item.title}</p>
            <p>${item.price}</p>
        </div>
        `)
    }
}

const searchInput = document.querySelector('#searchInput')
const searchBtn = document.querySelector('#searchBtn')

searchInput.addEventListener('keyup', () => {
    searchBooks()
})

const searchBooks = () => {
    if (searchInput.value.length <= 2) fetchBooks()
    if (searchInput.value.length > 2) {
        fetch('https://striveschool-api.herokuapp.com/books')
        .then(response => response.json())
        .then(data => booksContainer.innerHTML = data.filter(book => book.title.toLowerCase().includes(searchInput.value.toLowerCase())).map(book => `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 py-2">
            <div class="card">
                <img src=${book.img} class="card-img-top book-image" alt="...">
                <div class="card-body">
                    <p class="card-text font-weight-bold">${book.title}</p>
                    <p class="card-text">${book.price}</p>
                    <button class="btn btn-success addToCart">Add To cart</button>
                </div>
            </div>
        </div>
        `).join(''))
        .then(addToCartBtn)
        .catch(err => err)
    }
}