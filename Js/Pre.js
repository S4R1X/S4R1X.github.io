function closePre(starter) {
    sym = starter
    document.getElementById('board').classList.remove('going')
    document.getElementById('pre').classList.add('going')
    let boards = document.getElementsByClassName('subboard')
    for (let index = 0; index < boards.length; index++) {
        if (index != 4) {
            boards[index].classList.add('b' + sym)
        }
    }
}