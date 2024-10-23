var dados_pizza = [
    ['Status', 'Total'],
    ['0', 0]
];

async function carregarDadosPizza() {
    await fetch('https://covid19-brazil-api.vercel.app/api/report/v1/countries') 
        .then(response => response.json())     
        .then(dados => prepararDadosPizza(dados))   
}

function prepararDadosPizza(dados) {
    
    if (dados['data'].length > 0) {  

        dados_pizza = [['Status', 'Total']];

        let confirmados = 0;
        let recuperados = 0;
        let mortos = 0;

        for (let i = 0; i < dados['data'].length; i++) {  
            confirmados += dados['data'][i].confirmed;
            recuperados += dados['data'][i].recovered;
            mortos += dados['data'][i].deaths;
        }

        
        dados_pizza.push(['Confirmados', confirmados]);
        dados_pizza.push(['Recuperados', recuperados]);
        dados_pizza.push(['Mortos', mortos]);

        //console.table(dados_pizza);

        desenharGraficoPizza();
    }
}




google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(desenharGraficoPizza);

function  desenharGraficoPizza() {

   // console.table(dados_pizza);    
  var data = google.visualization.arrayToDataTable(dados_pizza);

  var options = {
    title: 'Casos Totais pelo Mundo'
  };

  var chart = new google.visualization.PieChart(document.getElementById('grafico-pizza'));

  chart.draw(data, options);
}

document.addEventListener("DOMContentLoaded", function (event) {
    carregarDadosPizza();
});

