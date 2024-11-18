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