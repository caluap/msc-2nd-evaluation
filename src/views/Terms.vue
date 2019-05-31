<template>
  <div class="main-container">
    <div class="text-container">
      <h1>Antes de começar...</h1>
      <p>
        Antes de começar, precisamos que você leia e declare estar de acordo com nossos termos de privacidade. Você pode encontrá-los na íntegra
        <a
          href="/pdfs/tcle.pdf"
          target="_blank"
        >aqui</a>.
      </p>
      <p>
        Esta é uma pesquisa homologada pelo
        <a
          href="https://prp-web.cenapad.unicamp.br/pt-br/cep-comite-de-etica-em-pesquisa"
          target="_blank"
        >Comitê de Ética em Pesquisa</a> (CEP) da Universidade Estadual de Campinas (Unicamp). O número de seu Certificado de Apresentação para Apreciação Ética (CAAE) é 09321819.1.0000.5404.
      </p>
      <p>Importante ressaltar um ponto: se a qualquer momento e por qualquer razão você quiser abandonar o teste fique a vontade — não estará causando nenhum mal ao teste.</p>
      <p>
        <input type="checkbox" id="cbx" style="display: none;" v-model="sharedState.accepted_terms">
        <label class="lbl" for="cbx">
          <span></span>Li e estou de acordo com os termos.
        </label>
      </p>
      <div v-if="sharedState.accepted_terms">
        <router-link to="/quest" class="next-step">Próximo passo</router-link>
      </div>
      <div v-else>
        <a class="next-step disabled">Próximo passo</a>
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/static/css/styles.scss";
import { general_data } from "../data";
export default {
  name: "terms",
  data() {
    return {
      sharedState: general_data.sharedState
    };
  }
};
</script>
