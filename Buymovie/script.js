document.addEventListener("DOMContentLoaded", function() {
    fetchMovies();
    displayCartItems(); 
});

let cart = [];

function fetchMovies() {
    fetch("https://v2.api.noroff.dev/square-eyes")
        .then(response => response.json())
        .then(data => {
            displayMovies(data.data);
        })
        .catch(error => {
            console.error('Error fetching movies:', error);
        });
}

function displayMovies(movies) {
    const moviesContainer = document.getElementById('movies-container');
    
    movies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        moviesContainer.appendChild(movieCard);
    });
}

function createMovieCard(movie) {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');

    const movieImage = document.createElement('img');
    movieImage.src = movie.image.url;
    movieImage.alt = movie.image.alt;
    movieImage.classList.add('movie-image');
    movieCard.appendChild(movieImage);

    const movieDetails = document.createElement('div');
    movieDetails.classList.add('movie-details');

    const movieTitle = document.createElement('h2');
    movieTitle.classList.add('movie-title');
    movieTitle.textContent = movie.title;
    movieDetails.appendChild(movieTitle);

    const movieInfo = document.createElement('p');
    movieInfo.classList.add('movie-info');
    movieInfo.innerHTML = `Genre: ${movie.genre} 
     <br>Rating: ${movie.rating} 
     <br>Released: ${movie.released}`;
    movieDetails.appendChild(movieInfo);

    const moviePrice = document.createElement('p');
    moviePrice.classList.add('movie-price');
    moviePrice.textContent = `$${movie.price}`;
    movieDetails.appendChild(moviePrice);

    const btnCart = document.createElement('button');
    btnCart.classList.add('btn-cart');
    btnCart.textContent = 'Add to Cart';

    btnCart.addEventListener('click', function() {
        addToCart(movie);
    });
    movieDetails.appendChild(btnCart);

    movieCard.appendChild(movieDetails);

    return movieCard;
}

function addToCart(movie) {

    const index = cart.findIndex(item => item.id === movie.id);
    if (index === -1) {

        cart.push({
            id: movie.id,
            title: movie.title,
            image: movie.image.url,
            price: movie.price,
            rating: movie.rating
        });

        saveCartToLocalStorage();

        updateCartDisplay();
    } else {
        alert('This movie is already in the cart.');
    }
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartDisplay() {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = '';
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="cart-item-image">
            <div class="cart-item-details">
                <h3>${item.title}</h3>
                <p>Price: $${item.price}</p>
                <p>Rating: ${item.rating}</p>
                <h4> Genre: ${item.genre}</h4>
                <button class="btn-remove">Remove</button>
            </div>
        `;
        const btnRemove = cartItem.querySelector('.btn-remove');
        btnRemove.addEventListener('click', function() {
            removeFromCart(item.id);
        });
        cartContainer.appendChild(cartItem);
    });
}

function removeFromCart(itemId) {
    const index = cart.findIndex(item => item.id === itemId);
    if (index !== -1) {
        cart.splice(index, 1);
        saveCartToLocalStorage();
        updateCartDisplay();
    }
}

function displayCartItems() {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) {
        cart = storedCart;
        updateCartDisplay();
    }
}
