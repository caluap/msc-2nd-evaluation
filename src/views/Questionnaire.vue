<template>
  <div class="main-container">
    <div class="text-container">
      <h1>Nos fale um pouco sobre você</h1>
      <p>Pegar formação</p>
      <p>Pegar grupo de idade</p>
      <router-link to="/eval" class="next-step">Começar teste</router-link>
    </div>
  </div>
</template>

<script>
import "../assets/static/css/styles.scss";
export default {
  name: "questionnaire"
};
</script>
