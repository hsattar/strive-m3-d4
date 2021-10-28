const booksContainer = document.querySelector('.books-container')

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
            <p class="card-text">${book.title}</p>
            <button class="btn btn-success addToCart">Add To cart</button>
        </div>
    </div>
</div>
`).join(''))
.then(addToCartBtn)
.catch(err => err)


const addToCart = e => {
    console.log(e)
    const btn = e.target
    btn.className = 'btn btn-outline-success'
    btn.innerText = 'Added'
    const title = btn.previousElementSibling.innerText
    console.log(title)
}

const shoppingCart = {
    quantity: 0,
    items: []
}