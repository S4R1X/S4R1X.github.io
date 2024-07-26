rules = false

function openRules() {
    document.getElementById('rules').classList.remove('d-none')
    document.getElementById('pre').classList.add('d-none')
    document.getElementById('rulesIcon').classList.add('d-none')
    rules = !rules
}
function closeRules() {
    document.getElementById('rulesIcon').classList.remove('d-none')
    document.getElementById('rules').classList.add('d-none')
    if (!sym) {
        document.getElementById('pre').classList.remove('d-none')
    }
    rules = !rules
}