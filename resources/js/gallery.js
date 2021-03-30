// Click on the in-line button
const inLineButton = document.querySelector('#inLineButton');
inLineButton.addEventListener('click', function() {
    const gallery = document.querySelector('#gallery');
    gallery.setAttribute('class', 'inline');
});

// Click on the tidy-up button
const tidyButton = document.querySelector('#tidyButton');
tidyButton.addEventListener('click', function() {
    const gallery = document.querySelector('#gallery');
    gallery.setAttribute('class', 'tidy');
});