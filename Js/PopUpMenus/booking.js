const dialog = document.querySelector('#dialog2')

const closeBtn = document.querySelector('#closemodel2')
const openBtn = document.querySelector('#openmodel2')

openBtn.addEventListener('click', () => dialog.showModal())
closeBtn.addEventListener('click', () => dialog.close())