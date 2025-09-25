document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.getElementById('menu-btn');
    const fullscreenNav = document.getElementById('fullscreen-nav');
    const cross = document.getElementById('cross');
    const burger = document.getElementById('burger');

    menuBtn.addEventListener('click', function () {
        fullscreenNav.classList.toggle('hidden');
        cross.classList.toggle('hidden');
        if (fullscreenNav.classList.contains('hidden')) {
            burger.classList.remove('hidden');
        } else {
            burger.classList.add('hidden');
        }
    });
});
