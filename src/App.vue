<template>
  <div id="app">
    <p>OI! {{ author_id }}</p>
    <ul v-for="(person, idx) in people" :key="idx">
      <li>{{ person.name }} / {{ person.author_id}}</li>
      <a v-if="person.author_id == author_id" @click="deletePerson(person)">X</a>
    </ul>
    <input type="text" v-model="newPerson" @keyup.enter="addPerson">
    <button @click="addPerson">Mais mais mais</button>
  </div>
</template>

<script>
import { db } from "./firebase";
import { firebaseApp } from "./firebase";

export default {
  name: "app",
  data() {
    return {
      people: [],
      newPerson: "",
      author_id: ""
    };
  },
  firestore() {
    return {
      people: db.collection("people")
    };
  },
  created() {
    firebaseApp
      .auth()
      .signInAnonymously()
      .then(
        user => {
          this.author_id = user.user.uid;
        },
        err => {
          console.log(err);
        }
      );
  },
  methods: {
    addPerson: function() {
      this.$firestore.people.add({
        name: this.newPerson,
        timestamp: new Date()
      });
      this.newPerson = "";
    },
    deletePerson: function(person) {
      this.$firestore.people.doc(person[".key"]).delete();
    }
  }
};
</script>

<style>
</style>
