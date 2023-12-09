
function capturarDadosForm1() {
    const form = document.getElementById('form1')
    var email = document.getElementById('exampleInputEmail1').value
    var senha = document.getElementById('exampleInputPassword1').value

form.addEventListener('submit', e => {
    console.log(email)
    console.log(senha)

    e.preventDefault()

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

    cadastrarTarefa()
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
/////////////////////////////////////////////////// modal ///////////////////////////////////
function cadastrarTarefa() {
    var usuario = JSON.parse(localStorage.getItem('usuario'));
    
    if (!usuario) {
        console.error("Usuário não encontrado no localStorage. Redirecionando para a página de login.");
        return window.location.href = "index.html";  
    }

    var titulo = document.getElementById("texto").value;
    var dataInicio = document.getElementById("dataInicio").value;
    var horaInicio = document.getElementById("horaInicio").value;
    var dataTermino = document.getElementById("dataTermino").value;
    var horaTermino = document.getElementById("horaTermino").value;
    var descricao = document.getElementById("descricao").value;

    var novaTarefa = {
        id: gerarIdUnico(),
        titulo: titulo,
        dataInicio: dataInicio,
        horaInicio: horaInicio,
        dataTermino: dataTermino,
        horaTermino: horaTermino,
        descricao: descricao,
        status: "Pendente",
        usuarioId: usuario.email
    };

    function gerarIdUnico() {
        return Date.now(); 
    }

    var tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefas.push(novaTarefa);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    
    document.getElementById("formTarefa").reset();
    
    carregarTarefas(usuario);
}

function carregarTarefas(usuario) {
    var tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    
    var tabelaTarefas = document.getElementById("tarefasTableBody");
   
    tabelaTarefas.innerHTML = "";

    tarefas.forEach(function (tarefa, index) {
        if (tarefa.usuarioId === usuario.email) {
            var row = tabelaTarefas.insertRow();
            
            var colunaTarefa = row.insertCell(0);
            colunaTarefa.innerText = tarefa.titulo;
            
            colunaTarefa.addEventListener("click", function () {
                abrirModalDescricao(tarefa.titulo, tarefa.descricao);
            });
            
            var colunaInicio = row.insertCell(1);
            colunaInicio.innerText = `${tarefa.dataInicio} ${tarefa.horaInicio}`;
           
            var colunaTermino = row.insertCell(2);
            colunaTermino.innerText = `${tarefa.dataTermino} ${tarefa.horaTermino}`;
           
            var colunaStatus = row.insertCell(3);
            colunaStatus.innerText = verificarStatus(tarefa);
           
            var colunaAcoes = row.insertCell(4);
            var botaoAlterar = document.createElement("button");
            botaoAlterar.innerText = "Alterar";
            botaoAlterar.classList.add("botao-alterar");
            botaoAlterar.onclick = function () {
                redirecionarParaPaginaAlterar(tarefa.id); 
            };
           
            colunaAcoes.appendChild(botaoAlterar);           
        }
    });
}

function redirecionarParaPaginaAlterar(tarefaId) {    
    window.location.href = "alterarTarefa.html?tarefaId=" + tarefaId;
}


function verificarStatus(tarefa) {
    var dataAtual = new Date();
    var dataInicio = new Date(tarefa.dataInicio + " " + tarefa.horaInicio);
    var dataTermino = new Date(tarefa.dataTermino + " " + tarefa.horaTermino);

    if (tarefa.status === "Realizada") {
        return "Realizada";
    } else if (dataAtual < dataInicio) {
        return "Pendente";
    } else if (dataAtual >= dataInicio && dataAtual <= dataTermino) {
        return "Em andamento";
    } else {
        return "Em Atraso";
    }
}

function apagarTodosUsuarios() {    
    localStorage.removeItem('usuarios');
    localStorage.removeItem('tarefas');
    
    localStorage.removeItem('usuario');
    localStorage.removeItem('tarefa');
    
    alert("Todos os usuários foram removidos.");
}


function abrirModalDescricao(titulo, descricao) {
    var modal = document.getElementById("modalDescricao");
    var modalTitulo = document.getElementById("modalTitulo");
    var modalDescricaoTexto = document.getElementById("modalDescricaoTexto");

    modal.classList.add("mostrar-modal");

    modal.style.display = "block";
    modalTitulo.innerText = titulo;
    modalDescricaoTexto.innerText = descricao;

    var closeButton = document.createElement("span");
    closeButton.className = "close";
    closeButton.innerHTML = "&times;";
    closeButton.onclick = fecharModalDescricao;

    modalTitulo.appendChild(closeButton);
}

function fecharModalDescricao() {
    var modal = document.getElementById("modalDescricao");    
    modal.classList.remove("mostrar-modal");
    modal.style.display = "none";
}








