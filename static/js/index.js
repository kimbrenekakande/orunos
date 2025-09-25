document.addEventListener('DOMContentLoaded', function () {
    const menuBtnOpen = document.getElementById('menu-btn-open');
    const menuBtnClose = document.getElementById('menu-btn-close');
    const fullscreenNav = document.getElementById('fullscreen-nav');

    menuBtnOpen.addEventListener('click', function () {
        fullscreenNav.classList.remove('hidden');
    });

    menuBtnClose.addEventListener('click', function () {
        fullscreenNav.classList.add('hidden');
    });
});
