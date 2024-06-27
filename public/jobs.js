// Get all buttons and divs
const buttons = document.querySelectorAll('.category-button');
const divs = document.querySelectorAll('.category-div');

// Add click event listener to each button
buttons.forEach(function(button) {
  button.addEventListener('click', function() {
    const category = this.getAttribute('data-category');
    
    // Hide all divs
    divs.forEach(function(div) {
      div.style.display = 'none';
    });
    
    // Show divs with the selected category
    const selectedDivs = document.querySelectorAll(`.category-div.${category}`);
    selectedDivs.forEach(function(div) {
      div.style.display = 'grid';
    });
  });
});
