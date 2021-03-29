// Hidden navigation bloc
const navigationBloc = document.querySelector('.nav-collapse');
navigationBloc.setAttribute('style', 'display: none');
let isClicked = false;
document.querySelector('#menu').addEventListener('click', function() {

    isClicked = !isClicked;

    if (isClicked) {
        navigationBloc.setAttribute('style', 'display: block;');
    } else {
        navigationBloc.setAttribute('style', 'display: none;');
    }
});