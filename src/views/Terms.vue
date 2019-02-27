<template>
  <div class="main-container">
    <div class="text-container">
      <h1>Antes de começar...</h1>
      <p>
        Para participar deste teste, precisamos que você concorde com nossos termos de privacidade. Você pode lê-los
        <a
          href="http://www.google.com/"
          target="_blank"
        >aqui</a>.
      </p>
      <p>
        <input type="checkbox" id="cbx" style="display: none;" v-model="im_ok">
        <label class="lbl" for="cbx">
          <span></span>Li e estou de acordo com os termos.
        </label>
      </p>
      <div v-if="im_ok">
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
export default {
  name: "terms",
  data() {
    return {
      im_ok: false
    };
  }
};
</script>
