function closePre(starter) {
    if (rules === false) {
        sym = starter
        document.getElementById('board').classList.remove('d-none')
        document.getElementById('pre').classList.add('d-none')
        let boards = document.getElementsByClassName('subboard')
        for (let index = 0; index < boards.length; index++) {
            if (index != 4) {
                boards[index].classList.add('b' + sym)
            }
        }
    }
}