const booksContainer = document.querySelector('.books-container')

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
}

const updateCartNavbarDisplay = () => {
    const cartTotal = document.querySelector('.bag-total')
    cartTotal.innerText = shoppingCart.quantity
}