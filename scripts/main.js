// Navbar

function Menu(e) {
    let list = document.querySelector('ul');
    if (e.name === 'menu') {
      e.name = 'close';  
      list.classList.add('top-[80px]');
      list.classList.add('opacity-100');
    } else {
      e.name = 'menu';   
      list.classList.remove('top-[80px]');
      list.classList.remove('opacity-100');
    }
  }
  

 
// Fetch Books API

// Fetch Books API
function fetchBooks() {
  const loadingElement = document.getElementById('loading');
  const booksContainer = document.getElementById('books-container');

  // Show the loading spinner
  loadingElement.classList.remove('hidden');
  booksContainer.innerHTML = ''; // Clear any previous data

  fetch('https://gutendex.com/books')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
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
      <div class="bg-white shadow-md rounded-lg p-4">
        <img src="${book.formats['image/jpeg']}" alt="${book.title}" class="w-full h-64 object-cover rounded-t-md">
        <div class="p-4">
          <h2 class="text-xl font-bold mb-2">${book.title}</h2>
          <p class="text-gray-700 mb-2">By: ${book.authors.map(author => author.name).join(', ')}</p>
          <a href="${book.formats['text/html']}" class="text-cyan-500 hover:text-cyan-600 font-semibold">Read More</a>
        </div>
      </div>
    `;
    
    // Append the card to the container
    booksContainer.innerHTML += bookCard;
  });
}

// Call the function to fetch and display books
fetchBooks();
