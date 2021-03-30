// Fonction si le DOM est chargé
$(function () {
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