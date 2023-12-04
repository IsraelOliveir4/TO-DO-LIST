function capturarDadosForm1() {
    const form = document.getElementById('form1')
    var email = document.getElementById('exampleInputEmail1').value
    var senha = document.getElementById('exampleInputPassword1').value

form.addEventListener('submit', e => {
    console.log(email)
    console.log(senha)
    e.preventDefault()
})
}

function capturarDadosForm2() {
    const form = document.getElementById('form2')
    var nome = document.getElementById('exampleInputText1').value
    var email2 = document.getElementById('exampleInputEmail1').value
    var senha2 = document.getElementById('exampleInputPassword1').value

form.addEventListener('submit', e => {
    console.log(nome)
    console.log(email2)
    console.log(senha2)
    e.preventDefault()
})
}









