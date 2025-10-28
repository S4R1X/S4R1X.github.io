const Observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if(entry.isIntersecting){
            entry.target.classList.add('slidIn')
        }else{
            entry.target.classList.remove('slidIn')
        }
    })
})

const hiddenItems = document.querySelectorAll('.slideIn')
hiddenItems.forEach((el) => Observer.observe(el))