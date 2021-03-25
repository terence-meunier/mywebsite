$(function() {
    let ghibliAPI = "https://ghibliapi.herokuapp.com/films/";
    $.getJSON(ghibliAPI)
    .done(function(datas) {
        
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
            
            // Add div in the DOM
            document.querySelector('#main-content').appendChild(div);
        }
        
        datas.map(getData);
    })
    .fail(function(error) {
        console.log("La requête s'est terminée en échec.");
        console.log("Status code: " + error.status);
        console.log("Status text : " + error.statusText);
    })
    .always(function() {
        console.log("Requête effectuée");
    });
});