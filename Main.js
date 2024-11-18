document.querySelector('.callink').addEventListener('click', function (event) {
    event.preventDefault();
    document.querySelector('#calendar').scrollIntoView({ behavior: 'smooth' });
});

let lastScrollPosition = 0;
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
    const currentScrollPosition = window.pageYOffset;

    if (currentScrollPosition > lastScrollPosition) {
        // Scrolling down: hide the header
        header.classList.add("hidden");
    } else if (currentScrollPosition < lastScrollPosition) {
        // Scrolling up: show the header
        header.classList.remove("hidden");
    }

    lastScrollPosition = currentScrollPosition;
});