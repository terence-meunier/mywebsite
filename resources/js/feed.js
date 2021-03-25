$(function() {
    let ghibliAPI = "https://ghibliapi.herokuapp.com/films/";
    $.getJSON(ghibliAPI).done(function(datas) {
        
        function getTitle(element) {
            let div = document.createElement('div');
            div.setAttribute('class', 'post-title');
            let h3 = document.createElement('h3');
            h3.textContent = element.title;
            div.appendChild(h3);
            document.querySelector('#main-content').appendChild(div);
        }
        
        datas.map(getTitle);
    });
});