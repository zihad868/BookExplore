// Navbar

function Menu(e) {
    let list = document.querySelector('ul');
    if (e.name === 'menu') {
      e.name = 'close';  
      list.classList.add('top-[80px]');
      list.classList.add('opacity-100');
      list.classList.add('z-50')
    } else {
      e.name = 'menu';   
      list.classList.remove('top-[80px]');
      list.classList.remove('opacity-100');
      list.classList.remove('z-50'); 
    }
  }
  
// Store Books
books = []
 
// Fetch Books API
let page = 1;

function fetchBooks(page) {
  const loadingElement = document.getElementById('loading');
  const booksContainer = document.getElementById('books-container');

  // Show the loading spinner
  loadingElement.classList.remove('hidden');
  booksContainer.innerHTML = ''; // Clear any previous data

  fetch(`https://gutendex.com/books?page=${page}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      books = data.results;
      displayBooks(data.results);
    })
    .catch(error => {
      console.error('Fetch error:', error);
    })
    .finally(() => {
      // Hide the loading spinner after data is fetched or on error
      loadingElement.classList.add('hidden');
    });
}


// Display Books
function displayBooks(books) {
  const booksContainer = document.getElementById('books-container');
  

  books.forEach(book => {
    // Create a card for each book
    const bookCard = `
       <div class='transition hover:border-1 hover:scale-105 flex flex-grow'>
        <div class="bg-white shadow-md rounded-lg p-4">
          <img src="${book.formats['image/jpeg']}" alt="${book.title}" class="w-full h-64 object-cover rounded-t-md">
          <div class="p-4">
            <h1 class="text-xl font-bold mb-2">ID: ${book.id}</h1>
            <h2 class="text-xl font-bold mb-2">${book.title}</h2>
            <p class="text-gray-700 mb-2">By: ${book.authors.map(author => author.name).join(', ')}</p>
            <p class="text-gray-700 mb-2">Genre: ${book.bookshelves.join(', ')}</p>
            <div class="flex justify-between">
               <a href="${book.formats['text/html']}" class="text-cyan-500 hover:text-cyan-600 font-semibold">Read More</a>
              <!-- Wishlist Icon -->
              <span class="wishlist-icon cursor-pointer" onclick="wishList(${book.id})">
                 <ion-icon name="heart-outline" id="wishlist-icon-${book.id}"></ion-icon>
            </span>
            </div>
          </div>
        </div>
       </div>
    `;

    
    // Append the card to the container
    booksContainer.innerHTML += bookCard;
  });
}

// Call the function to fetch and display books
fetchBooks(page);


// Pagination 

function setupPagination(){
  console.log("--->", page)
   previous = document.getElementById('previous');
   current = document.getElementById('current');
   next = document.getElementById('next');

   

   previous.addEventListener("click", function () {
    if (page > 1){
      page = page - 1;
      current.innerText = page;
      console.log('previous', page);
      fetchBooks(page);
    }
   });

   next.addEventListener("click", function () {
    page = page + 1;
    console.log('next', page);
    current.innerText = page;
    fetchBooks(page);
  });
}

setupPagination()



// Search Functionality
const searchInput = document.getElementById('search');

searchInput.addEventListener('input', function (e) {
    const searchTerm = e.target.value.toLowerCase();
    filterBooks(searchTerm);
})


function filterBooks(searchTerm) {
  const filteredBooks = books.filter(book => 
     book.title.toLowerCase().includes(searchTerm)
  );

  const booksContainer = document.getElementById('books-container');
  booksContainer.innerHTML = ''
  
  console.log(filteredBooks)
  displayBooks(filteredBooks); 
}


// Dropdown Functionality
const genreDropdown = document.getElementById('genre');

genreDropdown.addEventListener('change', function() {
  const selectedGenre = genreDropdown.value;
  filterBooksByGenre(selectedGenre); 
});



function filterBooksByGenre(selectedGenre) {
  let filteredBooks;

  if (selectedGenre === 'all') {
    filteredBooks = books;
  } else {
    filteredBooks = books.filter(book => 
      book.bookshelves.some(genre => genre.includes(selectedGenre))
    );
  }
  
  
  const booksContainer = document.getElementById('books-container');
  booksContainer.innerHTML = '';
  displayBooks(filteredBooks); 
}


// Wish List

function getWishList(){
  const wishList = localStorage.getItem('wish-list');
  return wishList ? JSON.parse(wishList) : [];
}

function wishList(bookId){
  let wishBook = getWishList();

  if(wishBook.includes(bookId)) {
    wishBook = wishBook.filter(id => id != bookId)
  }else{
    wishBook.push(bookId)
  }

  localStorage.setItem('wish-list', JSON.stringify(wishBook));
  updateWishlistIcon(bookId);
}

function updateWishlistIcon(bookId) {
  const wishlist = getWishList();
  const iconElement = document.getElementById(`wishlist-icon-${bookId}`);
  
  if (wishlist.includes(bookId)) {
    iconElement.setAttribute('name', 'heart');
  } else {
    iconElement.setAttribute('name', 'heart-outline');
  }
}

function initializeWishlistIcons() {
  const wishlist = getWishlist();
  wishlist.forEach(bookId => updateWishlistIcon(bookId));
}

window.onload = function() {
  fetchBooks(page);
  initializeWishlistIcons(); 
};
