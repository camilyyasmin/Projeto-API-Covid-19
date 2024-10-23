async function carregarDadosTabela() {

    await fetch('https://covid19-brazil-api.now.sh/api/report/v1')  
        .then(response => response.json())           
        .then(dados => prepararDadosTabela(dados))            
}

function prepararDadosTabela(dados) {
    console.table(dados);

    let linhas = document.getElementById('linhas');
    linhas.innerHTML = '';

    for (let i = 0; i < dados['data'].length; i++) {
        let elemento = '<tr>' +
                        '<td>' + dados['data'][i].uf + '</td>' +
                        '<td>' + dados['data'][i].state + '</td>' +
                        '<td>' + dados['data'][i].cases + '</td>' +
                        '<td>' + dados['data'][i].deaths + '</td>' +
                        '<td>' + dados['data'][i].suspects + '</td>' +
                        '<td>' + dados['data'][i].refuses + '</td>' +
                 '</tr>';

        linhas.innerHTML += elemento;  
    }

}

document.addEventListener("DOMContentLoaded", function (event) {
    carregarDadosTabela();
});
