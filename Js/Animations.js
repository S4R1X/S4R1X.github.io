const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('slidIn');
        } else {
            entry.target.classList.remove('slidIn');
        }
    });
});

document.querySelectorAll('.slideToLeft, .slideToRight').forEach(el => observer.observe(el));