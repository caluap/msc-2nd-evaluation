<template>
  <div class="main-container">
    <div class="text-container" v-if="sharedState.accepted_terms">
      <h1>Nos fale um pouco sobre você</h1>
      <div id="questionnaire">
        <label for="education">Formação acadêmica</label>
        <select name="education" v-model="selectedEducation">
          <option disabled value>Clique para escolher</option>
          <option v-for="(ed, index) in education" :key="'ed-'+index">{{ed}}</option>
        </select>
        <label for="age-group">Idade</label>
        <select name="age-group" v-model="selectedAgeGroup">
          <option disabled value>Clique para escolher</option>
          <option v-for="(ag, index) in ageGroup" :key="'ag-'+index">{{ag}}</option>
        </select>
      </div>
      <template v-if="selectedAgeGroup != '' && selectedEducation != ''">
        <router-link to="/eval" class="next-step">Começar teste</router-link>
      </template>
      <template v-else>
        <a class="next-step disabled">Começar teste</a>
      </template>
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
      sharedState: general_data.sharedState,
      education: [
        "Ensino Fundamental (1º grau) / Interrompido",
        "Ensino Fundamental (1º grau) / Cursando",
        "Ensino Fundamental (1º grau) / Completo",
        "Ensino Médio (2º grau) / Interrompido",
        "Ensino Médio (2º grau) / Cursando",
        "Ensino Médio (2º grau) / Completo",
        "Ensino superior / Interrompido",
        "Ensino superior / Cursando",
        "Ensino superior / Completo",
        "Pós-graduação / Mestrado / Interrompido",
        "Pós-graduação / Mestrado / Cursando",
        "Pós-graduação / Mestrado / Completo",
        "Pós-graduação / Doutorado / Interrompido",
        "Pós-graduação / Doutorado / Cursando",
        "Pós-graduação / Doutorado / Completo"
      ],
      ageGroup: [
        "0 a 13 anos",
        "14 a 17 anos",
        "18 a 24 anos",
        "25 a 39 anos",
        "40 a 59 anos",
        "60 anos ou mais"
      ],
      selectedAgeGroup: "",
      selectedEducation: ""
    };
  }
};
</script>
