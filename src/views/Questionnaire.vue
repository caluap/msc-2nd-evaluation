<template>
  <div class="main-container">
    <div class="text-container" v-if="sharedState.accepted_terms">
      <h1>Nos fale um pouco sobre você</h1>
      <p>Vale ressaltar que todos os dados coletados são totalmente anônimos (nem mesmo os pesquisadores terão como recuperar a identidade dos participantes) e servirão apenas para traçar um perfil não-individualizado dos participantes como um todo.</p>
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
        <label for="sex">Sexo</label>
        <select name="sex" v-model="selectedSex">
          <option disabled value>Clique para escolher</option>
          <option v-for="(sex, index) in sexes" :key="'sex-'+index">{{sex}}</option>
        </select>
      </div>
      <template v-if="selectedAgeGroup != '' && selectedEducation != ''">
        <router-link
          to="/eval"
          class="next-step"
          v-on:click.native="saveParticipantData()"
        >Começar teste</router-link>
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
import { db } from "../firebase";
export default {
  name: "questionnaire",
  data() {
    return {
      sharedState: general_data.sharedState,
      education: [
        "Ensino Fundamental (1º grau)",
        "Ensino Médio (2º grau)",
        "Ensino superior",
        "Pós-graduação / Mestrado",
        "Pós-graduação / Doutorado",
        "Prefiro não responder"
      ],
      ageGroup: [
        "18 a 24 anos",
        "25 a 39 anos",
        "40 a 59 anos",
        "60 anos ou mais",
        "Prefiro não responder"
      ],
      sexes: ["Masculino", "Feminino", "Prefiro não responder"],
      selectedAgeGroup: "",
      selectedEducation: "",
      selectedSex: ""
    };
  },
  methods: {
    saveParticipantData: function() {
      if (!this.sharedState.offline_mode) {
        let userData = {
          age_group: this.selectedAgeGroup,
          education: this.selectedEducation,
          sex: this.selectedSex
        };
        db.collection("participants_data")
          .doc(this.sharedState.author_id)
          .set(userData, { merge: true })
          .then(function() {
            console.log("Saved age, education and sex data.");
          })
          .catch(function(error) {
            console.error("Error updating document: ", error);
          });
      }
    }
  }
};
</script>
