const dialog1 = document.querySelector('#dialog1')

const closeBtn1 = document.querySelector('#closemodel1')
const openBtn1 = document.querySelector('#openmodel1')

openBtn1.addEventListener('click', () => dialog1.showModal())
closeBtn1.addEventListener('click', () => dialog1.close())
