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
  

  console.log("Fetch Book start")
// Fetch Books API
fetch('https://gutendex.com/books')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => { 
    console.log(data.results);
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });
