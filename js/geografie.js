document.getElementById('dropdown-button').addEventListener('click', function() {
    var dropdownContent = document.getElementById('dropdown-content');
    if (dropdownContent.style.display === 'none') {
        dropdownContent.style.display = 'block';
    } else {
        dropdownContent.style.display = 'none';
    }
});

document.getElementById('dropdown-button-climate').addEventListener('click', function() {
    var dropdownContent = document.getElementById('dropdown-content-climate');
    if (dropdownContent.style.display === 'none') {
        dropdownContent.style.display = 'block';
    } else {
        dropdownContent.style.display = 'none';
    }
});

