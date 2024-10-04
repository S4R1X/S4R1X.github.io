window.addEventListener('scroll', function () {
    console.log(window.scrollY)
    const textBox = document.getElementById('aboutbox');
    if (window.scrollY > 0) {
        textBox.classList.add('visible'); // Add visibility when scrolled down 100px
    } else {
        textBox.classList.remove('visible');
    }
});