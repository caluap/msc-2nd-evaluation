<template>
  <div id="app">
    <p>OI!</p>
    <ul v-for="(person, idx) in people" :key="idx">
      <li>{{ person.name }}</li>
    </ul>
    <input type="text" v-model="newPerson" @keyup.enter="addPerson">
    <button @click="addPerson">Mais mais mais</button>
  </div>
</template>

<script>
import { db } from "./firebase";

export default {
  name: "app",
  data() {
    return {
      people: [],
      newPerson: ""
    };
  },
  firestore() {
    return {
      people: db.collection("people")
    };
  },
  methods: {
    addPerson: function() {
      this.$firestore.people.add({
        name: this.newPerson,
        timestamp: new Date()
      });
      this.newPerson = "";
    }
  }
};
</script>

<style>
</style>
