let cart = [];
let allMovies = [];

document.addEventListener("DOMContentLoaded", function() {
    const checkcondition = document.getElementById('check');
    if (checkcondition) {
        fetchMovies();
        document.getElementById('genre-filter').addEventListener('change', applyFilters);
        document.getElementById('rating-filter').addEventListener('change', applyFilters);
    } else {
        displayCartItems();
    }
});

function fetchMovies() {
    fetch("https://v2.api.noroff.dev/square-eyes")
        .then(response => response.json())
        .then(data => {
            allMovies = data.data; 
            displayMovies(allMovies);
        })
        .catch(error => {
            console.error('Error fetching movies:', error);
        });
}

function displayMovies(movies) {
    const moviesContainer = document.getElementById('movies-container');
    moviesContainer.innerHTML = ''; 

    movies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        moviesContainer.appendChild(movieCard);
    });
}

function applyFilters() {
    const genreFilter = document.getElementById('genre-filter').value;
    const ratingFilter = document.getElementById('rating-filter').value;

    let filteredMovies = allMovies;

    if (genreFilter !== 'all') {
        filteredMovies = filteredMovies.filter(movie => movie.genre.toLowerCase() === genreFilter.toLowerCase());
    }

    if (ratingFilter !== 'all') {
        filteredMovies = filteredMovies.filter(movie => movie.rating.toLowerCase() === ratingFilter.toLowerCase());
    }

    displayMovies(filteredMovies);
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

    movieImage.addEventListener('click', function() {
        displayMovieDetails(movie);
    });

    return movieCard;
}

function displayMovieDetails(movie) {
    const filterContainer = document.getElementById('filter-container');
    const moviesContainer = document.getElementById('movies-container');
    const movieDetails = document.getElementById('movie-details');

    document.getElementById('movie-title').textContent = movie.title;
    document.getElementById('movie-image').src = movie.image.url;
    document.getElementById('movie-image').alt = movie.image.alt;
    document.getElementById('movie-genre').textContent = `Genre: ${movie.genre}`;
    document.getElementById('movie-rating').textContent = `Rating: ${movie.rating}`;
    document.getElementById('movie-released').textContent = `Released: ${movie.released}`;
    document.getElementById('movie-price').textContent = `$${movie.price}`;
    filterContainer.style.display = 'none';
    moviesContainer.style.display = 'none';
    movieDetails.style.display = 'block';
}

function addToCart(movie) {
    const index = cart.findIndex(item => item.id === movie.id);
    if (index === -1) {
        cart.push({
            id: movie.id,
            title: movie.title,
            image: movie.image.url,
            price: movie.price,
            rating: movie.rating,
            genre: movie.genre
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
    if (cartContainer) {
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
                    <h4>Genre: ${item.genre}</h4>
                    <button class="btn-remove">Remove</button>
                </div>
            `;
            const btnRemove = cartItem.querySelector('.btn-remove');
            btnRemove.addEventListener('click', function() {
                removeFromCart(item.id);
            });
            cartContainer.appendChild(cartItem);
        });
    } else {
        //console.error('Element with ID "cart-container" not found.');
    }
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
