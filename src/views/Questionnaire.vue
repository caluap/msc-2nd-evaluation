<template>
  <div class="main-container">
    <div class="text-container" v-if="sharedState.accepted_terms">
      <h1>Nos fale um pouco sobre você</h1>
      <p>Pegar formação</p>
      <p>Pegar grupo de idade</p>
      <router-link to="/eval" class="next-step">Começar teste</router-link>
    </div>
    <div class="text-container" v-else>
      <router-link to="/terms">É preciso aceitar os termos de uso antes de começar.</router-link>
    </div>
  </div>
</template>

<script>
import "../assets/static/css/styles.scss";
import { general_data } from "../data";
export default {
  name: "questionnaire",
  data() {
    return {
      sharedState: general_data.sharedState
    };
  }
};
</script>
