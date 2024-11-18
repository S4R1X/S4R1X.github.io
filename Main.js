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


const openBtn = document.querySelector('#openmodel')
const openBtn2 = document.querySelector('#openmodel2')

const dialog = document.querySelector('#dialog')
const closeBtn = document.querySelector('#closemodel')

openBtn.addEventListener('click', () => dialog.showModal())
openBtn2.addEventListener('click', () => dialog.showModal())
closeBtn.addEventListener('click', () => dialog.close())


const hamburgerBtn = document.querySelector('#Hamburger')
const upBtn = document.querySelector('#backUp')

hamburgerBtn.addEventListener('click', () => dropDownToggle())
upBtn.addEventListener('click', () => dropDownToggle())


let dropOpen = false;
const dropMen = document.getElementById("dropper");

function dropDownToggle() {

    console.log('hit')
    dropOpen = !dropOpen;

    if (dropOpen) {
        console.log(dropOpen)
        dropMen.classList.add("show");
    } else {
        dropMen.classList.remove("show");
        console.log(dropOpen)

    }

    console.log(dropMen.classList)
}


// hamburgerBtn.addEventListener('click', () => )