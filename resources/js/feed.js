// Fonctions

// Add post function
function getData(element) {

    // Div post content
    const div = document.createElement('div');
    div.setAttribute('class', 'post-content');

    // Add delete button
    const divDelete = document.createElement('div');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = "X";
    deleteButton.className = "main-button";
    divDelete.className = "delete-post";
    divDelete.appendChild(deleteButton);
    div.appendChild(divDelete);

    // Title
    const h3 = document.createElement('h3');
    h3.setAttribute('class', 'post-title');
    h3.textContent = element.title;
    div.appendChild(h3);

    // Description
    const p = document.createElement('p');
    p.setAttribute('class', 'post-description');
    p.textContent = element.description;
    div.appendChild(p);

    // Add footer
    const footer = document.createElement('div');
    footer.setAttribute('class', 'post-footer');
    const ul = document.createElement('ul');
    // Director
    let li = document.createElement('li');
    li.textContent = "Director | " + element.director;
    ul.appendChild(li);
    // Producer
    li = document.createElement('li');
    li.textContent = "Producer | " + element.producer;
    ul.appendChild(li);
    // release date
    li = document.createElement('li');
    li.textContent = "Année de sortie | " + element.release_date;
    ul.appendChild(li);
    footer.appendChild(ul);
    div.appendChild(footer);

    // Add div in the DOM
    document.querySelector('#main-content').appendChild(div);
}

// Call API
function callAPI(onSuccess) {
    $.getJSON("https://ghibliapi.herokuapp.com/films/")
        .done(function (datas) {
            onSuccess(datas);

            // Delete action on the click button
            document.querySelectorAll('.delete-post').forEach(function (element) {
                element.querySelector('button').addEventListener('click', function () {
                    //this.parentElement.parentElement.remove();
                    deletePost(this.parentElement.parentElement);
                });
            });
        })
        .fail(function (error) {
            console.log("La requête s'est terminée en échec.");
            console.log("Status code: " + error.status);
            console.log("Status text : " + error.statusText);
        })
        .always(function () {
            console.log("Requête effectuée");
        });
};

// Fonction récupérant les posts persistés
function getLocalPosts() {
    const posts = JSON.parse(localStorage.getItem("posts"));
    if (posts != null) {
        return posts;
    } else {
        return [];
    }
}

// Function cleanPosts
function cleanPosts() {
    document.querySelectorAll('.post-content').forEach(element => element.remove());
}

// Toggle Form
function toggleForm() {
    isClickedAddFormButton = !isClickedAddFormButton;

    if (isClickedAddFormButton) {
        AddPostForm.setAttribute('style', 'display: block;');
    } else {
        AddPostForm.setAttribute('style', 'display: none;');
    }
}

// Function addPost
function addPost() {

    // Function addPostElement
    function addPostElement(elementName, type) {
        // Champ element
        const elt = document.querySelector('#post' + elementName.charAt(0).toUpperCase() + elementName.slice(1, elementName.length));
        const err = document.querySelector('#error' + elementName.charAt(0).toUpperCase() + elementName.slice(1, elementName.length));
        // Si le champ element est vide
        if (elt.validity.valueMissing) {
            err.textContent = 'Titre manquant';
            err.style.color = 'red';
        } else {
            // Si le champ element est un texte
            if (type == 'text') {
                if (isValid(elt.value.trim())) {
                    err.textContent = '';
                    post[elementName] = elt.value.trim();
                } else {
                    err.textContent = 'Les balises HTML sont interdites';
                    err.style.color = 'red';
                }
            } else if (type == 'number') {
                // Si le champ description est valide
                if (isValidNumber(elt.value.trim())) {
                    err.textContent = '';
                    post[elementName] = elt.value.trim();
                } else {
                    err.textContent = 'Ce champ doit être un chiffre à 4 digits';
                    err.style.color = 'red';
                }
            }
        }
    }

    // Création de l'objet
    const post = {};

    // Pattern de validation pour les champs de textes
    function isValid(element) {
        const pattern = /^[ ,'.a-zA-Zéèàçù][ ,'.a-zA-Zéèàçù]*$/;
        return pattern.test(element);
    }

    // Pattern de validation pour les champs numériques
    function isValidNumber(element) {
        const pattern = /^[0-9]{4}$/;
        return pattern.test(element);
    }

    // Valider les champs du formulaire
    // Champ titre
    addPostElement('title', 'text');
    //addPostElement('description', 'text');
    //addPostElement('directeur', 'text');
    //addPostElement('producer', 'text');
    //addPostElement('release_date', 'number');
    

    // Si l'objet post est valide le stocker en fichier json
    if (post.hasOwnProperty('title')
        && post.hasOwnProperty('description')
        && post.hasOwnProperty('director')
        && post.hasOwnProperty('producer')
        && post.hasOwnProperty('release_date')) {

        // Persistance des posts
        // Récupère l'objet localStorage
        let posts = JSON.parse(localStorage.getItem("posts"));

        // Si il existe
        if (posts) {
            // On ajoute le nouveau post au tableau des données
            posts.push(post);
            // On restocke en localStorage
            localStorage.setItem("posts", JSON.stringify(posts));
        } else {
            // On créé le tableau de données
            posts = [];
            // On ajoute le post courant
            posts.push(post);
            // On stocke en localStorage
            localStorage.setItem("posts", JSON.stringify(posts));
        }

        // Nettoie les posts
        cleanPosts();
        // Recharge les posts de l'api et rajoute le post du formulaire
        callAPI(datas => [...datas, ...posts].map(getData));
        toggleForm();
    }
}

// Function deletePost
function deletePost(element) {
    // Récupérer le tableau de localStorage
    let posts = JSON.parse(localStorage.getItem('posts'));

    // Si posts est différent de null (si il existe dans le localStorage)
    if (posts != null) {

        posts.forEach(function (item, index) {
            // Check dans le tableau si l'élément existe
            if (item.title == element.firstChild.nextSibling.textContent) {
                // Le supprimer du tableau
                posts.splice(index, 1);
            }
        });
    }
    // Supprimer l'élement du DOM
    element.remove();

    // recharger le tableau dans le localStorage
    localStorage.setItem('posts', JSON.stringify(posts));
}

// Fonction si le DOM est chargé
$(function () {
    // Chargement des posts dans le feed
    callAPI(datas => [...datas, ...getLocalPosts()].map(getData));

    // Gestion du carousel
    // Carousel
    $('.jcarousel')
        .jcarousel({
            animation: {
                duration: 2500,
                easing: 'linear',
                complete: function () {
                }
            },
            wrap: 'circular',
            center: true,
        })
        .jcarouselAutoscroll({
            interval: 2500,
            target: '+=1',
            autostart: true,
        });

    // Navigation carousel
    $('.jcarousel-prev').jcarouselControl({
        target: '-=1',
    });

    $('.jcarousel-next').jcarouselControl({
        target: '+=1',
    });

    // Pagination carousel
    $('.jcarousel-pagination').jcarouselPagination({
        item: function (page) {
            return '<a href="#' + page + '"><img src="resources/img/png/cercle.png"/></a>';
        }
    });

});

// AddEventListener click on the reload button
document.querySelector('#reload').firstElementChild.addEventListener("click", function () {
    cleanPosts();
    setTimeout(callAPI(datas => [...datas, ...getLocalPosts()].map(getData)), 1000);
});

// Gestion du formulaire dynamique
const AddPostForm = document.querySelector('#addPost');
AddPostForm.setAttribute('style', 'display: none');
let isClickedAddFormButton = false;
document.querySelector('#formAddPost').addEventListener('click', function () {
    toggleForm();
});

// Action on the click on button addPostButton
document.querySelector('#addPostButton').addEventListener('click', addPost);