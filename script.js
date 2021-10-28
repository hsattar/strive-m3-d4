const booksContainer = document.querySelector('.books-container')

fetch('https://striveschool-api.herokuapp.com/books')
    .then(response => response.json())
    .then(data => booksContainer.innerHTML = data.map(book => `
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 py-2">
        <div class="card">
            <img src=${book.img} class="card-img-top book-image" alt="...">
            <div class="card-body">
                <p class="card-text">${book.title}</p>
            </div>
        </div>
    </div>
    `).join(''))
    .catch(err => err)
