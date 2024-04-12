function openRules() {
    document.getElementById('rules').classList.remove('going')
    document.getElementById('rulesIcon').classList.add('going')
    rules = !rules
}
function closeRules() {
    document.getElementById('rulesIcon').classList.remove('going')
    document.getElementById('rules').classList.add('going')
    rules = !rules
}