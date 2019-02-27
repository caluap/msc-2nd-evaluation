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
        <br>nas páginas a seguir preparamos o seguinte teste: em cada rodada apresentaremos um arquivo de áudio com uma atriz recitando uma frase. Embaixo desse arquivo estarão sempre duas imagens: em uma, o desenho das letras tentará
        <em>imitar</em> a voz dessa atriz; na outra, as letras também terão sido modificadas, mas de maneira aleatória.
      </p>
      <p>
        <strong>A ideia é ouvir o áudio e clicar na imagem que corresponde à voz da atriz.</strong>
      </p>
      <p>O teste costuma levar de 10 a 20 minutos. Como usaremos o som do seu computador (ou celular), certifique-se de estar em um ambiente silencioso e que o barulho que fizermos não vai incomodar ninguém.</p>
      <router-link to="/eval" class="next-step">Pronto?</router-link>
    </div>
  </div>
</template>

<script>
import "../assets/static/css/styles.scss";
export default {
  name: "intro"
};
</script>
