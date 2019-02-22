<template>
  <div id="app">
    <p>Hello, my dear {{ author_id }}</p>
    <div v-if="n_choices < choices.length">
      <button @click="makeChoice(0)">{{choices[choice_id].op_a}}</button>
      <button @click="makeChoice(1)">{{choices[choice_id].op_b}}</button>
    </div>
    <div v-else>
      <p>Oi!</p>
    </div>
  </div>
</template>

<script>
import { db } from "./firebase";
import { firebaseApp } from "./firebase";

export default {
  name: "app",
  data() {
    return {
      choices: [
        {
          id: "0",
          op_a: "Banana",
          op_b: "Maçã",
          choice: -1
        },
        {
          id: "1",
          op_a: "Cachorro",
          op_b: "Gato",
          choice: -1
        },
        {
          id: "2",
          op_a: "Alemanha",
          op_b: "França",
          choice: -1
        },
        {
          id: "3",
          op_a: "Inglês",
          op_b: "Espanhol",
          choice: -1
        }
      ],
      choice_id: 0,
      n_choices: 0,
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
    this.randomChoice();
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
    },
    randomChoice: function() {
      let indexes = [];
      for (let i = 0; i < this.choices.length; i++) {
        if (this.choices[i].choice == -1) {
          indexes.push(i);
        }
      }
      if (indexes.length > 0) {
        this.choice_id = indexes[Math.floor(Math.random() * indexes.length)];
      }
    },
    makeChoice: function(i) {
      this.choices[this.choice_id].choice = i;
      this.n_choices += 1;
      this.randomChoice();
    }
  }
};
</script>

<style>
</style>
