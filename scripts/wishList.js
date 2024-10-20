function getWishlist() {
    const wishlist = localStorage.getItem('wish-list');
    return wishlist ? JSON.parse(wishlist) : [];
  }
  
  
  async function displayWishlistBooks() {
    const wishlist = getWishlist(); 
    const loading = document.getElementById('loading');
    const wishlistContainer = document.getElementById('wishlist-container'); 
  
    wishlistContainer.innerHTML = ''; 
    
    if (wishlist.length === 0) {
      wishlistContainer.innerHTML = "<p class='text-center'>No books in wishlist!</p>";
      return;
    }
  
    // Spinner Enable
    loading.classList.remove('hidden');
  
    try {
      for (const bookId of wishlist) {
        const response = await fetch(`https://gutendex.com/books/${bookId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const book = await response.json();

        const bookCard = `
          <div class='transition hover:border-1 hover:scale-105'>
            <div class="bg-white shadow-md rounded-lg p-4">
              <img src="${book.formats['image/jpeg']}" alt="${book.title}" class="w-full h-64 object-cover rounded-t-md">
              <div class="p-4">
                <h1 class="text-xl font-bold mb-2">ID: ${book.id}</h1>
                <h2 class="text-xl font-bold mb-2">${book.title}</h2>
                <p class="text-gray-700 mb-2">By: ${book.authors.map(author => author.name).join(', ')}</p>
                <p class="text-gray-700 mb-2">Genre: ${book.bookshelves.join(', ')}</p>
                <a href="${book.formats['text/html']}" class="text-cyan-500 hover:text-cyan-600 font-semibold">Read More</a>
              </div>
            </div>
          </div>
        `;
        wishlistContainer.innerHTML += bookCard;
      }
    } catch (error) {
      console.error('Error fetching book details:', error);
      wishlistContainer.innerHTML = "<p class='text-center'>Error loading wishlist. Please try again later.</p>";
    } finally {
      // Spinner Disable
      loading.classList.add('hidden');
    }
  }
  

  window.onload = function() {
    displayWishlistBooks();
  };
  