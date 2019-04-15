<template>
  <div class="main-container">
    <div class="text-container">
      <h1>Antes de começar...</h1>
      <p>
        Para participar deste teste, precisamos que você concorde com nossos termos de privacidade. Você pode lê-los
        <a
          href="/pdfs/tcle.pdf"
          target="_blank"
        >aqui</a>.
      </p>
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
