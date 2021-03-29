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

// AddEventListener click on the reload button
document.querySelector('#reload').firstElementChild.addEventListener("click", function (){
    document.querySelectorAll('.post-content').forEach(element => element.remove());
    setTimeout(callAPI(datas => datas.map(getData)), 1000);
});

// Dynamic Form
const AddPostForm = document.querySelector('#addPost');
AddPostForm.setAttribute('style', 'display: none');
let isClickedAddFormButton = false;
document.querySelector('#formAddPost').addEventListener('click', function() {

    isClickedAddFormButton = !isClickedAddFormButton;

    if (isClickedAddFormButton) {
        AddPostForm.setAttribute('style', 'display: block;');
    } else {
        AddPostForm.setAttribute('style', 'display: none;');
    }
});

// Function addPost
function addPost() {
    
}