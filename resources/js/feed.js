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

            // Add footer
            let footer = document.createElement('div');
            footer.setAttribute('class', 'post-footer');
            let ul = document.createElement('ul');
            // Director
            let li = document.createElement('li');
            li.textContent = "Director : " + element.director;
            ul.appendChild(li);
            // Producer
            li = document.createElement('li');
            li.textContent = "Producer : " + element.producer;
            ul.appendChild(li);
            // release date
            li = document.createElement('li');
            li.textContent = "Année de sortie : " + element.release_date;
            ul.appendChild(li);
            footer.appendChild(ul);
            div.appendChild(footer);
            
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

    // Carousel
    $('.jcarousel')
        .jcarousel({
            animation: {
                duration: 2500,
                easing:   'linear',
                complete: function() {
                }
            },
            wrap: 'circular',
            center: true,
        })
        .jcarouselAutoscroll({
            interval: 2500,
            target: '+=1',
            autostart: true
        });
});