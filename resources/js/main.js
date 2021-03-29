// Menu Bloc
const navigationBloc = document.querySelector('.nav-collapse');
navigationBloc.setAttribute('style', 'display: none');
let isClickedMenuButton = false;
document.querySelector('#menu').addEventListener('click', function() {

    isClickedMenuButton = !isClickedMenuButton;

    if (isClickedMenuButton) {
        navigationBloc.setAttribute('style', 'display: block;');
    } else {
        navigationBloc.setAttribute('style', 'display: none;');
    }
});