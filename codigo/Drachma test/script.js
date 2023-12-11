document.addEventListener('DOMContentLoaded', function() {
  var button = document.querySelector('.button');
  var popup = document.querySelector('.popup');
  var moedaSelect = document.getElementById('moeda');

  // Carrega as opções de moeda a partir do JSON Server
  fetch('https://jsonserverex--astlar.repl.co/coins')
    .then(response => response.json())
    .then(data => {
      data.forEach(moeda => {
        var option = document.createElement('option');
        option.value = moeda.symbol;
        option.textContent = `${moeda.name} - ${moeda.symbol}`;
        moedaSelect.appendChild(option);
      });
    })
    .catch(error => console.error('Erro ao carregar moedas:', error));

  button.addEventListener('click', function () {
    popup.classList.add('show');
  });
});

function saveData() {
  var valor = parseFloat(document.getElementById('valor').value);
  var moedaCodigo = document.getElementById('moeda').value;

  if (!isNaN(valor) && moedaCodigo) {
    var data = {valor: valor, moeda: moedaCodigo};

    localStorage.setItem('dados', JSON.stringify(data));

    document.getElementById('valor').value = '';
    document.getElementById('moeda').value = '';

    alert('Dados salvos com sucesso!');
  } else {
    alert('Por favor, preencha todos os campos corretamente.');
  }

  closePopup();
}

function handleButtonClick() {
  var popup = document.querySelector('.popup');
  popup.classList.add('show');
}

function closePopup() {
  var popup = document.querySelector('.popup');
  popup.classList.remove('show');
}

function notificadorPrecos() {
  console.log('Verificando preços...');

  // Recupera os dados armazenados no localStorage
  var jsonData = localStorage.getItem('dados') || '[]';
  var dadosArmazenados = JSON.parse(jsonData);

  // Verifica os dados armazenados no localStorage
  console.log('Dados Armazenados:', dadosArmazenados);

  // Itera sobre os dados armazenados e faz uma requisição ao JSON Server para obter os preços reais
  var valorCriptomoeda = dadosArmazenados.valor;
  var moeda = dadosArmazenados.moeda;

  console.log('Verificando preço da criptomoeda:', moeda);

  // Faz a requisição ao JSON Server para obter o preço atual
  fetch(`https://jsonserverex--astlar.repl.co/coins?symbol=${moeda}`)
    .then(response => response.json())
    .then(data => {
      var precoAtual = data[0].usd;
      console.log(`Preço atual de ${moeda}: ${precoAtual} USD`);

      // Compara o preço atual com o valor armazenado
      if (precoAtual === valorCriptomoeda) {
        // Exibe um popup com uma mensagem
        var mensagem = `Parabéns! O valor desejado de ${valorCriptomoeda} foi atingido na criptomoeda ${moeda}. Preço atual: ${precoAtual} USD.`;
        alert(mensagem);

        console.log('Popup exibido!');

        // Execute ações adicionais conforme necessário
      }
    })
    .catch(error => console.error(`Erro ao obter preço de ${moeda}:`, error));
};

notificadorPrecos();




document.addEventListener("DOMContentLoaded", function () {
  const newsContainer = document.getElementById("news-container");

  // Fetch data from the JSON Server
  fetch('https://jsonserverex--astlar.repl.co/news')
    .then(response => response.json())
    .then(data => {
      // Filter news articles in Portuguese
      const portugueseArticles = data.filter(article => article.language === "pt").slice(0, 8);

      portugueseArticles.forEach(article => {
        const newsItem = document.createElement("div");
        newsItem.classList.add("news-item");

        const title = document.createElement("div");
        title.classList.add("news-title");
        title.textContent = article.title;

        const description = document.createElement("div");
        description.classList.add("news-description");
        description.textContent = article.description;

        newsItem.appendChild(title);
        newsItem.appendChild(description);
        newsContainer.appendChild(newsItem);
      });
    })
    .catch(error => console.error("Erro ao obter notícias:", error));
});




// Cadastro Criptomoedas

const form = document.getElementById('crypto-form');
const confirmButton = document.getElementById('custom-confirm-button');
const cancelButton = document.getElementById('custom-cancel-button');

function lerDB() {
  return fetch('https://jsonserverex--astlar.repl.co/moedas')
    .then(response => response.json())
    .catch(erro => {
      console.error('Erro ao ler o arquivo db.json:', erro);
      return null;
    });
}

function salvarMoedasSelecionadas(moedasSelecionadas) {
  lerDB().then(db => {
    if (db) {
      const moedasDisponiveis = db.moedas;

      moedasDisponiveis.forEach(moeda => {
        moeda.selecionada = moedasSelecionadas.includes(moeda.codigo);
      });

      fetch('https://jsonserverex--astlar.repl.co/moedas', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(db),
      }).catch(erro => console.error('Erro ao salvar no arquivo db.json:', erro));
    }
  });
}

function mostrarAlerta(mensagem) {
  alert(mensagem);
}

confirmButton.addEventListener('click', () => {
  const checkboxes = document.querySelectorAll('.form-check-input');
  const moedasSelecionadas = Array.from(checkboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);

  const customCryptoInput = document.getElementById('custom-crypto');
  const customCryptoValue = customCryptoInput.value.trim();
  
  if (customCryptoValue !== '') {
    moedasSelecionadas.push(customCryptoValue);
  }

  salvarMoedasSelecionadas(moedasSelecionadas);

  let mensagem = 'Moedas selecionadas foram salvas: ';
  
  if (moedasSelecionadas.length > 0) {
    mensagem += moedasSelecionadas.join(', ');
  } else {
    mensagem += 'Nenhuma moeda selecionada.';
  }

  mostrarAlerta(mensagem);
});


cancelButton.addEventListener('click', () => {
  const checkboxes = document.querySelectorAll('.form-check-input');
  checkboxes.forEach(checkbox => {
    checkbox.checked = false;
  });

  const customCryptoInput = document.getElementById('custom-crypto');
  customCryptoInput.value = ''; 

 
});

function openCustomPopup() {
  document.getElementById("custom-overlay").style.display = "block";
  document.getElementById("custom-popup").style.display = "block";
}

function closeCustomPopup() {
  document.getElementById("custom-overlay").style.display = "none";
  document.getElementById("custom-popup").style.display = "none";
}


// conversor de moedas


document.addEventListener("DOMContentLoaded", function() {
  fetch('https://jsonserverex--astlar.repl.co/currencies')
      .then(response => response.json())
      .then(data => {
          const fromCurrencySelect = document.getElementById('fromCurrency');
          const toCurrencySelect = document.getElementById('toCurrency');

          data.forEach(currency => {
              const option1 = document.createElement('option');
              const option2 = document.createElement('option');
              option1.value = currency.code;
              option1.text = currency.name;
              option2.value = currency.code;
              option2.text = currency.name;
              fromCurrencySelect.add(option1);
              toCurrencySelect.add(option2);
          });
      });
});

function convertCurrency() {
  const fromCurrency = document.getElementById('fromCurrency').value;
  const toCurrency = document.getElementById('toCurrency').value;
  const amount = parseFloat(document.getElementById('amount').value);

  fetch('https://jsonserverex--astlar.repl.co/currencies')
      .then(response => response.json())
      .then(data => {
          const fromRate = data.find(currency => currency.code === fromCurrency).rate;
          const toRate = data.find(currency => currency.code === toCurrency).rate;

          const convertedAmount = (amount / fromRate) * toRate;

          document.getElementById('result').innerText = `${amount} ${fromCurrency} é igual a ${convertedAmount.toFixed(2)} ${toCurrency}`;
      });
}

function openConverterPopup() {
  document.getElementById("converter-overlay").style.display = "block";
  document.getElementById("converter-popup").style.display = "block";
}

// Function to close the converter popup
function closeConverterPopup() {
  document.getElementById("converter-overlay").style.display = "none";
  document.getElementById("converter-popup").style.display = "none";
}
