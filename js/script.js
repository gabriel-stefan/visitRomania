document.getElementById('fade-in-text').addEventListener('click', function() {
    var menu = document.getElementById('menu');
    if (menu.style.opacity == 0) {
        menu.style.display = 'flex'; 
        setTimeout(function() {
            menu.style.opacity = 1; 
        }, 50); 
    } else {
        menu.style.opacity = 0; 
        setTimeout(function() {
            menu.style.display = 'none'; 
        }, 500); 
    }
});
