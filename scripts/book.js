
const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get('id');


async function fetchBookDetails() {
  try {
    const response = await fetch(`https://gutendex.com/books/${bookId}`);
    const book = await response.json();


    const bookDetailsContainer = document.getElementById('book-details-container');
    const bookDetails = `
      <div class="bg-white shadow-md rounded-lg p-10">
        <img src="${book.formats['image/jpeg']}" alt="${book.title}" class="w-full h-64 object-cover rounded-t-md">
        <h1 class="text-3xl font-bold mt-4">${book.title}</h1>
        <p class="mt-2 text-gray-700">By: ${book.authors.map(author => author.name).join(', ')}</p>
        <p class="mt-2 text-gray-700">Genre: ${book.bookshelves.join(', ')}</p>
        <p class="mt-4">${book.formats['text/plain; charset=utf-8']}</p>
        <a href="${book.formats['text/html']}" class="mt-4 inline-block text-cyan-500 hover:text-cyan-600 font-semibold">Read Full Book</a>
      </div>
    `;


    bookDetailsContainer.innerHTML = bookDetails;

  } catch (error) {
    console.error('Error fetching book details:', error);
    document.getElementById('book-details-container').innerHTML = '<p class="text-center text-red-500">Failed to load book details. Please try again later.</p>';
  }
}


window.onload = fetchBookDetails;
