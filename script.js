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
    return fetch('https://striveschool-api.herokuapp.com/books')
    .then(response => response.json())
    .catch(err => err)
}

const loadBooks = () => {
    fetchBooks()
    .then(data => booksContainer.innerHTML = data.map(book => `
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 py-2">
        <div class="card">
            <img src=${book.img} class="card-img-top book-image" alt="...">
            <div class="card-body">
                <p class="card-text font-weight-bold">${book.title}</p>
                <p class="card-text">£${book.price.toFixed(2)}</p>
                <button class="btn btn-success addToCart">Add To cart</button>
            </div>
        </div>
    </div>
    `).join(''))
    .then(addToCartBtn)
}

loadBooks()

const addToCart = e => {
    const btn = e.target
    btn.className = 'btn btn-outline-success added'
    btn.innerText = 'Added'
    const price = btn.previousElementSibling.innerText
    const title = btn.previousElementSibling.previousElementSibling.innerText
    const image = btn.parentElement.previousElementSibling.src
    shoppingCart.quantity++
    shoppingCart.items.push({title, price, image})
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
        cartHeading.innerHTML = '<h3>Your Cart Is Empty</h3>'
        cartContainer.innerHTML = ``
    } else {
        cartHeading.innerHTML = `<h3>Your Cart Has ${shoppingCart.quantity} Item</h3><button class="btn btn-danger ml-2" onclick="clearCart()">Clear All</button>`
        cartContainer.innerHTML = shoppingCart.items.map(item => `
        <div class="col-12 d-flex justify-content-between">
            <p>${item.title}</p>
            <p>${item.price}</p>
        </div>
        `)
    }
}

const searchInput = document.querySelector('#searchInput')

searchInput.addEventListener('keyup', () => {
    searchBooks()
})

const searchBooks = () => {
    if (searchInput.value.length <= 2) loadBooks()
    if (searchInput.value.length > 2) {
        fetchBooks()
        .then(data => {
        const filteredBooks = data.filter(book => book.title.toLowerCase().includes(searchInput.value.toLowerCase()))
        if (filteredBooks.length < 1) return booksContainer.innerHTML = `<h3>We Found No Results For Your Search</h3>`
        booksContainer.innerHTML = filteredBooks.map(book => `
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
        `).join('')
        })
        .then(addToCartBtn)
        .catch(err => err)
    }
}

const clearCart = () => {
    shoppingCart.quantity = 0
    shoppingCart.items = []
    updateCartSection()
    const addedBtns = document.querySelectorAll('.added')
    addedBtns.forEach(btn => {
        btn.className = 'btn btn-success addToCart'
        btn.innerText = 'Add To Cart'
    })
    addToCartBtn()
}

const under10 = document.querySelector('#under10')
under10.addEventListener('click', () => {
    if (under10.checked) {
        fetchBooks()
        .then(data => {
        const cheapBooks = data.filter(book => book.price < 10)
        if (cheapBooks.length < 1) return booksContainer.innerHTML = `<h3>We Found No Results For Your Search</h3>`
        booksContainer.innerHTML = cheapBooks.map(book => `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 py-2">
            <div class="card">
                <img src=${book.img} class="card-img-top book-image" alt="...">
                <div class="card-body">
                    <p class="card-text font-weight-bold">${book.title}</p>
                    <p class="card-text">£${book.price.toFixed(2)}</p>
                    <button class="btn btn-success addToCart">Add To cart</button>
                </div>
            </div>
        </div>
        `).join('')
        })
        .then(addToCartBtn)
    } else {
        loadBooks()
    }
})