
function capturarDadosForm1() {
    const form = document.getElementById('form1')
    var email = document.getElementById('exampleInputEmail1').value
    var senha = document.getElementById('exampleInputPassword1').value

form.addEventListener('submit', e => {
    console.log(email)
    console.log(senha)

    //e.preventDefault()

    var usuariosCadastrados = JSON.parse(localStorage.getItem('usuarios')) || [];
    console.log(usuariosCadastrados)
    var usuario = usuariosCadastrados.find(function (user) {
        return user.email === email && user.senha === senha;
    });

    console.log(usuario)

    if (!usuario) {
        alert('E-mail ou senha incorretos. Tente novamente.');
        return;
    }

    alert('Login bem-sucedido! Bem-vindo, ' + usuario.nome + '!');

    localStorage.setItem('usuario', JSON.stringify(usuario));

    window.location.href = "tarefas.html"
    })
}

function capturarDadosForm2() {
    const form = document.getElementById('form2')
    var nome = document.getElementById('exampleInputText1').value
    var email2 = document.getElementById('email2').value
    var senha2 = document.getElementById('senha2').value
    console.log(nome)
    console.log(email2)
    console.log(senha2)

form.addEventListener('submit', e => {
    var usuariosCadastrados = JSON.parse(localStorage.getItem('usuarios')) || [];
    var usuarioExistente = usuariosCadastrados.find(function (user) {
        return user.email == email2;
    });

    if (usuarioExistente) {
        alert('Este e-mail já está cadastrado.');
        return;
    }

    var novoUsuario = {
        nome: nome,
        email: email2,
        senha: senha2
    };

    usuariosCadastrados.push(novoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuariosCadastrados));

    document.getElementById('exampleInputText1').value = '';
    document.getElementById('exampleInputEmail1').value = '';
    document.getElementById('exampleInputPassword1').value = '';

    alert('Cadastro realizado com sucesso!');

    })
}

function sair() {    
    localStorage.removeItem('usuario');   
    window.location.href = "index.html";
}









