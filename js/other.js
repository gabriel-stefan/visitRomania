document.addEventListener('DOMContentLoaded', () => {
    const steag = document.getElementById('flag-container');
    const culoriButon = document.querySelectorAll('.color-btn');
    let selectedColor = '';
    const colors = ['red', 'yellow', 'blue', 'green', 'orange', 'purple'];

    for (let i = 0; i < 27; i++) {
        const box = document.createElement('div');
        box.classList.add('flag-box');
        steag.appendChild(box);
    }

    setInterval(() => {
        culoriButon.forEach(button => {
            const culoareRandom = colors[Math.floor(Math.random() * colors.length)];
            button.style.backgroundColor = culoareRandom;
            button.dataset.color = culoareRandom;
        });
    }, 1000); 

    culoriButon.forEach(button => {
        button.addEventListener('click', (event) => {
            selectedColor = button.dataset.color;

            const computedStyle = getComputedStyle(button);
            console.log(`Culoare background: ${computedStyle.backgroundColor}`);

            event.stopPropagation();
        });
    });

    steag.addEventListener('click', (e) => {
        if (e.target.classList.contains('flag-box') && selectedColor) {
            e.target.style.backgroundColor = selectedColor;
        }
    });

    const form = document.getElementById('contact-form');
    const storedEmail = localStorage.getItem('email');
    const storedPhone = localStorage.getItem('phone');
    const storedMessage = localStorage.getItem('message');
    if (storedEmail) form.elements['email'].value = storedEmail;
    if (storedPhone) form.elements['phone'].value = storedPhone;
    if (storedMessage) form.elements['message'].value = storedMessage;

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const email = form.elements['email'].value;
        const phone = form.elements['phone'].value;
        const message = form.elements['message'].value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{10}$/;

        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (!phoneRegex.test(phone)) {
            alert('Please enter a valid 10-digit phone number.');
            return;
        }

        localStorage.setItem('email', email);
        localStorage.setItem('phone', phone);
        localStorage.setItem('message', message);

        console.log(`Mesaj Salvat: ${message}`);

        alert('Form submitted successfully!');

        form.reset();
    });
});
