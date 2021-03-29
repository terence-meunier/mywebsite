// Add post function
function getData(element) {

    // Title
    let div = document.createElement('div');
    div.setAttribute('class', 'post-content');
    let h3 = document.createElement('h3');
    h3.setAttribute('class', 'post-title');
    h3.textContent = element.title;
    div.appendChild(h3);

    // Description
    let p = document.createElement('p');
    p.setAttribute('class', 'post-description');
    p.textContent = element.description;
    div.appendChild(p);

    // Add footer
    let footer = document.createElement('div');
    footer.setAttribute('class', 'post-footer');
    let ul = document.createElement('ul');
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
            onSuccess(datas)
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

// DOM is load
$(function () {
    callAPI(datas => datas.map(getData));

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

// Function cleanPosts
function cleanPosts() {
    document.querySelectorAll('.post-content').forEach(element => element.remove());
}

// AddEventListener click on the reload button
document.querySelector('#reload').firstElementChild.addEventListener("click", function () {
    cleanPosts();
    setTimeout(callAPI(datas => datas.map(getData)), 1000);
});

// Toggle Form
function toggleForm() {
    isClickedAddFormButton = !isClickedAddFormButton;

    if (isClickedAddFormButton) {
        AddPostForm.setAttribute('style', 'display: block;');
    } else {
        AddPostForm.setAttribute('style', 'display: none;');
    }
}

// Dynamic Form
const AddPostForm = document.querySelector('#addPost');
AddPostForm.setAttribute('style', 'display: none');
let isClickedAddFormButton = false;
document.querySelector('#formAddPost').addEventListener('click', function () {
    toggleForm();    
});

// Action on the click on button addPostButton
document.querySelector('#addPostButton').addEventListener('click', addPost);

// Function addPost
function addPost() {
    // Création de l'objet
    const post = {};

    // Pattern de validation
    function isValid(element) {
        const pattern = /^[ ,'a-zA-Z][ ,'a-zA-Z]*$/;
        return pattern.test(element);
    }

    // Valider les champs du formulaire

    // Champ titre
    const title = document.querySelector('#postTitle');
    const errorTitle = document.querySelector('#errorTitle');
    // Si le champ titre est vide
    if (title.validity.valueMissing) {
        errorTitle.textContent = 'Titre manquant';
        errorTitle.style.color = 'red';
    } else {
        // Si le champ titre est valide
        if (isValid(title.value.trim())) {
            errorTitle.textContent = '';
            post.title = title.value.trim();
        } else {
            errorTitle.textContent = 'Les balises HTML sont interdites';
            errorTitle.style.color = 'red';
        }
    }

    // Champ description
    const description = document.querySelector('#postDescription');
    const errorDescription = document.querySelector('#errorDescription');
    // Si le champ description est vide
    if (description.validity.valueMissing) {
        errorDescription.textContent = 'Description manquante';
        errorDescription.style.color = 'red';
    } else {
        // Si le champ description est valide
        if (isValid(description.value.trim())) {
            errorDescription.textContent = '';
            post.description = description.value.trim();
        } else {
            errorDescription.textContent = 'Les balises HTML sont interdites';
            errorDescription.style.color = 'red';
        }
    }

    // Champ

    // Si l'objet post est valide le stocker en fichier json
    if(post.hasOwnProperty('title') && post.hasOwnProperty('description')) {
        
        // Persistance des posts
        // Récupère l'objet localStorage si il existe
        let posts = JSON.parse(localStorage.getItem("posts"));
        console.log(=)
        if (posts) {
            posts = [...posts, post];
            localStorage.setItem("posts", JSON.stringify(posts));
        } else {
            localStorage.setItem("posts", JSON.stringify(post));
        }

        // Nettoie les posts
        cleanPosts();
        // Recharge les posts de l'api et rajoute le post du formulaire
        callAPI(datas => [...datas, post].map(getData));
        toggleForm(); 
    }
}