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
      <p>Como você talvez já tenha reparado, esse é um recurso muito comum nas histórias em quadrinhos. Nelas, o desenho expressivo das letras imprime no texto ritmos, ênfases, entonações etc:</p>
      <img class="bd" src="@/assets/static/imgs/bd/maus.png">
      <img class="bd" src="@/assets/static/imgs/bd/persepolis.png">
      <img class="bd" src="@/assets/static/imgs/bd/pilules_bleues.png">
      <p
        class="caption"
      >Imagens de: The complete Maus, de Art Spiegelman, The complete Persepolis, de Marjane Satrapi e Pilules Bleues, de Fredrik Peeters.</p>
      <p>As possibilidades são muitas, mas trazem algumas restrições: os melhores exemplos de expressividade na letra são desenhados à mão — muitas vezes há um profissional especializado cuidando só disso —, e dependem de uma sofisticada interação entre os diversos elementos que compõe a cena.</p>
      <p>Nosso experimento vai por outro caminho: queremos encontrar uma maneira de representar a voz na tipografia que, embora simples, sirva para imprimir na letra algumas características da voz. É nesse contexto que lhe pedimos ajuda.</p>
      <h2>Como funciona o teste?</h2>
      <p>Serão {{sharedState.rounds}} rodadas (curtas!).</p>
      <p>
        Em cada rodada, você deverá ouvir o arquivo de áudio
        <span
          class="img-identifier"
          @mouseover="hoverImg('img1')"
          @mouseleave="unhoverImg('img1')"
        >1</span> e, lendo os dois cartões de texto abaixo
        <span
          class="img-identifier"
          @mouseover="hoverImg('img2')"
          @mouseleave="unhoverImg('img2')"
        >2</span>, escolher qual deles casa melhor com o som. Ouça o áudio quantas vezes quiser. Para escolher o cartão basta clicar nele e, quando estiver seguro de sua escolha, clicar no botão
        <span
          class="img-identifier"
          @mouseover="hoverImg('img3')"
          @mouseleave="unhoverImg('img3')"
        >3</span> para avançar para a rodada seguinte.
        <!-- <strong>A ideia é ouvir o áudio e clicar na imagem que corresponde à voz da atriz.</strong> -->
      </p>
      <img class="scheme" id="img1" src="@/assets/static/imgs/misc/scheme-1.svg">
      <img class="scheme" id="img2" src="@/assets/static/imgs/misc/scheme-2.svg">
      <img class="scheme" id="img3" src="@/assets/static/imgs/misc/scheme-3.svg">
      <p>Estimamos que o teste leve cerca de 10 minutos. Como usaremos o som do seu computador (ou celular), certifique-se de estar em um ambiente silencioso e que o barulho não vá incomodar ninguém.</p>
      <p>Mais uma vez: nosso muito obrigado pela ajuda!</p>
      <p>
        <br>Caluã Pataca e Paula Dornhofer
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
  },
  methods: {
    hoverImg: function(id) {
      document.getElementById(id).classList.add("hover");
    },
    unhoverImg: function(id) {
      document.getElementById(id).classList.remove("hover");
    }
  }
};
</script>
