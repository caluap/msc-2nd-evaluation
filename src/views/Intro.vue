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
        <br>agradecemos sua contribuição com nossa pesquisa!
        Preparamos a seguir um teste para avaliar algumas maneiras de se representar na tipografia características que
        <em>imitam</em> a voz humana.
      </p>
      <p>Os resultados desta pesquisa poderão gerar ferramentas para alfabetização e auxílio no aprendizado de línguas estrangeiras; auxílio no tratamento de patologias de fala; dicas visuais que ajudem disléxicos a decifrar em sons a linguagem escrita; legendas para filmes nas quais a interpretação dramática que os atores dão a suas vozes esteja representada nas letras; entre outras.</p>
      <p>Como você talvez já tenha reparado, esse é um recurso muito comum nas histórias em quadrinhos. Nelas, o desenho expressivo das letras imprime no texto ritmos, ênfases, entonações etc:</p>
      <img class="bd" src="@/assets/static/imgs/bd/maus.png">
      <img class="bd" src="@/assets/static/imgs/bd/persepolis.png">
      <img class="bd" src="@/assets/static/imgs/bd/pilules_bleues.png">
      <p
        class="caption"
      >Imagens de: The complete Maus, de Art Spiegelman, The complete Persepolis, de Marjane Satrapi e Pilules Bleues, de Fredrik Peeters.</p>
      <p>As possibilidades são muitas, mas trazem algumas restrições: os melhores exemplos de expressividade na letra são desenhados à mão — muitas vezes há um profissional especializado cuidando só disso —, e dependem de uma sofisticada interação entre os diversos elementos que compõe a cena.</p>
      <p>Nosso experimento vai por outro caminho: queremos encontrar uma maneira de representar a voz na tipografia que, embora simples, sirva para imprimir na letra algumas características da voz. É nesse contexto que lhe pedimos ajuda.</p>
      <hr>
      <p>
        Se você tiver qualquer dúvida ou reclamação poderá falar conosco em
        <a
          href="mailto:paula@fee.unicamp.br"
        >paula@fee.unicamp.br</a> ou
        <a href="tel:+551935210246">+55 19 3521-0246</a>
      </p>
      <p>Mais uma vez: nosso muito obrigado pela ajuda!</p>
      <p>
        <br>Caluã Pataca e Paula Dornhofer
        <br>FEEC / Unicamp
        <br>Campinas, maio de 2019.
      </p>
      <router-link to="/instructions" class="next-step">Próximo passo</router-link>
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
