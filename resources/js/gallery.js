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

// Set addFormImg display none
document.querySelector('#formAddPicture').setAttribute('style', 'display: none');
let addFormImgIsVisible = false;

// Toggle function for form visibility
function toggleFormImg() {
    const formAddPicture = document.querySelector('#formAddPicture');
    if (addFormImgIsVisible) {
        formAddPicture.setAttribute('style', 'display: none');
    } else {
        formAddPicture.setAttribute('style', 'display: block');
    }

    // Inversion de visibilité
    addFormImgIsVisible = !addFormImgIsVisible;
}

// Event on click button addImgForm
document.querySelector('#addImgForm').addEventListener('click', () => toggleFormImg());