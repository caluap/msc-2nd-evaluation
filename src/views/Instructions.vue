<template>
  <div class="main-container">
    <div class="text-container">
      <h1>Como vai funcionar o teste?</h1>
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
      <p>Se quiser fazer um teste, o tocador de áudio abaixo tem um exemplo semelhante aos que usaremos no teste.</p>
      <br>
      <br>
      <audio
        controls
        :src="audio_file"
      >Sentimos muito, mas seu navegador não é compatível com nosso tocador de áudio!</audio>
      <router-link to="/terms" class="next-step">Próximo passo</router-link>
    </div>
  </div>
</template>

<script>
import "../assets/static/css/styles.scss";
import { general_data } from "../data";
export default {
  name: "instructions",
  data() {
    return {
      sharedState: general_data.sharedState,
      audio_file:
        general_data.data[general_data.sharedState.data].cards[0].audio
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

<style lang="scss" scoped>
audio {
  width: 100%;
}
</style>

