const inputPergunta = document.getElementById("inputPergunta");
const inputPergunta_1 = document.getElementById("inputPergunta_1");
const inputPergunta_2 = document.getElementById("inputPergunta_2");
const resultadoIA = document.getElementById("resultadoIA");
require('dotenv').config();

const openai = require('openai');
const api_key = process.env.OPENAI_API_KEY

openai.api_key = api_key

function EnviarPergunta() {
	var valorPergunta = 'Como melhorar a ' + inputPergunta.value + ' do meu e-commerce que hoje é de ' + inputPergunta_1.value + '. A minha meta é alcançar uma melhora de ' + inputPergunta_2.value + ' nessa métrica. Lembre-se de apresentar uma resposta curta e com ações de efeito rápido';

  fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json", 
      Authorization: "Bearer " + openai.api_key,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: valorPergunta,
      max_tokens: 2048, // tamanho da resposta
      temperature: 0.8, // criatividade na resposta
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      if (resultadoIA.value) resultadoIA.value += "\n";

      if(json.error?.message){
        resultadoIA.value += `Error: ${json.error.message}`;
      } else if (json.choices?.[0].text) {
        var text = json.choices[0].text || "Sem resposta";

        resultadoIA.value += "Chat GPT: " + text;
      }

      resultadoIA.scrollTop = resultadoIA.scrollHeight;
    })
    .catch((error) => console.error("Error:", error))
    .finally(() => {
      inputPergunta.value = "";
      inputPergunta.disabled = false;
      inputPergunta.focus();
    });

	if (resultadoIA.value) resultadoIA.value += "\n\n\n";

	inputPergunta.value = "Aguarde enquanto geramos a sua estratégia...";
	inputPergunta.disabled = true;

  resultadoIA.scrollTop = resultadoIA.scrollHeight;
}

document.getElementById("EnviarPergunta").addEventListener("click", EnviarPergunta)