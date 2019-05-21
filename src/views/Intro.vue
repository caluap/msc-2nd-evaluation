<template>
  <div class="main-container">
    <div class="text-container">
      <h1>
        A voz na letra:
        tipografia modulada pela fala
      </h1>
      <p>
        Caro(a) participante,
        <br>
        <br>muito obrigado pelo seu interesse!
        Preparamos a seguir um teste para avaliar algumas maneiras de se representar na tipografia características que
        <em>imitam</em> a voz humana.
      </p>
      <p>Como você talvez tenha reparado, esse é um recurso muito comum nas histórias em quadrinhos. Nelas, o desenho expressivo das letras imprime no texto ritmos, ênfases, entonações etc:</p>
      <img class="bd" src="@/assets/static/imgs/bd/maus.png">
      <img class="bd" src="@/assets/static/imgs/bd/persepolis.png">
      <img class="bd" src="@/assets/static/imgs/bd/pilules_bleues.png">
      <p
        class="caption"
      >Imagens de: The complete Maus, de Art Spiegelman, The complete Persepolis, de Marjane Satrapi e Pilules Bleus, de Fredrik Peeters.</p>
      <p>As possibilidades são muitas, mas trazem algumas restrições: os melhores exemplos de expressividade na letra são desenhados à mão — muitas vezes há um profissional especializado cuidando só disso —, e dependem de uma sofisticada interação entre os diversos elementos que compõe a cena.</p>
      <p>Nosso experimento vai por outro caminho: queremos encontrar uma maneira de representar a voz na tipografia que, embora simples, sirva para imprimir na letra algumas características da voz. É nesse contexto que lhe pedimos ajuda.</p>
      <h2>Como funciona o teste?</h2>
      <p>Serão {{sharedState.rounds}} rodadas (curtas!).</p>
      <p>
        Em cada uma, você deve ouvir o arquivo de áudio (1) e, olhando para os dois cartões abaixo (2 e 3), escolher qual casa melhor com o som. Para tanto, basta clicar no cartão e, quando estiver seguro da escolha, clicar no botão (4) para avançar para a próxima rodada.
        <!-- <strong>A ideia é ouvir o áudio e clicar na imagem que corresponde à voz da atriz.</strong> -->
      </p>
      <p>Estimamos que o teste leve entre 10 a 20 minutos. Como usaremos o som do seu computador (ou celular), certifique-se de estar em um ambiente silencioso e que o barulho que fizermos não vai incomodar ninguém. Mais uma vez: nosso muito obrigado pela ajuda.</p>
      <p>
        Caluã Pataca e Paula Dornhofer
        <br>FEEC / Unicamp
        <br>Campinas, maio de 2019.
      </p>
      <router-link to="/terms" class="next-step">Próximo passo</router-link>
    </div>
  </div>
</template>

<script>
import "../assets/static/css/styles.scss";
import { general_data } from "../data";
export default {
  name: "intro",
  data() {
    return {
      sharedState: general_data.sharedState
    };
  }
};
</script>
