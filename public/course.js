const searchInput = document.getElementById('search');
searchInput.addEventListener('input', function() {
    if (this.value !== '') {
      this.removeAttribute('placeholder');
      const position = this.value.length;
      const middleIndex = Math.floor(position / 2);
      this.setSelectionRange(middleIndex, middleIndex);    
    } 
    else {
      this.setAttribute('placeholder', 'Search courses');
    }
  });

 



