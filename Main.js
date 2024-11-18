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


const openBtn1 = document.querySelector('#openmodel1')
const openBtn2 = document.querySelector('#openmodel2')

const dialog1 = document.querySelector('#dialog1')
const dialog2 = document.querySelector('#dialog2')
const closeBtn1 = document.querySelector('#closemodel1')
const closeBtn2 = document.querySelector('#closemodel2')

openBtn1.addEventListener('click', () => dialog1.showModal())
openBtn2.addEventListener('click', () => dialog2.showModal())
closeBtn1.addEventListener('click', () => dialog1.close())
closeBtn2.addEventListener('click', () => dialog2.close())


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