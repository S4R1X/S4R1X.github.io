rules = false

function openRules() {
    document.getElementById('rules').classList.remove('going')
    document.getElementById('pre').classList.add('going')
    document.getElementById('rulesIcon').classList.add('going')
    rules = !rules
}
function closeRules() {
    document.getElementById('rulesIcon').classList.remove('going')
    document.getElementById('rules').classList.add('going')
    if (!sym) {
        document.getElementById('pre').classList.remove('going')
    }
    rules = !rules
}