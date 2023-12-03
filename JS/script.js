var btn1 = document.getElementsByClassName('.btn1Email')
var btn2 = document.getElementsByClassName('.btn1Senha')
var logar = document.getElementsByClassName('.btn1login')

function teste() {
    console.log(btn1.value)
    console.log(btn2) 
}















const form = document.getElementById('some-form')
form.addEventListener('submit', e => {
    e.preventDefault()
    console.log('Deu certo')
})