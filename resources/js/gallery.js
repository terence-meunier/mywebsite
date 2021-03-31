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
    const addImgForm = document.querySelector('#addImgForm');
    const formAddPicture = document.querySelector('#formAddPicture');
    if (addFormImgIsVisible) {
        formAddPicture.setAttribute('style', 'display: none');
        addImgForm.textContent = "+";
    } else {
        formAddPicture.setAttribute('style', 'display: block');
        addImgForm.textContent = "X";
    }

    // Inversion de visibilité
    addFormImgIsVisible = !addFormImgIsVisible;
}

// Event on click button addImgForm
document.querySelector('#addImgForm').addEventListener('click', () => toggleFormImg());

// Récupération de l'url dans le champ de texte quand on clique sur le bouton du formulaire
document.querySelector('#addImgButton').addEventListener('click', function() {
    // Création du nouvel élement de type div
    const div = document.createElement('div');
    // Ajouter la classe img-thumbnail
    div.className = 'img-thumbnail';
    // Créé la div pour le suppression de l'élément
    const divDelete = document.createElement('div');
    // Ajouter une classe delete-img a la div
    divDelete.className = "delete-img";
    // Masquer la croix du delete
    divDelete.style = "display: none";
    // Ajouter le bouton de suppression
    const buttonDelete = document.createElement('button');
    // Ajouter la classe main-button au bouton delete
    buttonDelete.className = "main-button";
    // Ajouter le contenu du bouton
    buttonDelete.textContent = "X";
    // Ajout de l'event listener sur le bouton delete
    buttonDelete.addEventListener('click', function() {
        this.parentElement.parentElement.remove();
    });
    // Ajouter le bouton dans la div delete
    divDelete.appendChild(buttonDelete);
    // Ajouter la div delete dans la div principale de l'image
    div.appendChild(divDelete);
    // Ajout de l'image elle-même
    const img = document.createElement('img');
    img.src = document.querySelector('#urlImg').value;
    // Ajout de l'image dans le div principal de l'image
    div.appendChild(img);
    // Ajout de la div principale dans la balise gallery
    document.querySelector('#gallery').appendChild(div);
    // On referme la div du formulaire d'ajout d'image
    toggleFormImg();
});

// Add event listener for the delete img button
document.querySelectorAll('.delete-img').forEach(function (element) {
    element.querySelector('button').addEventListener('click', function() {
        this.parentElement.parentElement.remove();
    });
});

// Set deleteImg display none
document.querySelectorAll('.delete-img').forEach(function(element) {
    element.style = 'display: none';
});

let deleteImgIsVisible = false;
// Toggle function for form visibility
function toggleDeleteImg() {
    if (deleteImgIsVisible) {
        document.querySelectorAll('.delete-img').forEach(element => element.style = "display: none");
        document.querySelector('#deleteImg').textContent = 'Delete a picture';
    } else {
        document.querySelectorAll('.delete-img').forEach(element => element.style = "display: block");
        document.querySelector('#deleteImg').textContent = 'Cancel';
    }

    deleteImgIsVisible = !deleteImgIsVisible;
}

// Add event listener sur le bouton deleteImg 
document.querySelector('#deleteImg').addEventListener('click', () => toggleDeleteImg());